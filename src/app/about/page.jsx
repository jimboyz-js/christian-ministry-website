import React from "react";
import { BreadcrumbJsonLd } from "../components/seo";
import Section from "../components/Section";
import { Breadcrumbs } from "../components/";
import { SideBar } from "../components/sidebar";
import { blogArchives, getAllPosts, getFeaturedPosts } from "@/lib/api/blogger";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "About",
  description: "About Christian Ministry Website",
  keywords: [
    "Christian Ministry Website",
    "about",
    "Christian ministry",
    "devotionals",
    "Bible study",
  ],
  openGraph: {
    title: "About – Christian Ministry Website",
    description: "Learn about Christian Ministry Website",
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
    title: "About – Christian Ministry Website",
    description: "Learn about Christian Ministry Website",
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
    canonical: "/about",
  },
};

export const dynamic = "force-static";

const AboutPage = async () => {
  const featuredPosts = await getFeaturedPosts(3);
  const recentPosts = await getAllPosts({ maxResult: 4 });
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
            name: "About",
            url: `${BASE_URL}/about`,
          },
        ]}
      />
      <Section id="about-page" className="min-h-screen w-full" data-section>
        <Breadcrumbs
          items={[
            {
              name: "Home",
              href: "/",
              icon: "default",
            },
            {
              name: "About",
              href: null,
            },
          ]}
        />
        <section className="grid grid-cols-1 md:grid-cols-[1fr_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div className="flex flex-col space-y-8">
            <h1 className="text-gray-700">About Us</h1>
            <div className="flex flex-col space-y-4">
              <h2 className="font-bold text-lg text-gray-700">
                About Christian Ministry Website
              </h2>
              <p className="text-gray-600 tracking-wider text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                dignissimos deserunt molestiae explicabo aliquid! Iusto
                consequatur hic, enim voluptate esse quis doloremque laborum
                deserunt modi? Aliquam veritatis excepturi vitae harum.
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

export default AboutPage;
