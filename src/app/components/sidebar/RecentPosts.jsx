import Link from "next/link";
import {
  getSeriesLabel,
  getSeriesTopicLabel,
  hasPostObj,
  slugify,
} from "@/utils";
import { PostCard } from "../blog/";

import { extractContentWithCheerio } from "@/lib/parser/extract";
import React from "react";

const RecentPosts = ({ recentPosts, currentPostId }) => {
  return (
    <div
      className={`${hasPostObj(recentPosts) ? "flex" : "hidden"} flex-col gap-5 mb-2`}
    >
      <div className="flex items-center justify-between uppercase">
        <h2 className="text-[1em] tracking-wide">Recent</h2>
        <Link className="text-accent-soft text-sm font-semibold" href="/blog">
          Read more
        </Link>
      </div>

      {recentPosts.items
        .filter((post) => post.id !== currentPostId)
        .filter((post) => !post.labels?.includes("type:series-overview")) // uncomment this out if you want to hide the series-overview post
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
        })}
    </div>
  );
};

export default RecentPosts;
