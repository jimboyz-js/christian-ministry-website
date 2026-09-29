import { PostList } from "@/app/components/blog";
import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { SideBar } from "@/app/components/sidebar";
import { blogArchives, getAllPosts, getFeaturedPosts } from "@/lib/api/blogger";
import { formatLabel, labelSlugify } from "@/utils";
import React, { Suspense } from "react";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export async function generateMetadata({ params }) {
  const relatedLabelParam = (await params).slug;
  const relatedPostTitle = formatLabel(relatedLabelParam);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: `${relatedPostTitle} – Related Posts | Christian Ministry Website`,
    },
    description: `Discover devotionals, and Bible studies related to ${relatedPostTitle} on Christian Ministry Website.`,
    keywords: [
      relatedPostTitle,
      "related posts",
      "Christian Ministry Website",
      "devotionals",
    ],
    openGraph: {
      title: `${relatedPostTitle} – Related Posts | Christian Ministry Website`,
      description: `Devotionals related to ${relatedPostTitle} on Christian Ministry Website.`,
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
      title: `${relatedPostTitle} – Related Posts | Christian Ministry Website`,
      description: `Devotionals and articles related to ${relatedPostTitle} on Christian Ministry Website.`,
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
      canonical: `/blog/related/${relatedLabelParam}`,
    },
  };
}

const RelatedPostsPage = async ({ params }) => {
  const relatedLabelParam = (await params).slug;
  const relatedPostTitle = formatLabel(relatedLabelParam);
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
            name: "Related Posts",
            url: `${BASE_URL}/blog/related`,
          },
          {
            name: relatedPostTitle,
            url: `${BASE_URL}/blog/related/${encodeURIComponent(labelSlugify(relatedLabelParam))}`,
          },
        ]}
      />
      <Section id="related-posts-page" className="min-h-screen w-full">
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
              name: "Related Posts",
              icon: "default",
            },
            {
              name: relatedPostTitle,
            },
          ]}
        />
        <p className="flex gap-1 text-muted-foreground text-base tracking-wide">
          Discover more articles, devotionals, and Bible studies related to this
          topic.
        </p>
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <Suspense
            fallback={
              <h3 className="text-lg md:text-6xl text-gray-600">
                Loading posts...
              </h3>
            }
          >
            <PostList labels={`related:${relatedLabelParam.toLowerCase()}`} />
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

export default RelatedPostsPage;
