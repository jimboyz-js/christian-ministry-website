import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "./components";
import { OrganizationJsonLd } from "./components/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Christian Ministry Website",
    template: "%s – Christian Ministry Website",
  },
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, molestiae labore. Modi eveniet impedit in, ullam dicta quo quis mollitia suscipit dolor velit pariatur numquam harum vel perspiciatis dolores deserunt.",
  keywords: [
    "Christian Ministry Website",
    "Christian",
    "devotional",
    "Bible study",
    "gospel",
  ],
  openGraph: {
    title: "Christian Ministry Website",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, molestiae labore. Modi eveniet impedit in, ullam dicta quo quis mollitia suscipit dolor velit pariatur numquam harum vel perspiciatis dolores deserunt.",
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
    title: "Christian Ministry Website",
    description: "Christian Ministry Website.",
    creator: "@jimboyz-js",
    images: ["/images/bible-study.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd
          name="Christian Ministry Website"
          url={BASE_URL}
          logo={`${BASE_URL}/logo.png`}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, molestiae labore. Modi eveniet impedit in, ullam dicta quo quis mollitia suscipit dolor velit pariatur numquam harum vel perspiciatis dolores deserunt."
          sameAs={[
            process.env.NEXT_PUBLIC_SOCIAL_FB,
            process.env.NEXT_PUBLIC_SOCIAL_X,
            process.env.NEXT_PUBLIC_SOCIAL_IG,
            process.env.NEXT_PUBLIC_SOCIAL_YT,
          ]}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
