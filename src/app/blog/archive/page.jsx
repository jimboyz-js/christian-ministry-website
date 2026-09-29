import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { Archive } from "@/app/components/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Blog Archive",
  description: "",
  keywords: [
    "blog archive",
    "Christian Ministry Website",
    "devotionals",
    "Bible study",
  ],
  openGraph: {
    title: "Blog Archive – Christian Ministry Website",
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
    title: "Blog Archive – Christian Ministry Website",
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
    canonical: "/blog/archive",
  },
};

const ArchivePage = () => {
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
            name: "Blog Archive",
            url: `${BASE_URL}/blog/archive`,
          },
        ]}
      />
      <Section id="archive-list-page" className="w-full min-h-screen">
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
              name: "Blog Archive",
            },
          ]}
        />
        <Archive />
      </Section>
    </>
  );
};

export default ArchivePage;
