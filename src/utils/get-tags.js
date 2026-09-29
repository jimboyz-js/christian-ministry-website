import { getLabel } from "./get-label";

const MAX_RESULTS = 100;

export async function getTagsWithCounts() {
  const tagCounts = new Map();
  let pageToken = "";

  do {
    const params = new URLSearchParams({
      key: process.env.API_KEY,
      maxResults: String(MAX_RESULTS),
      fields: "items(id,labels),nextPageToken",
    });

    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts?${params}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Blogger tag request failed: ${response.status}`);
    }

    const data = await response.json();

    for (const post of data.items || []) {
      const postTags = new Set();

      for (const rawLabel of post.labels || []) {
        const parsedLabel = getLabel(rawLabel);
        if (parsedLabel?.type.toLowerCase() !== "tag") continue;

        const name = parsedLabel.name.trim();
        if (name) postTags.add(name.toLowerCase());
      }

      for (const tagName of postTags) {
        const current = tagCounts.get(tagName);
        tagCounts.set(tagName, {
          name: current?.name || tagName,
          count: (current?.count || 0) + 1,
        });
      }
    }

    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return [...tagCounts.values()].sort((firstTag, secondTag) =>
    firstTag.name.localeCompare(secondTag.name, undefined, {
      sensitivity: "base",
    }),
  );
}
