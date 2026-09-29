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
    const { donationMethod } = await request.json();
    const response = await fetch(`${BASE_URL}/v1/payment_methods`, {
      method: "POST",
      headers: {
        Authorization: getAuthorization(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { attributes: { type: donationMethod[0].toLowerCase() } },
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
