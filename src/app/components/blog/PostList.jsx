"use client";
import React, { useEffect, useState } from "react";
import { extractContentWithCheerio } from "@/lib/parser/extract";
import Link from "next/link";
import { PostCard } from "./";
import { getPosts } from "@/lib/api/blogger-client";
import { FaArrowPointer } from "react-icons/fa6";
import { getSeriesLabel, getSeriesTopicLabel, slugify } from "@/utils";

const PostList = ({ labels }) => {
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  // Current page index
  const [currentPage, setCurrentPage] = useState(0);

  // Cache page posts and next tokens
  const [pageCache, setPageCache] = useState({});
  const [pageTokens, setPageTokens] = useState({});

  // Check if there is no post.
  const hasPost = Array.isArray(posts) && posts.length > 0;

  async function fetchPosts(
    pageIndex,
    tokenOverride = null,
    ignoreCache = false,
  ) {
    try {
      // If page already cached, restore its posts and next token.
      if (!ignoreCache && pageCache[pageIndex]) {
        setPosts(pageCache[pageIndex]);
        setNextPageToken(pageTokens[pageIndex + 1] || null);
        return;
      }

      setLoading(true);

      const data = await getPosts({
        labels,
        maxResult: 5,
        pageToken: tokenOverride,
      });

      const newPosts = data.items || [];
      const pageNextToken = data.nextPageToken || null;

      setPosts(newPosts);
      setNextPageToken(pageNextToken);

      setPageCache((prev) => ({
        ...prev,
        [pageIndex]: newPosts,
      }));
      setPageTokens((prev) => ({
        ...prev,
        [pageIndex + 1]: pageNextToken,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!nextPageToken || loading) return;

    const nextPageIndex = currentPage + 1;

    try {
      setLoading(true);

      const data = await getPosts({
        labels,
        maxResult: 5,
        pageToken: nextPageToken,
      });

      const newPosts = data.items || [];
      const combinedPosts = [...posts, ...newPosts];
      const pageNextToken = data.nextPageToken || null;

      setPosts(combinedPosts);
      setNextPageToken(pageNextToken);
      setCurrentPage(nextPageIndex);
      setPageCache((prev) => ({
        ...prev,
        [nextPageIndex]: newPosts,
      }));
      setPageTokens((prev) => ({
        ...prev,
        [nextPageIndex + 1]: pageNextToken,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleNext() {
    if (!nextPageToken || loading) return;

    const nextPageIndex = currentPage + 1;

    if (pageCache[nextPageIndex]) {
      setPosts(pageCache[nextPageIndex]);
      setNextPageToken(pageTokens[nextPageIndex + 1] || null);
      setCurrentPage(nextPageIndex);
      return;
    }

    await fetchPosts(nextPageIndex, nextPageToken);
    setCurrentPage(nextPageIndex);
  }

  async function handlePrevious() {
    if (currentPage === 0) return;

    const prevPageIndex = currentPage - 1;
    const cachedPage = pageCache[prevPageIndex];

    if (cachedPage) {
      setPosts(cachedPage);
      setNextPageToken(pageTokens[prevPageIndex + 1] || null);
      setCurrentPage(prevPageIndex);
      return;
    }

    const pageToken = pageTokens[prevPageIndex] || null;
    await fetchPosts(prevPageIndex, pageToken);
    setCurrentPage(prevPageIndex);
  }

  useEffect(() => {
    setPageCache({});
    setPageTokens({});
    setCurrentPage(0);
    setNextPageToken(null);
    setPosts([]);
    fetchPosts(0, null, true);
  }, [labels]);

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 py-4 pl-2">
        <h4 className="uppercase md:text-base text-sm font-bold tracking-wide">
          Read more
        </h4>
        {/* Load More Button */}
        {nextPageToken && (
          <button
            className="cursor-pointer bg-accent-soft disabled:opacity-50 text-sm font-semibold text-accent px-3 py-2 hover:bg-accent-soft-hover transition-all duration-300 eas-in-out rounded shadow-soft"
            onClick={loadMore}
            disabled={loading}
          >
            <span className="flex items-center gap-1">
              {loading ? "Loading..." : "Load More"}
              <FaArrowPointer />
            </span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 min-w-0">
        {hasPost ? (
          posts.map((post, index) => {
            const parsed = extractContentWithCheerio(post.content);
            return (
              <Link
                href={
                  getSeriesLabel(post.labels)
                    ? `/blog/series/${getSeriesTopicLabel(post.labels)}`
                    : `/blog/post/${slugify(post.url)}--${post.id}`
                }
                key={`data: ${index} - ${post.id}`}
              >
                <PostCard
                  thumbnail={parsed.images[0]?.src}
                  altDescription={parsed.metaDescription}
                  title={parsed.images[0]?.title || post.title}
                  postData={post}
                  description={parsed.metaDescription}
                  showLabel={true}
                />
              </Link>
            );
          })
        ) : loading ? (
          <h3 className="text-gray-600">Loading posts...</h3>
        ) : (
          <h3 className="text-muted-foreground">No posts found.</h3>
        )}
      </div>
      <div className="my-4">
        {/* PAGINATION */}
        <div className="flex gap-8 mt-6 items-center">
          {hasPost ? (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="bg-accent-soft hover:bg-accent-soft-hover disabled:opacity-50 transition-all duration-300 eas-in-out shadow-soft text-accent font-extralight rounded-sm tracking-wide cursor-pointer px-4 py-2"
              >
                Previous
              </button>

              <span className="font-extralight">Page {currentPage + 1}</span>

              <button
                onClick={handleNext}
                disabled={!nextPageToken}
                className="bg-accent-soft hover:bg-accent-soft-hover disabled:opacity-50 transition-all duration-300 eas-in-out shadow-soft text-accent font-extralight rounded-sm tracking-wide cursor-pointer px-4 py-2"
              >
                {loading ? "Loading posts..." : "Next"}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
