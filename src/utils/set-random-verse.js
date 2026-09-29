/**
 * @author jimboyz-js
 * date: 06-01-2026 Mon. 5:23 PM
 */

import { sabbathVerses, verses } from "@/constants";

export function getTodayVerseReference() {
  const today = new Date();

  const isSaturday = today.getDay() === 6;

  const dayNum = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));

  return isSaturday
    ? sabbathVerses[dayNum % sabbathVerses.length]
    : verses[dayNum % verses.length];
}
