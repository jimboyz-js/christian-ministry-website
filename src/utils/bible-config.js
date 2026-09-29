/**
 * @author jimboyz-js
 * Date: Jun 14, 2026 2:07 PM Sun.
 */

const biblePrefsKey = "js-bible-preference-key";

export const loadBiblePref = () => {
  if (typeof window === "undefined") return null;
  const data = window.localStorage.getItem(biblePrefsKey);
  return JSON.parse(data);
};

export const saveBiblePref = (pref = {}) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(biblePrefsKey, JSON.stringify(pref));
};
