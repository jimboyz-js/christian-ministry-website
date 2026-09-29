import { extractContentWithCheerio } from "@/lib/parser/extract";
import { getSeriesLabel, getSeriesTopicLabel, hasPost, slugify } from "@/utils";
import Link from "next/link";
import React from "react";
import { PostCard } from "../blog";

const RelatedPosts = ({
  related_posts,
  hasRelatedPost = hasPost(related_posts),
  currentPostId = null,
  relatedLabel = "",
}) => {
  const relatedLbl = relatedLabel?.replace("related:", "");
  return (
    <div className="flex flex-col gap-5 mb-2">
      <div
        className={`post-card items-center justify-between uppercase ${hasRelatedPost ? "flex" : "hidden"}`}
      >
        <h2 className="text-[1em] tracking-wide">Related</h2>
        <Link
          className="text-accent-soft text-sm font-semibold"
          href={`/blog/related/${relatedLbl}`}
        >
          Read more
        </Link>
      </div>

      {hasRelatedPost
        ? related_posts
            .filter((post) => post.id !== currentPostId)
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
        : null}
    </div>
  );
};

export default RelatedPosts;
