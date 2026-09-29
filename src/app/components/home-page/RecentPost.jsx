import React from "react";
import Section from "../Section";
import { getAllPosts } from "@/lib/api/blogger";
import { PostCard } from "../blog";
import Link from "next/link";
import { extractContentWithCheerio } from "@/lib/parser/extract";
import { slugify, getSeriesTopicLabel, getSeriesLabel } from "@/utils";

const RecentPost = async () => {
  const posts = await getAllPosts({ maxResult: 5 });

  return (
    // Hide the entire recent post section when no posts are tagged
    // Remove the conditional display class if you prefer showing
    // the fallback empty-state UI instead.
    <Section
      id="recent-posts-homepage"
      className={`w-full py-8 md:py-12 ${posts ? "block" : "hidden"}`}
    >
      <div className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Latest Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Fresh biblical insights and encouraging reflections
          </h2>
        </div>
        <Link
          href="/blog"
          className={`text-sm font-semibold text-primary transition-colors hover:text-accent-soft ${posts ? "block" : "hidden"}`}
        >
          View more
        </Link>
      </div>
      {posts ? (
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {posts.items
            // .filter((post) => !post.labels?.includes("type:series-overview")) // comment this if you want to show the series-overview
            // .filter((post) => !post.labels?.includes("type:series-overview")) // uncomment this if you want to hide the series-overview
            .map((post, index) => {
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
          <h2 className="text-text-muted">No recent post yet</h2>
        </div>
      )}
    </Section>
  );
};

export default RecentPost;
