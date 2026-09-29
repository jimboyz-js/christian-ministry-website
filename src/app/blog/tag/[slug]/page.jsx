import { PostList } from "@/app/components/blog/";
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

  const label = formatLabel(labelParam);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: `${label} – Tag | Christian Ministry Website`,
    },
    description: `Posts tagged with ${label} on Christian Ministry Website. Find devotionals and articles related to ${label}.`,
    keywords: ["tag", label, "devotionals", "Bible study"],
    openGraph: {
      title: `${label} – Tag | Christian Ministry Website`,
      description: `Explore posts tagged '${label}' on Christian Ministry Website for relevant devotionals and Bible studies.`,
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
      title: `${label} – Tag | Christian Ministry Website`,
      description: `Find devotionals and articles tagged '${label}' on Christian Ministry Website.`,
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
      canonical: `/blog/tag/${labelParam}`,
    },
  };
}

const TagPage = async ({ params }) => {
  const labelParam = (await params).slug;
  const label = decodeURIComponent(formatLabel(labelParam.trim()));
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
            name: "Tag",
            url: `${BASE_URL}/blog/tag`,
          },
          {
            name: label,
            url: `${BASE_URL}/blog/tag/${label}`,
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
              name: "Tag",
              href: "/blog/tag/",
              icon: "default",
            },
            {
              name: `${label}`,
              href: null,
              icon: null,
            },
          ]}
        />
        <p className="text-muted-foreground text-base tracking-wide">
          Showing posts with the label{" "}
          <span className="font-bold text-sm md:text-base text-black/70 whitespace-nowrap">
            {`“${label}”`}
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
            <PostList
              labels={`tag:${decodeURIComponent(labelParam.toLowerCase())}`}
            />
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

export default TagPage;
