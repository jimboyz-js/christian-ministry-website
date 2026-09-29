import Section from "@/app/components/Section";
import React, { Suspense } from "react";
import { SideBar } from "@/app/components/sidebar";
import { SearchPostList } from "@/app/components/blog/";
import { Breadcrumbs, DonateButton } from "@/app/components";
import { blogArchives, getAllPosts, getFeaturedPosts } from "@/lib/api/blogger";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Search",
  description: "",
  keywords: [
    "search",
    "Christian Ministry Website",
    "devotionals",
    "Bible study",
  ],
  openGraph: {
    title: "Search – Christian Ministry Website",
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
    title: "Search – Christian Ministry Website",
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
    canonical: "/blog/search",
  },
};

export const revalidate = 300;

const SearchResultPage = async ({ searchParams }) => {
  const query = (await searchParams).q;
  const decodedQuery = decodeURIComponent(query);

  const recentPosts = await getAllPosts({ maxResult: 3 });
  const highlightPosts = await getFeaturedPosts(2);
  const archives = blogArchives({ maxResult: 100 });

  return (
    <Section id="category-page" className="w-full min-h-screen">
      <Breadcrumbs
        items={[
          {
            name: "Home",
            href: "/",
            icon: "default",
          },
          {
            name: "Blog",
            href: "/blog/",
            icon: "default",
          },
          {
            name: "Search",
            href: null,
            icon: null,
          },
        ]}
      />
      <p className="text-muted-foreground text-base tracking-wide">
        Showing posts matching the search for{" "}
        <span className="font-bold text-sm md:text-base text-black/70 whitespace-nowrap">
          {`“${decodedQuery}”`}
        </span>
      </p>
      <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
        <Suspense
          fallback={
            <h3 className="text-lg md:text-6xl text-gray-600">
              Loading posts...
            </h3>
          }
        >
          <SearchPostList key={query} query={decodedQuery} />
          <DonateButton className="bottom-5 right-2 z-[500] md:right-10" />
        </Suspense>

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
  );
};

export default SearchResultPage;
