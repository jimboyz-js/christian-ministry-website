import { runNewsletter } from "@/lib/newsletter";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const results = await runNewsletter();
    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
