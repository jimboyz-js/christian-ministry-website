import { PostList } from "@/app/components/blog";
import { SideBar } from "@/app/components/sidebar";
import { Breadcrumbs, DonateButton } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { blogArchives, getAllPosts } from "@/lib/api/blogger";
import React, { Suspense } from "react";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Featured Posts",
  description: "",
  keywords: [
    "featured posts",
    "devotionals",
    "Christian Ministry Website",
    "Bible study",
  ],
  openGraph: {
    title: "Featured Posts – Christian Ministry Website",
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
    title: "Featured Posts – Christian Ministry Website",
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
    canonical: "/blog/featured",
  },
};

const FeaturedPage = async () => {
  const recentPosts = await getAllPosts({ maxResult: 3 });
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
            name: "Featured Posts",
            url: `${BASE_URL}/blog/featured`,
          },
        ]}
      />
      <Section id="featured-page" className="w-full min-h-screen">
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
              name: "Featured Posts",
            },
          ]}
        />
        <p className="flex gap-1 text-muted-foreground text-base tracking-wide">
          Explore our highlighted articles, devotionals, and Bible studies.
        </p>
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <Suspense
            fallback={
              <h3 className="text-lg md:text-6xl text-gray-600">
                Loading posts...
              </h3>
            }
          >
            <PostList labels="featured:highlight" />
            <DonateButton className="bottom-5 right-2 z-[500] md:right-10" />
          </Suspense>

          <div>
            <SideBar
              sections={[
                {
                  type: "subscribe",
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

export default FeaturedPage;
