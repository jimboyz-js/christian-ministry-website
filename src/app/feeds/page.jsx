import React from "react";
import Head from "next/head";
import Section from "../components/Section";
import { BreadcrumbJsonLd } from "../components/seo";
import { Breadcrumbs, Feeds } from "../components";
import { RSS_FEEDS } from "@/constants";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "RSS Feeds",
  description: "",
  keywords: ["Christian Ministry Website", "rss feeds", "blogs", "sermons"],
  openGraph: {
    title: "RSS Feeds – Christian Ministry Website",
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
    title: "RSS Feeds – Christian Ministry Website",
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
    canonical: "/feeds",
  },
};

const RSSFeeds = () => {
  return (
    <>
      <Head>
        {RSS_FEEDS.map((feed) => (
          <link
            key={feed.link}
            rel="alternate"
            type="application/rss+xml"
            title={`${feed.name} - RSS`}
            href={feed.link}
          />
        ))}
      </Head>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            url: BASE_URL,
          },
          {
            name: "RSS Feeds",
            url: `${BASE_URL}/feeds`,
          },
        ]}
      />
      <Section id="rss-feeds-page" className="min-h-screen w-full py-12">
        <Breadcrumbs
          items={[
            {
              name: "Home",
              href: "/",
              icon: "default",
            },
            {
              name: "Rss Feeds",
            },
          ]}
        />
        <Feeds feeds={RSS_FEEDS} />
      </Section>
    </>
  );
};

export default RSSFeeds;
