import React from "react";
import Section from "../components/Section";
import { SideBar } from "../components/sidebar";
import { Breadcrumbs, Contact } from "../components";
import { BreadcrumbJsonLd } from "../components/seo";
import { blogArchives, getAllPosts } from "@/lib/api/blogger";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Contact",
  description: "",
  keywords: [
    "Christian Ministry Website",
    "contact",
    "prayer request",
    "ministry",
  ],
  openGraph: {
    title: "Contact – Christian Ministry Website",
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
    title: "Contact – Christian Ministry Website",
    description: "",
    creator: "@jimboyz-js",
    images: ["/images/bible-study.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export const dynamic = "force-static";
const ContactPage = async () => {
  const recentPosts = await getAllPosts({ maxResult: 3 });
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
            name: "Contact",
            url: `${BASE_URL}/contact`,
          },
        ]}
      />
      <Section id="contact-page" className="min-h-screen w-full" data-section>
        <Breadcrumbs
          items={[
            {
              name: "Home",
              href: "/",
              icon: "default",
            },
            {
              name: "Contact",
              href: null,
              icon: null,
            },
          ]}
        />
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div>
            <Contact />
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

export default ContactPage;
