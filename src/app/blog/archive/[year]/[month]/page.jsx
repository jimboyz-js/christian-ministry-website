import { BlogArchivePostList } from "@/app/components/blog";
import SideBar from "@/app/components/sidebar/SideBar";
import Section from "@/app/components/Section";
import { blogArchives, getAllPosts } from "@/lib/api/blogger";
import React from "react";
import { Breadcrumbs, DonateButton } from "@/app/components";
import { BreadcrumbJsonLd } from "@/app/components/seo";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { month, year } = await params;

  return {
    metadataBase: new URL(BASE_URL),
    title: `Archive: ${month} ${year}`,
    description: `Archive of posts and articles published in ${month} ${year} on Christian Ministry Website.`,
    keywords: [
      "blog archive",
      "Christian Ministry Website",
      "devotionals",
      month,
      year,
    ],
    openGraph: {
      title: `Archive: ${month} ${year} – Christian Ministry Website`,
      description: `Articles published in ${month} ${year} on Christian Ministry Website.`,
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
      title: `Archive: ${month} ${year} – Christian Ministry Website`,
      description: `Browse posts published in ${month} ${year} on Christian Ministry Website.`,
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
      canonical: `/blog/archive/${year}/${month}`,
    },
  };
}

const ArchivePostPage = async ({ params }) => {
  const { year, month } = await params;

  const recentPosts = await getAllPosts({ maxResult: 3 });
  const archives = await blogArchives({ maxResult: 100 });

  const formatMonthYear = (month, year) => {
    const date = new Date(year, month - 1);

    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

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
            name: "Archive",
            url: `${BASE_URL}/blog/archive`,
          },
          {
            name: formatMonthYear(month, year),
            url: `${BASE_URL}/blog/archive/${year}/${month}`,
          },
        ]}
      />
      <Section id="archive-page" className="w-full min-h-screen">
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
              name: "Archive",
              href: "/blog/archive",
              icon: "default",
            },
            {
              name: formatMonthYear(month, year),
            },
          ]}
        />
        <p className="text-muted-foreground text-base tracking-wide">
          Showing posts from
          <span className="font-bold text-sm md:text-base text-black/70 whitespace-nowrap">
            {` “${formatMonthYear(month, year)}”`}
          </span>
        </p>
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div>
            <BlogArchivePostList year={year} month={month} />
            <DonateButton className="bottom-5 right-2 z-500 md:right-10" />
          </div>

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

export default ArchivePostPage;
