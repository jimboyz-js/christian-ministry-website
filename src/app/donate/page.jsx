import React from "react";
import Image from "next/image";
import Section from "../components/Section";
import { BreadcrumbJsonLd } from "../components/seo";
import { Breadcrumbs } from "../components";
import { SideBar } from "../components/sidebar";
import { blogArchives, getAllPosts } from "@/lib/api/blogger";
import Link from "next/link";

const DonationMethods = ({ img = {}, title, description, href, className }) => {
  return (
    <Link href={href} className="block h-full">
      <div className="group flex h-full flex-col p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer">
        <div className="flex h-16 items-center justify-center rounded-lg bg-slate-50 mb-4 ring-1 ring-inset ring-slate-100">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className={className}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 flex-1">
          {description}
        </p>
        <span className="mt-4 inline-flex items-center text-xs font-semibold text-blue-600">
          Choose this method →
        </span>
      </div>
    </Link>
  );
};

const Donation = ({ title, href }) => {
  return (
    <span className="text-blue-600 font-semibold">
      <Link href={href}>{title}</Link>
    </span>
  );
};

export const dynamic = "force-static";

const SupportPage = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
            name: "Donate",
            url: `${BASE_URL}/donate`,
          },
        ]}
      />
      <Section id="support-page" className="min-h-screen w-full">
        <Breadcrumbs
          items={[
            {
              name: "Home",
              href: "/",
              icon: "default",
            },
            {
              name: "Donate",
            },
          ]}
        />
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div className="space-y-5 md:space-y-8">
            <div className="inline-block mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Donate Section
              </h1>
              <div className="h-1 w-30 md:w-40 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 tracking-wide text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              distinctio commodi rem sunt voluptate dignissimos assumenda quia
              magni deleniti adipisci at eos architecto suscipit, sapiente
              eveniet soluta nihil atque ipsa!
            </p>
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

export default SupportPage;

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL),
  title: "Donate",
  description: "",
  keywords: [
    "donate",
    "support",
    "ministry",
    "Christian Ministry Website",
    "give",
  ],
  openGraph: {
    title: "Donate – Christian Ministry Website",
    description: "",
    siteName: process.env.DOMAIN_NAME,
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
    title: "Donate – Christian Ministry Website",
    description: "",
    creator: "@jimboyz-js",
    images: ["/images/bible-study.jpg"],
  },
};
