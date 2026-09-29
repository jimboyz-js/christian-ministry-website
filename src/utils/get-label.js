/**
 * @update 05-11-2026 12:14 PM Mon.
 * @author jimboyz-js
 * @param { labels } Blogger Post labels
 * @returns label
 */

// Labels in Blogger can be used for various purposes, such as categorizing posts,
// marking special features, or even controlling display logic. In this implementation,
// we look for labels that are wrapped in backticks (`) to identify special labels.
// If such a label is found, we return it without the backticks. Otherwise, we return null or empty string.
function getSpecialLabel(labels) {
  if (!Array.isArray(labels)) return null;

  const postLabel = labels.find((label) => label.includes("`")) || null;

  return postLabel?.replace(/`/g, "");
}

// This function display the label in the post card as long as it is set to true label display.
// But I change the display label in the post card, instead of plain label I changed to 'category:{value}'
// In developing this web app, gradually I change the Blogger labels setup and remove backticks for some special label.
// You can customize this function to use as display in the post card rather than the category display.
function getDisplayLabel_(labels) {
  // Return null if labels do not exist or are invalid
  if (!Array.isArray(labels) || labels.length === 0) {
    return null;
  }

  // Find the label wrapped with backticks
  const specialLabel = labels.find((label) => label.includes("`"));

  // Use the special label if found,
  // otherwise fallback to the first label
  const selectedLabel = specialLabel || labels[0];

  // Remove backticks before displaying
  return selectedLabel.replace(/`/g, "");
}

// Display the category
function getDisplayLabel(labels) {
  if (!Array.isArray(labels) || labels.length === 0) return null;

  if (hasCategories(labels)) {
    return formatLabel(labels[0]);
  }

  return null;
}

function formatLabel(label) {
  return label
    .replace(
      /^(category:|tag:|related:|featured:|type:|series:|series-order:)/,
      "",
    )
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getLabel(label) {
  if (typeof label !== "string") return null;

  const separatorIndex = label.indexOf(":");
  if (separatorIndex < 1) return null;

  const type = label.slice(0, separatorIndex).trim();
  const name = label.slice(separatorIndex + 1).trim();

  if (!type || !name) return null;

  return { type, name };
}

function labelSlugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[–—:]/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function hasTags(labels) {
  if (!labels) {
    return false;
  }
  return labels.filter((label) => label.startsWith("tag:")).length > 0;
}

function hasCategories(labels) {
  if (!labels) {
    return false;
  }
  return labels.filter((label) => label.startsWith("category:")).length > 0;
}

function getTag(labels) {
  if (!labels) return null;

  return getTags(labels)[0].replace("tag:", "");
}

function getTags(labels) {
  if (!labels) return null;

  const tags = labels.filter((label) => label.startsWith("tag:"));

  return tags;
}

function getCategory(labels) {
  return getCategories(labels)
    ? getCategories(labels)[0].replace("category:", "")
    : null;
}

function getCategories(labels) {
  if (!labels) return null;
  return labels.filter((label) => label.startsWith("category:"));
}

function getRelatedTag(labels) {
  if (!labels) return "";
  const relatedTags = labels.find((label) => label.startsWith("related:"));
  return relatedTags?.replace("related:", "");
}

function getFeaturedTag(labels) {
  if (!labels) return null;
  const featuredTags = labels.find((label) => label.startsWith("featured:"));
  return featuredTags?.replace("featured:", "");
}

function getSeriesLabel(labels) {
  if (!labels) return null;
  const series = labels.find((label) => label.includes("type:series-overview"));

  return series ? series.replace("type:", "") : null;
}

function getSeriesTopicLabel(labels) {
  if (!labels) return null;

  const topics = labels.find((label) => label.includes("topic-series:"));

  return topics ? topics.replace("topic-series:", "") : null;
}

function getSeriesOrder(labels = []) {
  const orderLabel = labels.find((label) => label.startsWith("series-order:"));

  if (!orderLabel) return Infinity;

  return Number(orderLabel?.replace("series-order:", ""));
}

export {
  getSpecialLabel,
  getDisplayLabel_,
  getDisplayLabel,
  formatLabel,
  getLabel,
  labelSlugify,
  hasTags,
  hasCategories,
  getTag,
  getTags,
  getCategory,
  getCategories,
  getRelatedTag,
  getFeaturedTag,
  getSeriesLabel,
  getSeriesTopicLabel,
  getSeriesOrder,
};
