import { PostCard, ViewMoreCard } from "@/app/components/blog/";
import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { getPostByLabel } from "@/lib/api/blogger";
import {
  getExtractedContent,
  extractContentWithCheerio,
} from "@/lib/parser/extract";
import { formatLabel, getSeriesOrder, labelSlugify, slugify } from "@/utils";
import Link from "next/link";
import React from "react";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const seriesTitle = (await params).slug;

  const seriesOverview = await getPostByLabel(`topic-series:${seriesTitle}`);
  const seriesPost = seriesOverview?.find((overview) =>
    overview.labels.includes(`topic-series:${seriesTitle}`),
  );
  const parsed = extractContentWithCheerio(seriesPost?.content);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: `${formatLabel(seriesTitle)} – Series | Christian Ministry Website`,
    },
    description: `Read the ${formatLabel(seriesTitle)} series: devotionals and studies grouped for deeper study on Christian Ministry Website.`,
    keywords: [
      "series",
      formatLabel(seriesTitle),
      "devotionals",
      "Bible study",
    ],
    openGraph: {
      title: `${formatLabel(seriesTitle)} – Series | Christian Ministry Website`,
      description: `Overview and posts for ${formatLabel(seriesTitle)} on Christian Ministry Website.`,
      siteName: DOMAIN,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: parsed.images[0]?.src ?? "/images/bible-study.jpg",
          width: 1200,
          height: 777,
          alt:
            parsed.images[0]?.alt || "Christian Ministry Website Series topic",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${formatLabel(seriesTitle)} – Series | Christian Ministry Website`,
      description: `Explore the ${formatLabel(seriesTitle)} series of devotionals and studies on Christian Ministry Website.`,
      creator: "@jimboyz-js",
      images: [parsed.images[0]?.src ?? "/images/bible-study.jpg"],
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
      canonical: `/blog/series/${seriesTitle}`,
    },
  };
}

const SeriesPostPage = async ({ params }) => {
  const seriesTitle = (await params).slug;

  const MAX_POST_DISPLAY = 10;

  const seriesTopic = await getPostByLabel(
    `series:${seriesTitle}`,
    MAX_POST_DISPLAY + 1,
  );
  const seriesOverview = await getPostByLabel(`topic-series:${seriesTitle}`);
  const seriesPost = seriesOverview?.find((overview) =>
    overview.labels.includes(`topic-series:${seriesTitle}`),
  );
  const htmlContent = seriesPost
    ? getExtractedContent(seriesPost?.content)
    : `<h1>${formatLabel(seriesTitle)} title  is not available in the series</h1>`;

  const sortPosts = (a, b) => {
    // check if label series-order exists and then use it to sort the posts or else use the published date to sort, which it will not modify the order if there is new post to be inserted.
    if (
      a?.labels.find((label) => label?.includes("series-order:")) &&
      b.labels?.find((label) => label?.includes("series-order:"))
    ) {
      return getSeriesOrder(a.labels) - getSeriesOrder(b.labels);
    } else {
      return new Date(a.published) - new Date(b.published);
    }
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
            name: "Series",
            url: `${BASE_URL}/blog/series`,
          },
          {
            name: formatLabel(seriesTitle),
            url: `${BASE_URL}/blog/series/${labelSlugify(seriesTitle)}`,
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
              name: "Series",
              href: "/blog/series",
              icon: "default",
            },
            {
              name: formatLabel(seriesTitle),
            },
          ]}
        />
        <div>
          <h2 className="text-xl">{seriesPost?.title}</h2>
          <div
            className="prose max-w-none md:max-w-5xl w-full py-0 series-topic"
            dangerouslySetInnerHTML={{
              __html: htmlContent.content ?? htmlContent,
            }}
          />
          <hr className="my-4 border-gray-200" />
        </div>
        <div className="my-7">
          {seriesTopic ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {seriesTopic
                .slice(0, MAX_POST_DISPLAY)
                .sort((a, b) => sortPosts(a, b))
                .map((post) => {
                  const parsed = extractContentWithCheerio(post.content);

                  return (
                    <Link
                      href={`/blog/post/${slugify(post.url)}--${post.id}`}
                      key={post.id}
                    >
                      <PostCard
                        thumbnail={parsed.images[0]?.src}
                        altDescription={parsed.metaDescription}
                        title={parsed.images[0]?.title || post.title}
                        postData={post}
                        description={parsed.metaDescription}
                      />
                    </Link>
                  );
                })}
              {seriesTopic.length > MAX_POST_DISPLAY && (
                <ViewMoreCard
                  href={`/blog/series/more-series-topic/${seriesTitle}`}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h2 className="text-text-muted">No series post...</h2>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default SeriesPostPage;
