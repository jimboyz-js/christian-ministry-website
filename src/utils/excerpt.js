/**
 * @update 05-10-2026 4:16 PM Sun.
 * @author jimboyz-js
 * @param { text, max } text to be trimmed, at exactly given max word count.
 * @returns trimmed text
 */

function truncateText(text, max = 150) {
  if (!text) {
    return "";
  }

  if (text.length <= max) {
    return text;
  }

  const trimmed = text.slice(0, max);

  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
}

export function excerpt(html, max = 150) {
  if (!html) {
    return "";
  }

  // Remove HTML comments
  let text = html.replace(/<!--[\s\S]*?-->/g, "");

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // Clean extra spaces/newlines
  text = text.replace(/\s+/g, " ").trim();

  // Short text
  if (text.length <= max) {
    return text;
  }

  // Prevent cutting words
  const trimmed = text.slice(0, max);

  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
}

// function truncateText(text, max = 100) {
//   excerpt(text, max);
// }

export { excerpt, truncateText };
