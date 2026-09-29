import { NextResponse } from "next/server";
// import { sendEmail } from "@/lib/email";
// import { store } from "@/lib/store";
// import { renderTemplate } from "@/lib/render-template";

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

export async function POST(request) {
  try {
    const { subscription_id } = await request.json();
    const accessToken = await getAccessToken();
    const response = await fetch(
      `${paypalUrl}/v1/billing/subscriptions/${subscription_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    // const monthlyDonation = store.get(subscription_id);

    // const givenName = data.subscriber?.name?.given_name;
    // const surname = data.subscriber?.name?.surname;
    // const emailAdd = data.subscriber?.email_address;
    // const payerId = data.subscriber?.payer_id;

    // const congratulationsTemplate = await renderTemplate("congratulations", {
    //   givenName,
    //   surname,
    //   emailAdd,
    //   payerId,
    //   amount: monthlyDonation?.amount,
    //   currency: monthlyDonation?.currency,
    // });
    // const thankyouTemplate = await renderTemplate("thankyou", {
    //   amount: monthlyDonation?.amount,
    //   currency: monthlyDonation?.currency,
    // });

    // if (response.ok && data?.status === "ACTIVE" && monthlyDonation) {
    // try {
    //   await sendEmail({
    //     name: "Christian Ministry Website",
    //     email: emailAdd,
    //     subject: "Thank You For Your Monthly Donation",
    //     recipient: emailAdd,
    //     html: thankyouTemplate,
    //   });
    //   await sendEmail({
    //     name: `${givenName} ${surname}`,
    //     email: process.env.EMAIL_RECEIVER,
    //     subject: "Monthly Donation Received",
    //     html: congratulationsTemplate,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    // }

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
