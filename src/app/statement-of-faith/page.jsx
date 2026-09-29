import React from "react";
import Link from "next/link";
import Section from "../components/Section";
import { BreadcrumbJsonLd } from "../components/seo";
import { Breadcrumbs } from "../components";
import { SideBar } from "../components/sidebar";
import { blogArchives, getAllPosts } from "@/lib/api/blogger";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Statement of Faith",
  description: "",
  keywords: [
    "statement of faith",
    "doctrine",
    "Christian Ministry Website",
    "Christian beliefs",
  ],
  openGraph: {
    title: "Statement of Faith – Christian Ministry Website",
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
    title: "Statement of Faith – Christian Ministry Website",
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
    canonical: "/statement-of-faith",
  },
};

export const dynamic = "force-static";

const StatementOfFaithPage = async () => {
  const recentPosts = await getAllPosts({ maxResult: 2 });
  const archive = await blogArchives({ maxResult: 100 });
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
        ]}
      />
      <Section id="statement-of-faith-page" className="min-h-screen w-full">
        <Breadcrumbs
          items={[
            {
              name: "Home",
              icon: "default",
              href: "/",
            },
            {
              name: "Statement of Faith",
            },
          ]}
        />
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div className="flex flex-col space-y-8">
            <h1 className="text-xl text-gray-700">Statement of Faith</h1>
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg text-gray-700">Our Foundation of Faith</h3>
              <p className="text-gray-600 tracking-wider text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                illum reiciendis dolor aspernatur impedit doloribus, accusamus
                adipisci. Beatae fugit facere veniam voluptatem provident quis
                sequi laudantium quaerat! Ea, voluptatem iure?
              </p>
            </div>
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

export default StatementOfFaithPage;
