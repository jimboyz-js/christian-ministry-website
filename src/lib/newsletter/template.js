function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function getFeaturedImage(post) {
  if (post?.images?.length) {
    return post.images[0];
  }

  const match = String(post?.content || "").match(
    /<img[^>]+src=["']([^"']+)["']/i,
  );
  return match?.[1] || null;
}

function getExcerpt(post) {
  const candidate =
    post?.contentSnippet || post?.excerpt || post?.content || "";
  const plainText = stripHtml(candidate);

  if (!plainText) {
    return "Read the full article on our website.";
  }

  return plainText.length > 180 ? `${plainText.slice(0, 177)}...` : plainText;
}

export function generateNewsletterHTML(post) {
  const title = stripHtml(
    post?.title || "New article on Christian Ministry Website",
  );
  const url = post?.url || "https://ministry-website.org/blog";
  const excerpt = getExcerpt(post);
  const image = getFeaturedImage(post);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f7f7f7; margin:0; padding:24px; color:#1f2937;">
    <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
      <div style="background:#0f766e; padding:24px 24px 16px; color:#ffffff;">
        <h1 style="margin:0 0 8px; font-size:28px;">Christian Ministry Website</h1>
        <p style="margin:0; font-size:14px; opacity:0.9;">A fresh article has just been published.</p>
      </div>

      ${image ? `<img src="${image}" alt="${title}" style="width:100%; display:block; max-height:320px; object-fit:cover;" />` : ""}

      <div style="padding:24px;">
        <h2 style="margin:0 0 12px; font-size:24px; color:#111827;">${title}</h2>
        <p style="margin:0 0 20px; line-height:1.6; font-size:16px;">${excerpt}</p>
        <a href="${url}" style="display:inline-block; padding:12px 20px; background:#0f766e; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">Read More</a>
      </div>

      <div style="padding:0 24px 24px; font-size:12px; color:#6b7280;">
        <p style="margin:0;">You are receiving this because you subscribed to Christian Ministry Website.</p>
        <p style="margin:8px 0 0;"><a href="https://ministry-website.org/unsubscribe" style="color:#0f766e;">Unsubscribe</a></p>
      </div>
    </div>
  </body>
</html>`;
}

export default generateNewsletterHTML;
