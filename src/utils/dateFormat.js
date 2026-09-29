/**
 * @update 05-10-2026 4:26 PM Sun.
 * @author jimboyz-js
 * @param { date } Date
 * @returns formatted date
 */

const DATE_ONLY = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const DATE_WITH_TIME = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
};

export function dateFormat(
  date,
  options = { year: "numeric", month: "short", day: "numeric" },
) {
  return new Date(date).toLocaleString("en-US", options);
}

export function formatDate(date) {
  return new Date(date).toLocaleString("en-US", DATE_ONLY);
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString("en-US", DATE_WITH_TIME);
}
