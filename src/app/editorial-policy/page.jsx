import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { SideBar } from "@/app/components/sidebar";
import { blogArchives, getAllPosts, getPageById } from "@/lib/api/blogger";
import { dateFormat } from "@/utils/dateFormat";
import React from "react";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
const PAGE_PATH = "/editorial-policy";
const PAGE_TITLE = "Editorial Policy";
const PAGE_DESCRIPTION =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente ratione culpa omnis deserunt quaerat ut debitis vel, illum, pariatur fuga, consectetur minus alias praesentium nam nobis nulla sed in? Facilis?";
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "editorial policy",
    "Christian Ministry Website",
    "Christian ministry standards",
    "biblical content review",
  ],
  openGraph: {
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: DOMAIN,
    locale: "en_US",
    type: "article",
    images: ["/images/bible-study.jpg"],
  },
  twitter: {
    url: PAGE_PATH,
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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
    canonical: PAGE_PATH,
  },
};

const EditorialPolicyPage = async () => {
  const recentPosts = await getAllPosts({ maxResult: 2 });
  const archive = await blogArchives({ maxResult: 100 });
  const editorialPolicy = await getPageById(
    process.env.EDITORIAL_POLICY_PAGE_ID,
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
            name: "Editorial Policy",
            url: `${BASE_URL}/editorial-policy`,
          },
        ]}
      />
      <Section id="editorial-policy-page" className="min-h-screen w-full pb-16">
        <Breadcrumbs
          items={[
            {
              name: "Home",
              icon: "default",
              href: "/",
            },
            {
              name: "Editorial Policy",
            },
          ]}
        />
        <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <header className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10 md:py-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Editorial standards
              </p>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {editorialPolicy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente ratione culpa omnis deserunt quaerat ut debitis vel,
                illum, pariatur fuga, consectetur minus alias praesentium nam
                nobis nulla sed in? Facilis?
              </p>
              <p className="mt-6 text-sm text-slate-500">
                Last updated{" "}
                <time dateTime={editorialPolicy.updated}>
                  {dateFormat(editorialPolicy.updated, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
            </header>
            <div
              className="prose prose-slate max-w-none px-6 py-8 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-blue-600 md:px-10 md:py-10"
              dangerouslySetInnerHTML={{ __html: editorialPolicy.content }}
            />
          </article>
          <div className="md:sticky md:top-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Explore more
            </p>
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

export default EditorialPolicyPage;
