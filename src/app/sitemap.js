/**
 * @author jimboyz-js
 * @date 07-28-2026 5:34 PM TUE.
 */
import { getPosts } from "@/lib/api/blogger";
import { slugify } from "@/utils/slugify";

export const revalidate = 3600;

export default async function sitemap() {
  const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  const posts = [];
  let pageToken;

  do {
    const result = await getPosts({ maxResult: 100, pageToken });
    posts.push(...(result.items ?? []));
    pageToken = result.nextPageToken;
  } while (pageToken);

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/listen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/watch`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/post/${slugify(post.url)}--${post.id}`,
      lastModified: new Date(post.updated || post.published),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
