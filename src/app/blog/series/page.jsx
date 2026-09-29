import SeriesPostList from "@/app/components/blog/SeriesPostList";
import { Breadcrumbs, DonateButton } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { SideBar } from "@/app/components/sidebar";
import { blogArchives, getAllPosts, getFeaturedPosts } from "@/lib/api/blogger";
import React from "react";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Series",
  description: "",
  keywords: [
    "series",
    "devotionals",
    "Bible study series",
    "Christian Ministry Website",
  ],
  openGraph: {
    title: "Series – Christian Ministry Website",
    description: "",
    siteName: DOMAIN,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/bible-study.jpg",
        width: 1200,
        height: 630,
        alt: "Christian Ministry Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Series – Christian Ministry Website",
    description: "",
    creator: "@jimboyz-js",
    images: ["/images/bible-study.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/blog/series",
  },
};

const SeriesPage = async () => {
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
            name: "Series",
            url: `${BASE_URL}/blog/series`,
          },
        ]}
      />
      <Section id="series-page" className="min-h-screen w-full">
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
              name: "Series",
            },
          ]}
        />
        <section className="grid grid-cols-1 md:grid-cols-[1fr_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div>
            <SeriesPostList labels="type:series-overview" />
            <DonateButton className="bottom-5 right-2 z-[500] md:right-10" />
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

export default SeriesPage;
