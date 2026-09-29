/**
 * @author jimboyz-js
 * @date 06-12-2026 Fri. 1:57 PM
 */
import { getBibleTranslations } from "@/lib/api/bible";
import { useEffect, useState } from "react";

export default function useBibleTranslation() {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchBibleTranslations() {
      try {
        setLoading(true);

        const result = await getBibleTranslations();

        if (mounted) {
          setTranslations(result);
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

    fetchBibleTranslations();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    translations,
    loading,
    error,
  };
}
