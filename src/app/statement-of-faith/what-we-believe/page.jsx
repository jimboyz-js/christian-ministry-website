import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { SideBar } from "@/app/components/sidebar";
import { blogArchives, getAllPosts, getPageById } from "@/lib/api/blogger";
import { dateFormat } from "@/utils/dateFormat";
import React from "react";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "What We Believe",
  description: "",
  keywords: [
    "what we believe",
    "statement of faith",
    "Christian Ministry Website",
    "Christian beliefs",
  ],
  openGraph: {
    title: "What We Believe – Christian Ministry Website",
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
    title: "What We Believe – Christian Ministry Website",
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
    canonical: "/statement-of-faith/what-we-believe",
  },
};

const WhatWeBelievePage = async () => {
  const recentPosts = await getAllPosts({ maxResult: 2 });
  const archive = await blogArchives({ maxResult: 100 });
  const biblicalBeliefPage = await getPageById(
    process.env.WHAT_WE_BELIEVE_PAGE_ID,
    86400,
  );
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            url: BASE_URL,
          },
          {
            name: "Statement of Faith",
            url: `${BASE_URL}/statement-of-faith`,
          },
          {
            name: "What We Believe",
            url: `${BASE_URL}/statement-of-faith/what-we-believe`,
          },
        ]}
      />
      <Section id="what-we-believe-page" className="min-h-screen w-full">
        <Breadcrumbs
          items={[
            {
              name: "Home",
              icon: "default",
              href: "/",
            },
            {
              name: "Statement of Faith",
              icon: "default",
              href: "/statement-of-faith",
            },
            {
              name: "What We Believe",
            },
          ]}
        />
        <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <header className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10 md:py-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Biblical Foundations
                {/* What We Believe */}
              </p>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {biblicalBeliefPage.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                We believe in the authority of Scripture and the essential
                truths of the Christian faith that guide our worship, teaching,
                and service.
              </p>
              <p className="mt-6 text-sm text-slate-500">
                Last updated{" "}
                <time dateTime={biblicalBeliefPage.updated}>
                  {dateFormat(biblicalBeliefPage.updated, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
            </header>
            <div
              className="prose prose-slate max-w-none px-6 py-8 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-blue-600 md:px-10 md:py-10"
              dangerouslySetInnerHTML={{ __html: biblicalBeliefPage.content }}
            />
          </article>
          <div className="md:sticky md:top-6">
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
                  posts: archive,
                },
              ]}
            />
          </div>
        </section>
      </Section>
    </>
  );
};

export default WhatWeBelievePage;
