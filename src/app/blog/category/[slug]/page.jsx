import { PostList } from "@/app/components/blog";
import { SideBar } from "@/app/components/sidebar";
import { Breadcrumbs, DonateButton } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { blogArchives, getAllPosts, getFeaturedPosts } from "@/lib/api/blogger";
import React, { Suspense } from "react";
import { formatLabel } from "@/utils";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const labelParam = (await params).slug;
  const label = decodeURIComponent(labelParam.trim());

  return {
    metadataBase: new URL(BASE_URL),
    title: formatLabel(label),
    description: `Devotionals, and Bible studies categorized under ${formatLabel(label)} on Christian Ministry Website.`,
    keywords: [
      "Christian Ministry Website",
      formatLabel(label),
      "devotionals",
      "Bible study",
    ],
    openGraph: {
      title: `${formatLabel(label)} – Christian Ministry Website`,
      description: `Devotionals on ${formatLabel(label)} from Christian Ministry Website.`,
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
      title: `${formatLabel(label)} – Christian Ministry Website`,
      description: `Bible studies about ${formatLabel(label)} on Christian Ministry Website.`,
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
      canonical: `/blog/category/${label}`,
    },
  };
}

const CategoryPage = async ({ params }) => {
  const labelParam = (await params).slug;
  const label = decodeURIComponent(labelParam.trim());
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
            name: "Category",
            url: `${BASE_URL}/blog/category`,
          },
          {
            name: label,
            url: `${BASE_URL}/blog/category/${label}`,
          },
        ]}
      />
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
              href: "/blog",
              icon: "default",
            },
            {
              name: "Category",
              href: "/blog/category/",
              icon: "default",
            },
            {
              name: formatLabel(label),
              href: null,
              icon: null,
            },
          ]}
        />
        <p className="text-muted-foreground text-base tracking-wide">
          Showing posts with the category{" "}
          <span className="font-bold text-sm md:text-base text-black/70 whitespace-nowrap capitalize">
            {`“${formatLabel(label)}”`}
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
            <PostList labels={`category:${label.toLowerCase()}`} />
            <DonateButton className="bottom-5 right-2 z-500 md:right-10" />
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
    </>
  );
};

export default CategoryPage;
