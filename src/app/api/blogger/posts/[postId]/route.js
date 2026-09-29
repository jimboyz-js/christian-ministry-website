import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { postId } = await params;

  if (!postId) {
    return NextResponse.json(
      { error: "Post ID is required." },
      { status: 400 },
    );
  }

  const url = new URL(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${encodeURIComponent(postId)}`,
  );

  url.searchParams.set("key", process.env.API_KEY);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Blogger post." },
      { status: 500 },
    );
  }
}
