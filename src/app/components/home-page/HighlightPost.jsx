import React from "react";
import Section from "../Section";
import { getFeaturedPosts } from "@/lib/api/blogger";
import { PostCard } from "../blog/";
import Link from "next/link";
import { extractContentWithCheerio } from "@/lib/parser/extract";
import { getSeriesLabel, getSeriesTopicLabel, slugify } from "@/utils";

const HighlightPost = async () => {
  const posts = await getFeaturedPosts(7);

  return (
    // Hide the entire highlight section when no posts are labeled as highlight
    // Remove the conditional display class if you prefer showing
    // the fallback empty-state UI instead.
    // In blogger you can add the "featured:highlight" label to any post you want to feature in this section.
    <Section
      id="highlight"
      className={`w-full py-8 md:py-12 ${posts ? "block" : "hidden"}`}
    >
      <div className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Featured Teaching
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Highlighted messages for encouragement and study
          </h2>
        </div>
        <Link
          href="/blog/featured"
          className={`text-sm font-semibold text-primary transition-colors hover:text-accent-soft ${posts ? "block" : "hidden"}`}
        >
          View more
        </Link>
      </div>
      {posts ? (
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, index) => {
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
                  index={index}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h2 className="text-text-muted">No highlight post yet</h2>
        </div>
      )}
    </Section>
  );
};

export default HighlightPost;
