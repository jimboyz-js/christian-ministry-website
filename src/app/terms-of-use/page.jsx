import React from "react";
import { BreadcrumbJsonLd } from "../components/seo";
import { Breadcrumbs } from "../components";
import Section from "../components/Section";
import {
  blogArchives,
  getAllPosts,
  getFeaturedPosts,
  getPageById,
} from "@/lib/api/blogger";
import { dateFormat } from "@/utils/dateFormat";
import { SideBar } from "../components/sidebar";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    absolute: "Terms of Use",
  },
  description: "",
  keywords: [
    "Christian Ministry Website terms of use",
    "website terms and conditions",
    "ministry website guidelines",
    "community guidelines",
    "responsible use of resources",
  ],
  openGraph: {
    title: "Terms of Use – Christian Ministry Website",
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
    title: "Terms of Use – Christian Ministry Website",
    description: "",
    creator: "@jimboyz-js",
    images: ["/images/bible-study.jpg"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: false,
    googleBot: {
      index: false,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/terms-of-use",
  },
};

const TermsOfUsePage = async () => {
  const featuredPosts = await getFeaturedPosts(3);
  const recentPosts = await getAllPosts({ maxResult: 4 });
  const archives = await blogArchives({ maxResult: 100 });
  const termsOfUse = await getPageById(process.env.TERMS_OF_USE_PAGE_ID, 86400);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            url: BASE_URL,
          },
          {
            name: "Terms of Use",
            url: `${BASE_URL}/terms-of-use`,
          },
        ]}
      />
      <Section
        id="terms-of-use-page"
        className="min-h-screen w-full"
        data-section
      >
        <Breadcrumbs
          items={[
            {
              name: "Home",
              href: "/",
              icon: "default",
            },
            {
              name: "Terms of Use",
              href: null,
            },
          ]}
        />
        <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <header className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10 md:py-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                {/* Our Community Guidelines */}
                Terms & Community Guidelines
              </p>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {termsOfUse.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                We invite you to engage with our ministry thoughtfully and
                responsibly, using our website in ways that honor our mission,
                community, and shared values.
                {/* These terms outline the responsible and respectful use of our website and resources as we serve and connect with our community. */}
              </p>
              <p className="mt-6 text-sm text-slate-500">
                Last updated{" "}
                <time dateTime={termsOfUse.updated}>
                  {dateFormat(termsOfUse.updated, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
            </header>
            <div
              className="prose prose-slate max-w-none px-6 py-8 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-blue-600 md:px-10 md:py-10"
              dangerouslySetInnerHTML={{ __html: termsOfUse.content }}
            />
          </article>
          <div className="md:sticky md:top-6">
            <SideBar
              sections={[
                {
                  type: "subscribe",
                },
                {
                  type: "featuredPosts",
                  highlight_posts: featuredPosts,
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

export default TermsOfUsePage;
