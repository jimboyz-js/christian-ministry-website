import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (typeof query !== "string" || query.trim() === "") {
      return NextResponse.json(
        { error: "A GraphQL query is required." },
        { status: 400 },
      );
    }

    const response = await fetch("https://bibleql.dev/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BIBLEQL_API_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Bible API request failed.",
      },
      { status: 500 },
    );
  }
}
