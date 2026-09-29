/**
 * @author jimboyz-js
 * @date 08-14-2026 FRI. 2:57 PM
 */

import RSS from "rss";

export async function GET() {
  const { BLOG_ID, API_KEY, BASE_URL } = process.env;
  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`,
  );

  const data = await response.json();

  const feed = new RSS({
    title: "Christian Ministry Website",
    description: "Latest posts",
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/blog/rss.xml`,
    language: "en",
  });

  for (const post of data.items ?? []) {
    feed.item({
      title: post.title,
      description: post.content,
      url: post.url,
      date: post.published,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
