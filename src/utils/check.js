/**
 * @author jimboyz-js
 * @date 05-29-2026 Fri. 2:39 PM
 */

export function _isObject(value) {
  const isObject =
    value !== null && typeof value === "object" && !Array.isArray(value);

  return isObject;
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
