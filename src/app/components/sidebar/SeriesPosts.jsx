import Link from "next/link";
import React from "react";
import { PostCard } from "../blog";

import { extractContentWithCheerio } from "@/lib/parser/extract";
import { getSeriesLabel, getSeriesTopicLabel, slugify } from "@/utils";

const SeriesPosts = ({
  seriesPosts,
  currentPostId = null,
  seriesLabel = null,
}) => {
  const hasSeriesPost = seriesLabel;
  return (
    <div className="flex flex-col gap-5 mb-2">
      <div
        className={`${hasSeriesPost ? "flex" : "hidden"} items-center justify-between uppercase`}
      >
        <h2 className="text-[1em] tracking-wide">Series</h2>
        <Link
          className="text-accent-soft text-sm font-semibold"
          href="/blog/series"
        >
          Read more
        </Link>
      </div>

      {hasSeriesPost
        ? seriesPosts
            .filter((post) => post.id !== currentPostId)
            .filter(
              (post) =>
                post.labels?.includes("type:series-overview") &&
                post.labels?.includes(`topic-series:${seriesLabel}`),
            )
            .map((post) => {
              const parsed = extractContentWithCheerio(post.content);
              return (
                <Link
                  href={
                    getSeriesLabel(post.labels)
                      ? `/blog/series/${getSeriesTopicLabel(post.labels)}`
                      : `/blog/post/${slugify(post.url)}--${post.id}`
                  }
                  key={post.id}
                >
                  <PostCard
                    thumbnail={parsed.images[0]?.src}
                    altDescription={parsed.metaDescription}
                    title={parsed.images[0]?.title || post.title}
                    postData={post}
                    description={parsed.metaDescription}
                    showLabel={false}
                  />
                </Link>
              );
            })
        : ""}
    </div>
  );
};

export default SeriesPosts;
