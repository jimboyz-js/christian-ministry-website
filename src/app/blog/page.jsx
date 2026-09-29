import Section from "../components/Section";
import { SideBar } from "../components/sidebar";
import { PostList } from "../components/blog";
import { blogArchives, getFeaturedPosts } from "@/lib/api/blogger";
import { Suspense } from "react";
import { Breadcrumbs, DonateButton } from "../components";
import { BreadcrumbJsonLd } from "../components/seo";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Blog",
  description: "",
  keywords: [
    "Christian Ministry Website",
    "blog",
    "devotionals",
    "Bible study",
    "Christian articles",
  ],
  openGraph: {
    title: "Blog – Christian Ministry Website",
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
    title: "Blog – Christian Ministry Website",
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
    canonical: "/blog",
  },
};

export const revalidate = 300;

const BlogPage = async () => {
  const featuredPosts = await getFeaturedPosts(3);
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
            name: "Blog",
            url: `${BASE_URL}/blog`,
          },
        ]}
      />
      <Section id="blog-page" className="w-full min-h-screen" data-section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/", icon: "default" },
            { name: "Blog", href: null, icon: null },
          ]}
        />
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <Suspense
            fallback={<h3 className="text-gray-600">Loading posts...</h3>}
          >
            <PostList />
            <DonateButton className="bottom-5 right-2 z-[500] md:right-10" />
          </Suspense>

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

export default BlogPage;
