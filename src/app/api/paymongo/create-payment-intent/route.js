import { store } from "@/lib/store";
import { NextResponse } from "next/server";

const BASE_URL = process.env.PAYMONGO_BASE_URL;

function getAuthorization() {
  return (
    "Basic " +
    Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")
  );
}

export async function POST(request) {
  try {
    const { amount, currency, donationMethod, name, email } =
      await request.json();

    const response = await fetch(`${BASE_URL}/v1/payment_intents`, {
      method: "POST",
      headers: {
        Authorization: getAuthorization(),
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   data: {
      //     attributes: {
      //       amount: Math.round(Number(amount) * 100),
      //       currency,
      //       payment_method_allowed: [donationMethod.toLowerCase()],
      //       capture_type: "automatic",
      //       description: "Ministry Donation",
      //     },
      //   },
      // }),
      body: JSON.stringify({
        data: {
          attributes: {
            amount: Math.round(Number(amount) * 100),
            currency,
            payment_method_allowed: [donationMethod.toLowerCase()],
            capture_type: "automatic",
            description: "Ministry Donation",

            metadata: {
              donor_name: name ?? "",
              donor_email: email ?? "",
              donation_method: donationMethod ?? "",
            },
          },
        },
      }),
    });

    const data = await response.json();

    store.set(data.data.id, { amount, currency, donationMethod, name, email });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
