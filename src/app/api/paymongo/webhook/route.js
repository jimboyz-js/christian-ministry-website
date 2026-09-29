import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import { renderTemplate } from "@/lib/render-template";

export const dynamic = "force-dynamic";

/**
 * Compare two hexadecimal signatures safely.
 */
function safeCompare(expected, received) {
  if (!expected || !received) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

/**
 * Verify PayMongo webhook signature.
 *
 * PayMongo-Signature format:
 *
 * t=timestamp,te=test_signature,li=live_signature
 *
 * The signed payload is:
 *
 * timestamp + "." + rawBody
 */
function verifyPayMongoSignature(rawBody, signatureHeader) {
  const secret = process.env.PAYMONGO_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("PAYMONGO_WEBHOOK_SECRET is not configured");
  }

  if (!signatureHeader) {
    return false;
  }

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    }),
  );

  const timestamp = parts.t;

  if (!timestamp) {
    return false;
  }

  const payload = `${timestamp}.${rawBody}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  /*
   * PayMongo can provide:
   *
   * te = test signature
   * li = live signature
   *
   * We check whichever signature matches.
   */
  const testSignature = parts.te;
  const liveSignature = parts.li;

  return (
    safeCompare(expectedSignature, testSignature) ||
    safeCompare(expectedSignature, liveSignature)
  );
}

/**
 * Convert PayMongo's smallest currency unit to normal amount.
 *
 * Example:
 * 10000 PHP cents -> 100.00 PHP
 */
function formatAmount(amount) {
  if (typeof amount !== "number") {
    return null;
  }

  return amount / 100;
}

/**
 * Extract useful payment information from a PayMongo event.
 */
function getPaymentData(event) {
  const attributes = event?.data?.attributes;
  const payment = attributes?.data;

  if (!payment) {
    return null;
  }

  const paymentAttributes = payment.attributes ?? {};

  const billing = paymentAttributes.billing ?? {};
  const source = paymentAttributes.source ?? {};

  const metadata = paymentAttributes.metadata ?? {};

  const donorName = billing?.name || metadata.donor_name || "";
  const donorEmail = billing?.email || metadata.donor_email || "";

  return {
    eventId: event?.data?.id ?? "",
    eventType: attributes?.type ?? "",

    paymentId: payment?.id ?? "",

    paymentIntentId: paymentAttributes?.payment_intent_id ?? "",

    amount: formatAmount(paymentAttributes?.amount),

    amountInMinorUnit: paymentAttributes?.amount ?? null,

    currency: paymentAttributes?.currency ?? "",

    status: paymentAttributes?.status ?? "",

    description: paymentAttributes?.description ?? "",

    externalReferenceNumber: paymentAttributes?.external_reference_number ?? "",

    // givenName: billing?.name ? (billing.name.split(" ")[0] ?? "") : "",
    givenName: donorName.split(" ")[0] ?? "",

    surname: billing?.name ? billing.name.split(" ").slice(1).join(" ") : "",

    // name: billing?.name ?? "",
    name: donorName,

    // emailAdd: billing?.email ?? "",
    emailAdd: donorEmail,

    phone: billing?.phone ?? "",

    // paymentMethod: source?.type ?? "",
    paymentMethod: source?.type || metadata.donation_method || "",

    paymentSourceId: source?.id ?? "",

    livemode: attributes?.livemode ?? false,

    paidAt: paymentAttributes?.paid_at ?? null,

    createdAt: paymentAttributes?.created_at ?? null,

    fee: formatAmount(paymentAttributes?.fee),

    netAmount: formatAmount(paymentAttributes?.net_amount),
  };
}

export async function POST(request) {
  try {
    /*
     * ---------------------------------------------------------
     * 1. Read the RAW request body
     * ---------------------------------------------------------
     *
     * Do NOT use request.json() before signature verification.
     *
     * PayMongo signs the exact raw request body.
     */
    const rawBody = await request.text();

    /*
     * ---------------------------------------------------------
     * 2. Get PayMongo signature
     * ---------------------------------------------------------
     */
    const signatureHeader = request.headers.get("paymongo-signature");

    if (!signatureHeader) {
      console.warn("PayMongo webhook: missing signature");

      return NextResponse.json(
        { message: "Missing signature" },
        { status: 400 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 3. Verify webhook authenticity
     * ---------------------------------------------------------
     */
    const isValid = verifyPayMongoSignature(rawBody, signatureHeader);

    if (!isValid) {
      console.warn("PayMongo webhook: invalid signature");

      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 4. Parse JSON only AFTER verification
     * ---------------------------------------------------------
     */
    let event;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 },
      );
    }

    /*
     * ---------------------------------------------------------
     * 5. Get event information
     * ---------------------------------------------------------
     */
    const eventId = event?.data?.id ?? "";

    const eventType = event?.data?.attributes?.type ?? "";

    const livemode = event?.data?.attributes?.livemode ?? false;

    console.log("PAYMONGO WEBHOOK", {
      eventId,
      eventType,
      livemode,
    });

    /*
     * ---------------------------------------------------------
     * 6. Idempotency
     * ---------------------------------------------------------
     *
     * IMPORTANT:
     *
     * PayMongo can retry webhook deliveries.
     *
     * Before sending an email or updating your database,
     * check whether eventId has already been processed.
     *
     * Example:
     *
     * if (await isWebhookProcessed(eventId)) {
     *   return NextResponse.json({ received: true });
     * }
     *
     * Then after successful processing:
     *
     * await markWebhookProcessed(eventId);
     *
     * ---------------------------------------------------------
     */

    switch (eventType) {
      /*
       * =======================================================
       * PAYMENT SUCCESSFUL
       * =======================================================
       */
      case "payment.paid": {
        const payment = getPaymentData(event);

        if (!payment) {
          console.warn("PayMongo payment.paid: missing payment resource");

          break;
        }

        console.log("PayMongo payment successful:", payment);

        /*
         * Example result:
         *
         * {
         *   eventId: "evt_...",
         *   paymentId: "pay_...",
         *   paymentIntentId: "pi_...",
         *   amount: 100,
         *   currency: "PHP",
         *   givenName: "Juan",
         *   surname: "Dela Cruz",
         *   emailAdd: "juan@example.com",
         *   paymentMethod: "gcash"
         * }
         */

        /*
         * ---------------------------------------------------
         * Your donation processing goes here
         * ---------------------------------------------------
         *
         * 1. Check idempotency
         * 2. Save donation
         * 3. Send donation confirmation email
         *
         * Example:
         *
         * await sendEmail({
         *   givenName: payment.givenName,
         *   surname: payment.surname,
         *   emailAdd: payment.emailAdd,
         *   amount: payment.amount,
         *   currency: payment.currency,
         * });
         */

        try {
          const givenName = `${payment.givenName} ${payment.surname}`.trim();
          const emailAdd = payment.emailAdd;
          const amount = payment.amount;
          const currency = payment.currency;

          const congratulationsTemplate = await renderTemplate(
            "paymongo-congr",
            {
              givenName,
              emailAdd,
              donationMethod: payment.paymentMethod,
              intentId: payment.paymentIntentId,
              amount,
              currency,
            },
          );

          const thankyouTemplate = await renderTemplate("thankyou", {
            amount,
            currency,
          });

          // Send to the ministry email
          await sendEmail({
            name: givenName,
            email: process.env.EMAIL_RECEIVER,
            html: congratulationsTemplate,
            subject: "New Donation Received",
          });
          // Send to the donors' email
          await sendEmail({
            name: "Message of Hope",
            email: emailAdd,
            html: thankyouTemplate,
            recipient: emailAdd,
            subject: "Thank You For Your Support",
          });
        } catch (err) {
          console.error(err);
        }

        break;
      }

      /*
       * =======================================================
       * PAYMENT FAILED
       * =======================================================
       */
      case "payment.failed": {
        const payment = getPaymentData(event);

        console.log("PayMongo payment failed:", payment);

        /*
         * Optional:
         *
         * await sendFailedPaymentEmail(...)
         *
         * or update your donation/payment record.
         */

        break;
      }

      /*
       * =======================================================
       * PAYMENT REFUNDED
       * =======================================================
       */
      case "payment.refunded": {
        const payment = getPaymentData(event);

        console.log("PayMongo payment refunded:", payment);

        /*
         * Update the corresponding donation/payment
         * as refunded.
         */

        break;
      }

      /*
       * =======================================================
       * PAYMENT REFUND UPDATED
       * =======================================================
       */
      case "payment.refund.updated": {
        const payment = getPaymentData(event);

        console.log("PayMongo payment refund updated:", payment);

        break;
      }

      /*
       * =======================================================
       * SUBSCRIPTION INVOICE PAID
       * =======================================================
       */
      case "subscription.invoice.paid": {
        const invoice = event?.data?.attributes?.data;

        console.log("PayMongo subscription invoice paid:", invoice);

        /*
         * Monthly/recurring donation successfully charged.
         */

        break;
      }

      /*
       * =======================================================
       * SUBSCRIPTION PAYMENT FAILED
       * =======================================================
       */
      case "subscription.invoice.payment_failed": {
        const invoice = event?.data?.attributes?.data;

        console.log("PayMongo subscription payment failed:", invoice);

        break;
      }

      /*
       * =======================================================
       * SUBSCRIPTION PAST DUE
       * =======================================================
       */
      case "subscription.past_due": {
        const subscription = event?.data?.attributes?.data;

        console.log("PayMongo subscription past due:", subscription);

        break;
      }

      /*
       * =======================================================
       * SUBSCRIPTION UNPAID
       * =======================================================
       */
      case "subscription.unpaid": {
        const subscription = event?.data?.attributes?.data;

        console.log("PayMongo subscription unpaid:", subscription);

        break;
      }

      /*
       * =======================================================
       * SUBSCRIPTION UPDATED
       * =======================================================
       */
      case "subscription.updated": {
        const subscription = event?.data?.attributes?.data;

        console.log("PayMongo subscription updated:", subscription);

        break;
      }

      /*
       * =======================================================
       * CHECKOUT SESSION PAYMENT
       * =======================================================
       *
       * Only needed if your integration uses PayMongo
       * Checkout Sessions.
       */
      case "checkout_session.payment.paid": {
        const checkoutSession = event?.data?.attributes?.data;

        console.log("PayMongo checkout session paid:", checkoutSession);

        break;
      }

      /*
       * =======================================================
       * DEFAULT
       * =======================================================
       */
      default: {
        console.log("Unhandled PayMongo webhook:", eventType);
      }
    }

    /*
     * ---------------------------------------------------------
     * 7. Acknowledge PayMongo
     * ---------------------------------------------------------
     */
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("PayMongo webhook error:", error);

    return NextResponse.json(
      {
        message: "Webhook processing failed",
      },
      { status: 500 },
    );
  }
}
