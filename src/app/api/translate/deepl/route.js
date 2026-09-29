import { NextResponse } from "next/server";
import https from "node:https";
import crypto from "node:crypto";
import { LANGUAGES, SOURCE_LANGUAGE } from "@/constants";

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

// Languages that your website actually offers.
const ALLOWED_LANGUAGES = new Set(LANGUAGES);

// Maximum HTML content accepted by your endpoint.
// This is an application-level safety limit, not DeepL's limit.
const MAX_CONTENT_LENGTH = 100_000;

// Simple in-memory rate limiter.
//
// IMPORTANT:
// This is suitable for a single-instance deployment or as a basic
// protection layer. For multiple server instances, use a shared
// rate limiter such as Redis instead.
const rateLimitStore = new Map();

const RATE_LIMIT = 10; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute
const TRANSLATION_CACHE_TTL = 30 * 24 * 60 * 60 * 1000;
const translationCache = new Map();
const pendingTranslations = new Map();

export const runtime = "nodejs";

function getTranslationCacheKey(content, targetLanguage) {
  return crypto
    .createHash("sha256")
    .update(`${targetLanguage}\0${content}`)
    .digest("hex");
}

function getCachedTranslation(cacheKey) {
  const cached = translationCache.get(cacheKey);

  if (!cached) return null;

  if (Date.now() - cached.createdAt > TRANSLATION_CACHE_TTL) {
    translationCache.delete(cacheKey);
    return null;
  }

  return cached.translation;
}

function cacheTranslation(cacheKey, translation) {
  translationCache.set(cacheKey, {
    createdAt: Date.now(),
    translation,
  });
}

function requestDeepL(apiKey, content, targetLanguage) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      DEEPL_API_URL,
      {
        method: "POST",
        family: 4,
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey.trim()}`,
          "Content-Type": "application/json",
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
    request.end(
      JSON.stringify({
        text: [content],
        source_lang: SOURCE_LANGUAGE,
        target_lang: targetLanguage,
        tag_handling: "html",
      }),
    );
  });
}

function getClientIP(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.start > RATE_WINDOW) {
    rateLimitStore.set(ip, {
      start: now,
      count: 1,
    });

    return false;
  }

  entry.count += 1;

  if (entry.count > RATE_LIMIT) {
    return true;
  }

  return false;
}

export async function POST(request) {
  try {
    /*
     * ------------------------------------------------------------
     * 1. Check API key
     * ------------------------------------------------------------
     */

    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
      console.error("DEEPL_API_KEY is not configured.");

      return NextResponse.json(
        {
          error: "Translation service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * ------------------------------------------------------------
     * 2. Rate limiting
     * ------------------------------------------------------------
     */

    const clientIP = getClientIP(request);

    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        {
          error: "Too many translation requests. Please try again later.",
        },
        {
          status: 429,
        },
      );
    }

    /*
     * ------------------------------------------------------------
     * 3. Parse request body
     * ------------------------------------------------------------
     */

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "The translation request body must be valid JSON." },
        { status: 400 },
      );
    }

    const content = body?.content;
    const targetLanguage = body?.targetLanguage;

    /*
     * ------------------------------------------------------------
     * 4. Validate content
     * ------------------------------------------------------------
     */

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        {
          error: "Content is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        {
          error: "Content is too large to translate.",
        },
        {
          status: 413,
        },
      );
    }

    /*
     * ------------------------------------------------------------
     * 5. Validate target language
     * ------------------------------------------------------------
     */

    if (
      typeof targetLanguage !== "string" ||
      !ALLOWED_LANGUAGES.has(targetLanguage)
    ) {
      return NextResponse.json(
        {
          error: "Unsupported target language.",
        },
        {
          status: 400,
        },
      );
    }

    const cacheKey = getTranslationCacheKey(content, targetLanguage);
    const cachedTranslation = getCachedTranslation(cacheKey);

    if (cachedTranslation) {
      return NextResponse.json({
        translation: cachedTranslation,
        targetLanguage,
        cached: true,
      });
    }

    /*
     * ------------------------------------------------------------
     * 6. Call DeepL
     * ------------------------------------------------------------
     */

    let response;
    let data;

    try {
      let translationRequest = pendingTranslations.get(cacheKey);

      if (!translationRequest) {
        translationRequest = requestDeepL(apiKey, content, targetLanguage);
        pendingTranslations.set(cacheKey, translationRequest);
      }

      ({ response, data } = await translationRequest);
    } catch (error) {
      console.error("DeepL request failed:", error);

      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? `The translation provider could not be reached: ${error.code || error.message}`
              : "The translation provider could not be reached.",
        },
        { status: 502 },
      );
    } finally {
      pendingTranslations.delete(cacheKey);
    }

    /*
     * ------------------------------------------------------------
     * 7. Handle DeepL errors
     * ------------------------------------------------------------
     */

    if (response.statusCode < 200 || response.statusCode >= 300) {
      console.error("DeepL API error:", {
        status: response.statusCode,
        data,
      });

      return NextResponse.json(
        {
          error: data?.message || data?.error || "Translation service error.",
        },
        {
          status: 502,
        },
      );
    }

    /*
     * ------------------------------------------------------------
     * 8. Get translated content
     * ------------------------------------------------------------
     */

    const translation = data?.translations?.[0]?.text;

    if (!translation) {
      console.error("DeepL returned no translation.");

      return NextResponse.json(
        {
          error: "No translation was returned.",
        },
        {
          status: 502,
        },
      );
    }

    cacheTranslation(cacheKey, translation);

    /*
     * ------------------------------------------------------------
     * 9. Return translation
     * ------------------------------------------------------------
     */

    return NextResponse.json({
      translation,
      targetLanguage,
      cached: false,
    });
  } catch (error) {
    console.error("Translation route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to translate content.",
      },
      {
        status: 500,
      },
    );
  }
}
