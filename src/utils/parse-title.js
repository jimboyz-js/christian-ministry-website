import { excerpt } from "./excerpt";

/**
 * Blogger Post: the title should be "primary – secondary | brand" or "primary: secondary | brand"
 */

// Use this function to use both format of the blog title
export function getPrimaryTitleRegEx(title) {
  return title.split(/[-–|:]/)[0].trim();
}

export function getPrimaryTitle(title) {
  return title.includes("–")
    ? excerpt(title.split("–")[0].trim(), 60)
    : excerpt(title, 60);
}

export function getSecondaryTitle(title) {
  if (!title.includes("–")) {
    return "";
  }

  return title.split("–")[1].split("|")[0].trim();
}
