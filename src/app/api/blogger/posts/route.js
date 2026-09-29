import { NextResponse } from "next/server";

const MAX_RESULTS = Number(process.env.MAX_RESULTS || 7);
const BLOGGER_API_URL = "https://www.googleapis.com/blogger/v3/blogs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const requestedMaxResults = Number(
      searchParams.get("maxResults") || MAX_RESULTS,
    );
    const maxResults = Math.min(Math.max(requestedMaxResults, 1), 500);
    const pageToken = searchParams.get("pageToken") || "";
    const labels = searchParams.get("labels") || "";
    const query = searchParams.get("query") || "";
    const fetchBodies = searchParams.get("fetchBodies");

    const endpoint = query ? "posts/search" : "posts";
    const bloggerUrl = new URL(
      `${BLOGGER_API_URL}/${process.env.BLOG_ID}/${endpoint}`,
    );

    bloggerUrl.searchParams.set("key", process.env.API_KEY);
    bloggerUrl.searchParams.set("maxResults", String(maxResults));

    if (labels && !query) {
      bloggerUrl.searchParams.set("labels", labels);
    }

    if (query) {
      bloggerUrl.searchParams.set("q", query);
    }

    if (pageToken) {
      bloggerUrl.searchParams.set("pageToken", pageToken);
    }

    if (fetchBodies === "true" || fetchBodies === "false") {
      bloggerUrl.searchParams.set("fetchBodies", fetchBodies);
    }

    // const shouldSkipCache = Boolean(pageToken) || fetchBodies === "true";

    const shouldSkipCache =
      Boolean(pageToken) || fetchBodies === "true" || maxResults >= 500;

    const response = await fetch(
      bloggerUrl,
      // pageToken
      //   ? {
      //       cache: "no-store",
      //     }
      //   : {
      //       next: {
      //         revalidate: query ? 60 : 3600,
      //       },
      //     },

      shouldSkipCache
        ? {
            cache: "no-store",
          }
        : {
            next: {
              revalidate: query ? 60 : 3600,
            },
          },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Blogger posts." },
      { status: 500 },
    );
  }
}
