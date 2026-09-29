/**
 * @author jimboyz-js
 * @date 05-26-2026 Tue. 3:21 PM
 */

import { isObject } from "./check";

export function hasPost(posts) {
  return Array.isArray(posts) && posts.length > 0;
}

export function hasPostObj(posts) {
  if (!posts) {
    return false;
  }

  return isObject(posts) ? Object.entries(posts).length > 0 : false;
}
