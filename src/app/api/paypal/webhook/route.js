import { sendEmail } from "@/lib/email";
import { renderTemplate } from "@/lib/render-template";
import { NextResponse } from "next/server";

/*
|--------------------------------------------------------------------------
| PayPal configuration
|--------------------------------------------------------------------------
*/

const PAYPAL_ENVIRONMENT =
  process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";

const PAYPAL_API =
  PAYPAL_ENVIRONMENT === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;

/*
|--------------------------------------------------------------------------
| Route configuration
|--------------------------------------------------------------------------
|
| Do not cache webhook requests.
|
*/

export const dynamic = "force-dynamic";

/*
|--------------------------------------------------------------------------
| Get PayPal OAuth access token
|--------------------------------------------------------------------------
*/

async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET");
  }

  const credentials = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",

    // Do not cache OAuth tokens.
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("PayPal OAuth error:", response.status, errorText);

    throw new Error(`PayPal authentication failed (${response.status})`);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("PayPal access token was not returned");
  }

  return data.access_token;
}

async function getPayPalOrder(orderId) {
  if (!orderId) {
    return null;
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("PayPal order lookup failed:", response.status);
    return null;
  }

  return response.json();
}

async function getPayPalSubscription(subscriptionId) {
  if (!subscriptionId) {
    return null;
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.error("PayPal subscription lookup failed:", response.status);
    return null;
  }

  return response.json();
}

/*
|--------------------------------------------------------------------------
| Verify PayPal webhook signature
|--------------------------------------------------------------------------
|
| PayPal sends these HTTP headers:
|
| PAYPAL-TRANSMISSION-ID
| PAYPAL-TRANSMISSION-TIME
| PAYPAL-TRANSMISSION-SIG
| PAYPAL-CERT-URL
| PAYPAL-AUTH-ALGO
|
| We send those values + the registered webhook ID + the
| webhook event back to PayPal's verification endpoint.
|
*/

async function verifyPayPalWebhook({
  transmissionId,
  transmissionTime,
  transmissionSig,
  certUrl,
  authAlgo,
  webhookEvent,
}) {
  if (!PAYPAL_WEBHOOK_ID) {
    throw new Error("Missing PAYPAL_WEBHOOK_ID");
  }

  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,

        // IMPORTANT:
        // This is the PayPal Webhook ID,
        // NOT the Client ID.
        webhook_id: PAYPAL_WEBHOOK_ID,

        webhook_event: webhookEvent,
      }),

      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "PayPal webhook verification request failed:",
      response.status,
      errorText,
    );

    return false;
  }

  const data = await response.json();

  return data.verification_status === "SUCCESS";
}

/*
|--------------------------------------------------------------------------
| POST /api/webhooks/paypal
|--------------------------------------------------------------------------
*/

export async function POST(request) {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1. Read the RAW request body
    |--------------------------------------------------------------------------
    |
    | We intentionally use request.text() instead of request.json().
    |
    | This preserves the original webhook payload and avoids problems
    | when validating PayPal's webhook signature.
    |
    */

    const rawBody = await request.text();

    if (!rawBody) {
      console.error("PayPal webhook: empty request body");

      return NextResponse.json(
        {
          success: false,
          message: "Empty request body",
        },
        { status: 400 },
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 2. Parse JSON
    |--------------------------------------------------------------------------
    */

    let event;

    try {
      event = JSON.parse(rawBody);
    } catch (error) {
      console.error("PayPal webhook: invalid JSON");

      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON",
        },
        { status: 400 },
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Get PayPal webhook headers
    |--------------------------------------------------------------------------
    */

    const transmissionId = request.headers.get("paypal-transmission-id");

    const transmissionTime = request.headers.get("paypal-transmission-time");

    const transmissionSig = request.headers.get("paypal-transmission-sig");

    const certUrl = request.headers.get("paypal-cert-url");

    const authAlgo = request.headers.get("paypal-auth-algo");

    /*
    |--------------------------------------------------------------------------
    | 4. Validate required headers
    |--------------------------------------------------------------------------
    */

    if (
      !transmissionId ||
      !transmissionTime ||
      !transmissionSig ||
      !certUrl ||
      !authAlgo
    ) {
      console.error("PayPal webhook: missing verification headers");

      return NextResponse.json(
        {
          success: false,
          message: "Missing PayPal webhook headers",
        },
        { status: 400 },
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 5. Basic event validation
    |--------------------------------------------------------------------------
    */

    if (!event || typeof event !== "object" || !event.id || !event.event_type) {
      console.error("PayPal webhook: invalid event structure");

      return NextResponse.json(
        {
          success: false,
          message: "Invalid PayPal webhook event",
        },
        { status: 400 },
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Verify the webhook with PayPal
    |--------------------------------------------------------------------------
    */

    const isValid = await verifyPayPalWebhook({
      transmissionId,
      transmissionTime,
      transmissionSig,
      certUrl,
      authAlgo,
      webhookEvent: event,
    });

    if (!isValid) {
      console.error("PayPal webhook: INVALID SIGNATURE", {
        eventId: event.id,
        eventType: event.event_type,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid PayPal webhook signature",
        },
        { status: 400 },
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 7. Webhook is authentic
    |--------------------------------------------------------------------------
    */

    console.log("Verified PayPal webhook:", {
      eventId: event.id,
      eventType: event.event_type,
      createTime: event.create_time,
    });

    /*
    |--------------------------------------------------------------------------
    | 8. IMPORTANT: Idempotency
    |--------------------------------------------------------------------------
    |
    | PayPal can deliver the same event more than once.
    |
    | You should store event.id in your database and check whether
    | it has already been processed.
    |
    | Example:
    |
    | const alreadyProcessed = await ...
    |
    | if (alreadyProcessed) {
    |     return NextResponse.json(
    |         { success: true, duplicate: true },
    |         { status: 200 }
    |     );
    | }
    |
    | I am leaving the database implementation out because you
    | haven't specified your final donation database structure yet.
    |
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | 9. Process PayPal event
    |--------------------------------------------------------------------------
    */

    switch (event.event_type) {
      // ─────────────────────────────────────────
      // ONE-TIME DONATION
      // ─────────────────────────────────────────

      case "PAYMENT.CAPTURE.COMPLETED": {
        const capture = event.resource;

        const captureId = capture?.id;

        const amount = capture?.amount?.value;

        const currency = capture?.amount?.currency_code;

        const orderId = capture?.supplementary_data?.related_ids?.order_id;

        console.log("PayPal one-time donation received:", {
          eventId: event.id,
          captureId,
          orderId,
          amount,
          currency,
        });

        /*
      |--------------------------------------------------------------------------
      | SMTP
      |--------------------------------------------------------------------------
      |
      | Call your existing SMTP mailer here.
      |
      | Example:
      |
      | await sendEmail({
      |   type: "one-time",
      |   amount,
      |   currency,
      |   orderId,
      |   captureId,
      | });
      |
      */

        // Then retrieve the order using orderId
        // const order = await getPayPalOrder(orderId);

        // const payer = order?.payment_source?.paypal;

        // const givenName = payer?.name?.given_name ?? "";

        // const surname = payer?.name?.surname ?? "";

        // const emailAdd = payer?.email_address ?? "";

        // const payerId = payer?.account_id ?? payer?.payer_id ?? "";

        try {
          const order = await getPayPalOrder(orderId);

          const payer = order?.payer;

          const givenName = payer?.name?.given_name ?? "";
          const surname = payer?.name?.surname ?? "";
          const emailAdd = payer?.email_address ?? "";
          const payerId = payer?.payer_id ?? "";

          const congratulationsTemplate = await renderTemplate(
            "congratulations",
            {
              givenName,
              surname,
              emailAdd,
              payerId,
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
            name: `${givenName} ${surname}`,
            email: process.env.EMAIL_RECEIVER,
            subject: "New Donation Received",
            html: congratulationsTemplate,
          });

          // Send to the donors' email
          await sendEmail({
            name: "Christian Ministry Website",
            email: emailAdd,
            subject: "Thank You For Your Donation",
            recipient: emailAdd,
            html: thankyouTemplate,
          });
        } catch (err) {
          console.error(err);
        }

        /*
      |--------------------------------------------------------------------------
      | Database
      |--------------------------------------------------------------------------
      |
      | Save the donation as completed.
      |
      | IMPORTANT:
      | Use event.id as your webhook idempotency key.
      |
      */

        break;
      }

      case "PAYMENT.CAPTURE.DENIED": {
        console.log("One-time PayPal donation denied:", {
          eventId: event.id,
          captureId: event.resource?.id,
        });

        break;
      }

      case "PAYMENT.CAPTURE.PENDING": {
        console.log("One-time PayPal donation pending:", {
          eventId: event.id,
          captureId: event.resource?.id,
        });

        break;
      }

      // ─────────────────────────────────────────
      // MONTHLY / RECURRING DONATION
      // ─────────────────────────────────────────

      /*
      |--------------------------------------------------------------------------
      | Monthly payment received
      |--------------------------------------------------------------------------
      */

      case "PAYMENT.SALE.COMPLETED": {
        const sale = event.resource;

        console.log("PayPal monthly donation received:", {
          eventId: event.id,
          saleId: sale?.id,
          amount: sale?.amount,
          state: sale?.state,
          billingAgreementId: sale?.billing_agreement_id,
        });

        const subscriptionId = sale?.billing_agreement_id;
        const amount = sale?.amount?.total ?? sale?.amount?.value ?? "";
        const currency =
          sale?.amount?.currency ?? sale?.amount?.currency_code ?? "";

        const subscription = await getPayPalSubscription(subscriptionId);
        const subscriber = subscription?.subscriber;

        const givenName = subscriber?.name?.given_name ?? "";
        const surname = subscriber?.name?.surname ?? "";
        const emailAdd = subscriber?.email_address ?? "";
        const payerId = subscriber?.payer_id ?? "";

        /*
        |--------------------------------------------------------------------------
        | TODO: Your SMTP mailer
        |--------------------------------------------------------------------------
        |
        | Example:
        |
        | await sendEmail({
        |     type: "monthly-payment",
        |     ...
        | });
        |
        |
        */

        try {
          const congratulationsTemplate = await renderTemplate(
            "congratulations",
            {
              givenName,
              surname,
              emailAdd,
              payerId,
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
            name: `${givenName} ${surname}`,
            email: process.env.EMAIL_RECEIVER,
            subject: "Monthly Donation Received",
            html: congratulationsTemplate,
          });

          if (emailAdd) {
            // Send to the donors
            await sendEmail({
              name: "Christian Ministry Website",
              email: emailAdd,
              subject: "Thank You For Your Monthly Donation",
              recipient: emailAdd,
              html: thankyouTemplate,
            });
          }
        } catch (error) {
          console.error(error);
        }

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        |
        | Save/update the donation here.
        |
        */

        break;
      }

      // ─────────────────────────────────────────
      // SUBSCRIPTION ACTIVATED
      // ─────────────────────────────────────────

      /*
      |--------------------------------------------------------------------------
      | Subscription activated
      |--------------------------------------------------------------------------
      */

      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const subscription = event.resource;

        console.log("PayPal subscription activated:", {
          eventId: event.id,
          subscriptionId: subscription?.id,
          status: subscription?.status,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        |
        | Send subscription activation email here.
        |
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        |
        | Update subscription status to "active".
        |
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Subscription cancelled
      |--------------------------------------------------------------------------
      */

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        const subscription = event.resource;

        console.log("PayPal subscription cancelled:", {
          eventId: event.id,
          subscriptionId: subscription?.id,
          status: subscription?.status,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        |
        | Send cancellation email here.
        |
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        |
        | Update subscription status to "cancelled".
        |
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Subscription expired
      |--------------------------------------------------------------------------
      */

      case "BILLING.SUBSCRIPTION.EXPIRED": {
        const subscription = event.resource;

        console.log("PayPal subscription expired:", {
          eventId: event.id,
          subscriptionId: subscription?.id,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Subscription suspended
      |--------------------------------------------------------------------------
      */

      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscription = event.resource;

        console.log("PayPal subscription suspended:", {
          eventId: event.id,
          subscriptionId: subscription?.id,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Subscription payment failed
      |--------------------------------------------------------------------------
      */

      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED": {
        const subscription = event.resource;

        console.log("PayPal subscription payment failed:", {
          eventId: event.id,
          subscriptionId: subscription?.id,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        |
        | You may want to notify yourself/admin here rather than
        | sending a donor "donation received" email.
        |
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Refund
      |--------------------------------------------------------------------------
      */

      case "PAYMENT.SALE.REFUNDED": {
        const sale = event.resource;

        console.log("PayPal subscription payment refunded:", {
          eventId: event.id,
          saleId: sale?.id,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Reversed payment
      |--------------------------------------------------------------------------
      */

      case "PAYMENT.SALE.REVERSED": {
        const sale = event.resource;

        console.log("PayPal subscription payment reversed:", {
          eventId: event.id,
          saleId: sale?.id,
        });

        /*
        |--------------------------------------------------------------------------
        | TODO: SMTP
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | TODO: Database
        |--------------------------------------------------------------------------
        */

        break;
      }

      /*
      |--------------------------------------------------------------------------
      | Unknown / unhandled event
      |--------------------------------------------------------------------------
      */

      default: {
        console.log(
          "PayPal webhook event received but not handled:",
          event.event_type,
        );

        break;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | 10. Return success
    |--------------------------------------------------------------------------
    |
    | PayPal requires a 2xx response for successful receipt.
    | Otherwise PayPal may retry the webhook.
    |
    */

    return NextResponse.json(
      {
        success: true,
        eventId: event.id,
        eventType: event.event_type,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PayPal webhook processing error:", error);

    /*
    |--------------------------------------------------------------------------
    | Return 500
    |--------------------------------------------------------------------------
    |
    | A 500 tells PayPal that processing failed, allowing PayPal to
    | retry the webhook.
    |
    */

    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed",
      },
      { status: 500 },
    );
  }
}
