/**
 * @update 05-11-2026 4:07 PM Mon.
 * @author jimboyz-js
 * @param { title } is a title string
 * @returns slugified title
 * @param { url } is a url string
 * @returns slugified title from the url
 */

// This function is used for creating slug from blog title itself.
// You can pass the post.title as the argument to this function, and it will return a slugified version of the title that can be used in the URL.
export function slugify_(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// This function is used for extracting slug from the URL, especially for blog post URLs that follow the format: /blog/post/{slug}--{id}
// You can pass the post.url as the argument to this function, and it will return the slug part of the URL, which is typically used for routing to the correct blog post.
export function slugify(url) {
  return url.split("/").pop().replace(".html", "");
}
