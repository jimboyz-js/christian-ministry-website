/**
 * @author jimboyz-js
 * @date May 04, 2026 MON. 3:40 PM
 */

import { getFeaturedTag } from "@/utils";

// Blog post max result
const MAX_RESULTS = process.env.NEXT_PUBLIC_MAX_RESULTS || 7;

/**
 *
 * @param {Blogger blog ID} blogId
 * @returns Array of object
 */
export async function getBlogById(blogId = process.env.BLOG_ID, apiKey = "") {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}?key=${apiKey}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  const res = await data.json();
  return res;
}

/**
 *
 * @param {Blog Base URL} blogBaseUrl
 * @returns Array of object
 */
export async function getBlogByUrl(blogBaseUrl = process.env.BLOG_BASE_URL) {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${blogBaseUrl}&key=${process.env.API_KEY}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  const res = await data.json();
  return Object.values(res);
}

/**
 * Get single post
 * @param {blogger post id} postId
 */
export async function getPostById(postId) {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${postId}?key=${process.env.API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return await data.json();
}

/**
 * Get posts by the given URL
 * @returns Array of object
 */

export async function getPosts({
  apiUrl,
  maxResult = MAX_RESULTS,
  pageToken = "",
}) {
  let url = apiUrl
    ? apiUrl
    : `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}/posts?key=${process.env.NEXT_PUBLIC_API_KEY}&maxResults=${maxResult}`;

  // Add pageToken only if exists
  if (pageToken) {
    url += `&pageToken=${encodeURIComponent(pageToken)}`;
  }

  const data = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  return await data.json();
}

/**
 * Get all posts
 * @returns Array of object
 */
export async function getAllPosts({ maxResult = MAX_RESULTS }) {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}/posts?key=${process.env.NEXT_PUBLIC_API_KEY}&maxResults=${maxResult}`;
  // const url = `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts?key=${process.env.API_KEY}&maxResults=${maxResult}`;

  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  return await res.json();
}

export async function blogArchives({
  maxResult = MAX_RESULTS,
  nextPageToken = "",
  fetchBodies = false,
}) {
  let url = `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}/posts?key=${process.env.NEXT_PUBLIC_API_KEY}&maxResults=${maxResult}&fetchBodies=${fetchBodies}`;
  if (nextPageToken) {
    url += `&pageToken=${encodeURIComponent(nextPageToken)}`;
  }
  // Original: fetchBodies=false (metadata only)
  const posts = await getPosts({
    apiUrl: url,
  });
  return posts;
}

// New: fetchBodies=true (full content)
// export async function blogArchivesWithContent({
//   maxResult = MAX_RESULTS,
//   nextPageToken = "",
// }) {
//   const posts = await getPosts({
//     apiUrl: `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}/posts?key=${process.env.NEXT_PUBLIC_API_KEY}&maxResults=${maxResult}&fetchBodies=true&pageToken=${nextPageToken}`,
//   });
//   return posts;
// }

/**
 *
 * @param {post label} label
 * @returns Array of Objects
 */
export async function getPostByLabel(label, max = MAX_RESULTS) {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}/posts?labels=${encodeURIComponent(label)}&key=${process.env.NEXT_PUBLIC_API_KEY}&maxResults=${max}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  const res = await data.json();
  return res.items;
}

/**
 *
 * @param {query} searchPost
 * @return Array of Object
 */
export async function getSearchResult(searchPost, pageToken = "") {
  let url = `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}/posts/search?q=${encodeURIComponent(searchPost)}&key=${process.env.NEXT_PUBLIC_API_KEY}`;

  if (pageToken) {
    url += `&pageToken=${encodeURIComponent(pageToken)}`;
  }

  const data = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const res = await data.json();
  return res;
}

/**
 *
 * @param {Blog Post ID} postId
 * @return Array of Object
 */
export async function getPostsComments(postId) {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${postId}/comments?key=${process.env.API_KEY}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  const res = await data.json();

  return res.items;
}

/**
 *
 * @param {Blog Post ID} postId
 * @param {Blog Post Comment ID} commentId
 * @return Object
 */
export async function getSpecificComment(postId, commentId) {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${postId}/comments/${commentId}?key=${process.env.API_KEY}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  const res = await data.json();

  return res;
}

export async function getFeaturedPosts(maxResults = MAX_RESULTS) {
  return await getPostByLabel("featured:highlight", maxResults);
}

export async function getAllPages() {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/pages?key=${process.env.API_KEY}`,
    {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    },
  );

  return await data.json();
}

export async function getPageById(pageId, revalidate = 3600) {
  const data = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/pages/${pageId}?key=${process.env.API_KEY}`,
    {
      next: {
        revalidate,
      },
    },
  );

  return await data.json();
}
