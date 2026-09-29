import {
  About,
  Hero,
  HighlightPost,
  RecentPost,
  MissionVision,
  VerseOfTheDay,
} from "./components/home-page/";
import Section from "./components/Section";
import { Category, Subscribe } from "./components";
import { WebSiteJsonLd } from "./components/seo";

export default function Home() {
  return (
    <>
      <WebSiteJsonLd
        name="Message of Hope"
        url={process.env.BASE_URL}
        description=""
      />

      <div className="flex flex-col" id="home-page" data-section>
        <Hero />
        <HighlightPost />
        <MissionVision />
        <RecentPost />
        <VerseOfTheDay />
        <Category />
        <About />

        {/* Subscribe section */}
        <Section id="subscribe" className="w-full py-8 md:py-12">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Stay connected
            </p>
            <h2 className="text-2xl font-semibold text-gray-700 md:text-3xl">
              Receive encouragement
            </h2>
          </div>

          <div className="mt-8 grid md:gap-8 gap-4 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div className="max-w-2xl space-y-6 text-gray-600">
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus sunt in assumenda magni placeat nihil voluptatibus
                numquam, hic minus quasi a quas suscipit consectetur corrupti
                tenetur veniam soluta nisi dolores.
              </p>
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus sunt in assumenda magni placeat nihil voluptatibus
                numquam, hic minus quasi a quas suscipit consectetur corrupti
                tenetur veniam soluta nisi dolores.
              </p>
              <p className="italic text-gray-600">Unsubscribe anytime.</p>
            </div>

            <div className="mt-2 lg:mt-0">
              <Subscribe />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
const DOMAIN =
  process.env.DOMAIN_NAME || process.env.NEXT_PUBLIC_DOMAIN_NAME || "";
export const metadata = {
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
  title: "Christian Ministry Website — Devotionals",
  description: "",
  keywords: ["Christian Ministry Website", "devotionals", "Bible study"],
  openGraph: {
    title: "Christian Ministry Website — Devotionals & Bible Studies",
    description: "",
    siteName: DOMAIN,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/bible-study.jpg",
        width: 1200,
        height: 777,
        alt: "Christian Ministry Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Ministry Website — Devotionals & Bible Studies",
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
    canonical: "/",
  },
};

export const dynamic = "force-static";
