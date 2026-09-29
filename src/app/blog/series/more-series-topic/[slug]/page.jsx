import { PostList } from "@/app/components/blog/";
import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { SideBar } from "@/app/components/sidebar";
import { blogArchives, getAllPosts, getFeaturedPosts } from "@/lib/api/blogger";
import { formatLabel, labelSlugify } from "@/utils";
import React from "react";

const SeriesPostPage = async ({ params }) => {
  const seriesTitle = (await params).slug;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const recentPosts = await getAllPosts({ maxResult: 3 });
  const highlightPosts = await getFeaturedPosts(2);
  const archives = await blogArchives({ maxResult: 100 });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            url: BASE_URL,
          },
          {
            name: "Blog",
            url: `${BASE_URL}/blog`,
          },
          {
            name: formatLabel(seriesTitle),
            url: `${BASE_URL}/blog/series/${labelSlugify(seriesTitle)}`,
          },
          {
            name: "More Series",
            url: `${BASE_URL}/blog/series/more-series-topic/${labelSlugify(seriesTitle)}`,
          },
        ]}
      />
      <Section id="series-topic-page" className="min-h-screen w-full">
        <Breadcrumbs
          items={[
            {
              name: "Home",
              href: "/",
              icon: "default",
            },
            {
              name: "Blog",
              href: "/blog",
              icon: "default",
            },
            {
              name: formatLabel(seriesTitle),
              href: `/blog/series/${labelSlugify(seriesTitle)}`,
              icon: "default",
            },
            {
              name: "More Series",
            },
          ]}
        />

        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div>
            <PostList labels={`series:${labelSlugify(seriesTitle)}`} />
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
                {
                  type: "recentPosts",
                  recentPosts,
                },
                {
                  type: "archivePosts",
                  posts: archives,
                },
              ]}
            />
          </div>
        </section>
      </Section>
    </>
  );
};

export default SeriesPostPage;
