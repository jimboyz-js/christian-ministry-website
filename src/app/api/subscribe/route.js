import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, isAgree } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required..." },
        { status: 400 },
      );
    }

    if (!isAgree) {
      return NextResponse.json(
        { message: "You must agree first." },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.MAILERLITE_API_END_POINT}/subscribers`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MAILERLITE_API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          groups: [process.env.MAILERLITE_GROUP_ID],
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Subscription failed", errors: data.errors },
        { status: res.status },
      );
    }

    const message =
      "Thank you for subscribing! We're glad to have you join our community. Please check your email and click the confirmation link to complete your subscription. If you don't receive the email within a few minutes, be sure to check your Spam or Junk folder. After confirming, you'll receive updates whenever we publish new messages.";

    return NextResponse.json(
      { message, subscriber: data.data },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
