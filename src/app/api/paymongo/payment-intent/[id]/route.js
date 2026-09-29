import { NextResponse } from "next/server";
// import { sendEmail } from "@/lib/email";
// import { store } from "@/lib/store";
// import { renderTemplate } from "@/lib/render-template";

const BASE_URL = process.env.PAYMONGO_BASE_URL;

function getAuthorization() {
  return (
    "Basic " +
    Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")
  );
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const response = await fetch(`${BASE_URL}/v1/payment_intents/${id}`, {
      headers: { Authorization: getAuthorization() },
    });
    const data = await response.json();

    // Let the Webhook route handle the sendEmail logic
    // if (response.ok && data.data.attributes.status === "succeeded") {
    //   try {
    // const donationInfo = store.get(id);
    // const givenName = donationInfo.name;
    // const amount = donationInfo.amount;
    // const emailAdd = donationInfo.email;
    // const currency = donationInfo.currency;

    // const congratulationsTemplate = await renderTemplate("paymongo-congr", {
    //   givenName,
    //   emailAdd,
    //   donationMethod: donationInfo.donationMethod,
    //   intentId: id,
    //   amount,
    //   currency,
    // });
    // const thankyouTemplate = await renderTemplate("thankyou", {
    //   amount,
    //   currency,
    // });

    // await sendEmail({
    //   name: givenName,
    //   email: process.env.EMAIL_RECEIVER,
    //   html: congratulationsTemplate,
    //   subject: "New Donation Received",
    // });
    // await sendEmail({
    //   name: "Message of Hope",
    //   email: emailAdd,
    //   html: thankyouTemplate,
    //   recipient: emailAdd,
    //   subject: "Thank You For Your Support",
    // });
    // } catch (err) {
    //   console.error(err);
    // }
    // }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
