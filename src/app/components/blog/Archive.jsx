"use client";
import { SideBar } from "@/app/components/sidebar";
import Spinner from "@/app/components/loading";
import {
  getPrimaryTitle,
  getSeriesLabel,
  getSeriesTopicLabel,
  slugify,
  truncateText,
} from "@/utils";
import { getArchivePosts } from "@/utils/archive";
import Link from "next/link";
import React, { useState } from "react";
import { useArchivePosts, useFeaturedPosts } from "@/hooks";

const Archive = () => {
  const { posts: archivesData, loading, error } = useArchivePosts(500);
  const { posts: highlightPosts } = useFeaturedPosts(2);
  const archives = getArchivePosts(archivesData);

  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
      <div>
        <div className="w-full rounded-sm shadow h-fit">
          <h3 className="text-gradient-purple text-lg p-1">Archive</h3>
        </div>
        <div className="my-4">
          {loading ? (
            <div className="flex items-center justify-center w-full min-h-screenz">
              <Spinner />
            </div>
          ) : error ? (
            <div className="flex items-center justify-start w-full min-h-screenz">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div>
              {Object.entries(archives).map(([year, months]) =>
                Object.entries(months).map(([month, archive]) => {
                  const id = `${month}-${year}`;
                  const monthNumber = String(
                    new Date(`${month} 1, 2000`).getMonth() + 1,
                  ).padStart(2, "0");
                  return (
                    <div
                      key={`${year}-${month}`}
                      className="rounded-xl overflow-hidden"
                    >
                      <div className="w-full flex items-center justify-between gap-x-1 transition">
                        <Link
                          href={`/blog/archive/${year}/${monthNumber}`}
                          className="flex items-center justify-between w-full my-2 hover:text-accent-soft"
                        >
                          {month} {year}
                          <span className="rounded-sm bg-accent-soft text-xs text-accent w-fit px-2 py-1 hover:bg-accent-soft-hover transition-all duration-300 eas-in-out">
                            {archive.count}
                          </span>
                        </Link>
                        <button
                          className="cursor-pointer flex items-center justify-center rounded-sm bg-purple-600 text-xs text-accent w-fit px-2 py-1 hover:bg-purple-600/80 transition-all duration-300 eas-in-out"
                          onClick={() => toggleAccordion(id)}
                        >
                          {openId === id ? "–" : "+"}
                        </button>
                      </div>

                      <div
                        className={`grid transition-all duration-300 ease-in-out border border-transparent border-b-gray-200 ${openId === id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-3 pb-4 text-gray-600">
                            {archive.posts.map((post) => {
                              return (
                                <Link
                                  href={
                                    getSeriesLabel(post.labels)
                                      ? `/blog/series/${getSeriesTopicLabel(post.labels)}`
                                      : `/blog/post/${slugify(post.url)}--${post.id}`
                                  }
                                  key={post.id}
                                  className="block my-1 hover:text-purple-400"
                                >
                                  {truncateText(
                                    getPrimaryTitle(post.title),
                                    70,
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }),
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <SideBar
          sections={[
            {
              type: "subscribe",
            },
            {
              type: "featuredPosts",
              highlight_posts: highlightPosts,
            },
          ]}
        />
      </div>
    </section>
  );
};

export default Archive;
