import { hasPostBeenSent } from "./storage";

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const API_KEY = process.env.BLOGGER_API_KEY;

export async function getUnsentPosts(
  limit = Number(process.env.NEWSLETTER_POST_FETCH_LIMIT || 20),
) {
  if (!BLOG_ID || !API_KEY) {
    throw new Error("Blogger environment variables are not configured.");
  }

  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?maxResults=${limit}&key=${API_KEY}`,
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Blogger API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.items) || !data.items.length) {
    return [];
  }

  const posts = [...data.items].reverse();

  return posts.filter((post) => !hasPostBeenSent(post.id));
}

export default getUnsentPosts;
