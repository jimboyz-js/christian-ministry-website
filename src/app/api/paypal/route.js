import { store } from "@/lib/store";
import { NextResponse } from "next/server";

const PAYPAL_MODE = process.env.PAYPAL_MODE;
const paypalUrl =
  PAYPAL_MODE === "sandbox"
    ? process.env.PAYPAL_SANDBOX_BASE_URL
    : process.env.PAYPAL_BASE_URL;

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");
  const response = await fetch(`${paypalUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}

async function onetimeDonation(amount, currency) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${paypalUrl}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: currency, value: amount } }],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "Christian Ministry Website",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: `${process.env.FRONT_END_BASE_URL}/donate/paypal/success`,
            cancel_url: `${process.env.FRONT_END_BASE_URL}/donate/cancel?donation=paypal`,
            shipping_preference: "NO_SHIPPING",
          },
        },
      },
    }),
  });
  return await response.json();
}

async function createProduct() {
  const accessToken = await getAccessToken();
  const response = await fetch(`${paypalUrl}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Monthly Donation",
      description: "Support Christian Ministry Website every month.",
      type: "SERVICE",
    }),
  });
  return await response.json();
}

async function createPlan(amount, currency) {
  const accessToken = await getAccessToken();
  const { id: productId } = await createProduct();
  const response = await fetch(`${paypalUrl}/v1/billing/plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: productId,
      name: `${amount} ${currency} Monthly Donation`,
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: { value: `${amount}`, currency_code: `${currency}` },
          },
        },
      ],
      payment_preferences: { auto_bill_outstanding: true },
    }),
  });
  return await response.json();
}

async function creatSubscription(amount, currency) {
  const accessToken = await getAccessToken();
  const { id: planId } = await createPlan(amount, currency);
  const response = await fetch(`${paypalUrl}/v1/billing/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      application_context: {
        brand_name: "Christian Ministry Website",
        locale: "en-PH",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: `${process.env.FRONT_END_BASE_URL}/donate/paypal/complete-subscription`,
        cancel_url: `${process.env.FRONT_END_BASE_URL}/donate/cancel?donation=paypal`,
      },
    }),
  });
  return await response.json();
}

export async function POST(request) {
  try {
    const { amount, currency, donationType } = await request.json();

    if (!amount || !currency) {
      return NextResponse.json(
        { success: false, message: "Amount and currency are required." },
        { status: 400 },
      );
    }

    if (donationType === "one-time") {
      const order = await onetimeDonation(amount, currency);
      const approveUrl = order.links.find(
        (link) => link.rel === "approve" || link.rel === "payer-action",
      ).href;
      store.set(order.id, { amount, currency, createdAt: Date.now() });
      return NextResponse.json({
        success: true,
        message: "Order successfully created.",
        orderId: order.id,
        approve_url: approveUrl,
      });
    } else if (donationType === "monthly") {
      const monthlySubscription = await creatSubscription(amount, currency);
      store.set(monthlySubscription.id, {
        amount,
        currency,
        createdAt: Date.now(),
      });
      const approveUrl = monthlySubscription.links.find(
        (link) => link.rel === "approve",
      ).href;
      return NextResponse.json({
        success: true,
        subscriptionID: monthlySubscription.id,
        approve_url: approveUrl,
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
