/**
 * @author jimboyz-js
 * @date 06-3-2026 Wed. 11:15 AM
 */
import { getVerse, getVerseFromOurMannaAPI } from "@/lib/api/bible";
import { useEffect, useState } from "react";

export default function useBibleVerseAPI(bibleAPI = "bible-api.com") {
  const [verses, setVerses] = useState({ verses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const CACHE_KEY = "js-daily-bible-verse";

  async function dailyBibleVerse() {
    try {
      const source =
        bibleAPI === "bible-api.com" ? "bible-api.com" : "ourmanna";
      const result =
        source === "bible-api.com"
          ? await getVerse()
          : await getVerseFromOurMannaAPI();
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ date: today, bible_data: result }),
      );
      setVerses(result);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function fetchBibleVerse() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);

        setLoading(true);

        if (mounted) {
          if (cached) {
            const data = JSON.parse(cached);
            if (data.date === today) {
              setVerses(data.bible_data);
            } else {
              await dailyBibleVerse();
            }
          } else {
            await dailyBibleVerse();
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchBibleVerse();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    verses,
    loading,
    error,
    bibleAPI,
  };
}
