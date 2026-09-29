import { NextResponse } from "next/server";
import https from "node:https";

const DEEPL_USAGE_URL = "https://api-free.deepl.com/v2/usage";

export const runtime = "nodejs";

function requestDeepLUsage(apiKey) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      DEEPL_USAGE_URL,
      {
        method: "GET",
        family: 4,
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey.trim()}`,
        },
      },
      (response) => {
        let responseText = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          responseText += chunk;
        });
        response.on("end", () => {
          let data;

          try {
            data = responseText ? JSON.parse(responseText) : {};
          } catch {
            data = { message: responseText };
          }

          resolve({ response, data });
        });
      },
    );

    request.on("error", reject);
    request.end();
  });
}

export async function GET() {
  const apiKey = process.env.DEEPL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Translation service is not configured." },
      { status: 500 },
    );
  }

  try {
    const { response, data } = await requestDeepLUsage(apiKey);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      return NextResponse.json(
        { error: data?.message || "Unable to read DeepL usage." },
        { status: 502 },
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("DeepL usage request failed:", error);

    return NextResponse.json(
      { error: "The translation provider could not be reached." },
      { status: 502 },
    );
  }
}
