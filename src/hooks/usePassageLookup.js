/**
 * @author jimboyz-js
 * @date 06-12-2026 Fri. 1:57 PM
 */
import { passageLookUp } from "@/lib/api/bible";
import { useEffect, useState } from "react";

export default function usePassageLookup({ translation, reference }) {
  const [passage, setPassage] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!translation || !reference.trim()) {
      setPassage({});
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;

    async function fetchPassage() {
      try {
        setLoading(true);

        const result = await passageLookUp({
          translation,
          reference,
        });

        if (mounted) {
          setPassage(result ?? {});
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

    fetchPassage();

    return () => {
      mounted = false;
    };
  }, [translation, reference]);

  return {
    passage,
    loading,
    error,
  };
}
