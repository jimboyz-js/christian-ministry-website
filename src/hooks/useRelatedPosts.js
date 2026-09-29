/**
 * @author jimboyz-js
 * @date 05-26-2026 Tue. 12:51 PM
 */
import { getPostByLabel } from "@/lib/api/blogger-client";
import { useEffect, useState } from "react";

export default function useRelatedPosts({
  label,
  limit = process.env.NEXT_PUBLIC_MAX_RESULTS,
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchRelatedPosts() {
      try {
        setLoading(true);
        const result = await getPostByLabel(label, limit);

        if (mounted) {
          setPosts(result);
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

    fetchRelatedPosts();

    return () => {
      mounted = false;
    };
  }, [limit]);

  return {
    posts,
    loading,
    error,
  };
}
