const DEFAULT_MAX_RESULTS = 7;

async function fetchPosts(params = {}) {
  const searchParams = new URLSearchParams();
  const {
    labels,
    query,
    maxResult = DEFAULT_MAX_RESULTS,
    pageToken,
    fetchBodies,
  } = params;

  searchParams.set("maxResults", String(maxResult));

  if (labels) searchParams.set("labels", labels);
  if (query) searchParams.set("query", query);
  if (pageToken) searchParams.set("pageToken", pageToken);
  if (typeof fetchBodies === "boolean") {
    searchParams.set("fetchBodies", String(fetchBodies));
  }

  const response = await fetch(`/api/blogger/posts?${searchParams}`, {
    cache: "no-store",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || data.error || "Blogger request failed.",
    );
  }

  return data;
}

export function getPosts({ labels, maxResult, pageToken, fetchBodies } = {}) {
  return fetchPosts({ labels, maxResult, pageToken, fetchBodies });
}

export function getAllPosts({ maxResult } = {}) {
  return fetchPosts({ maxResult });
}

export function blogArchives({ maxResult, nextPageToken, fetchBodies } = {}) {
  return fetchPosts({
    maxResult,
    pageToken: nextPageToken,
    fetchBodies,
  });
}

export async function getPostByLabel(label, max = DEFAULT_MAX_RESULTS) {
  const data = await fetchPosts({
    labels: label,
    maxResult: max,
  });

  return data.items || [];
}

export function getFeaturedPosts(maxResults = DEFAULT_MAX_RESULTS) {
  return getPostByLabel("featured:highlight", maxResults);
}

export function getSearchResult(query, pageToken = "") {
  return fetchPosts({
    query,
    pageToken,
  });
}
