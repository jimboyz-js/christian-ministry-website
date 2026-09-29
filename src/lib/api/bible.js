/**
 * @author jimboyz-js
 * date: 06-01-2026 Mon. 5:30 PM
 */
import { getTodayVerseReference } from "@/utils";

export async function getVerse() {
  const reference = getTodayVerseReference();

  const response = await fetch(
    `https://bible-api.com/${encodeURIComponent(reference)}`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return response.json();
}

export async function getVerseFromOurMannaAPI() {
  const response = await fetch(
    "https://beta.ourmanna.com/api/v1/get/?format=json",
  );

  return await response.json();
}
