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
    const { paymentIntentId, paymentMethodId, clientKey } =
      await request.json();

    const response = await fetch(
      `${BASE_URL}/v1/payment_intents/${paymentIntentId}/attach`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthorization(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            attributes: {
              payment_method: paymentMethodId,
              client_key: clientKey,
              return_url: `${process.env.FRONT_END_BASE_URL}/donate/paymongo/complete-donation?intent_id_fallback=${paymentIntentId}`,
            },
          },
        }),
      },
    );

    const data = await response.json();

    const approve_url = data.data.attributes.next_action.redirect.url;
    const success = data.data.attributes.status === "awaiting_next_action";

    return NextResponse.json({
      success,
      approve_url,
      message: data.data.attributes.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
