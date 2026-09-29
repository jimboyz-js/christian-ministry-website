import {
  blogArchives,
  getAllPosts,
  getFeaturedPosts,
  getPostById,
  getPostByLabel,
} from "@/lib/api/blogger";
import {
  extractContentWithCheerio,
  getExtractedContent,
} from "@/lib/parser/extract";
import {
  getCategory,
  getPrimaryTitle,
  getRelatedTag,
  getSecondaryTitle,
  getTag,
  hasCategories,
  hasPost,
  slugify,
  truncateText,
  formatLabel,
  hasTags,
  labelSlugify,
} from "@/utils";
import { formatDateTime } from "@/utils/dateFormat";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import SideBar from "@/app/components/sidebar/SideBar";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaUser,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { Breadcrumbs, TranslateButton } from "@/app/components";
import { shareTo } from "@/constants";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/app/components/seo";
import { Source_Sans_3 } from "next/font/google";

const BASE_URL = process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN_NAME;

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const param = (await params).postId;
  const postId = param.split("--").pop();
  const post = await getPostById(postId);
  const correctSlug = slugify(post.url);
  const canonicalUrl = `${BASE_URL}/blog/post/${correctSlug}--${postId}`;

  const { keywords, robots, googleBot } = extractContentWithCheerio(
    post.content,
  );

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: getPrimaryTitle(post.title),
    },
    description: post?.content
      ? extractContentWithCheerio(post.content).metaDescription ||
        post?.content?.slice(0, 160)
      : "",
    keywords: keywords || [],
    openGraph: {
      url: canonicalUrl,
      title: getPrimaryTitle(post.title),
      description:
        extractContentWithCheerio(post.content).metaDescription ||
        post?.content?.slice(0, 160),
      siteName: DOMAIN,
      locale: "en_US",
      images: extractContentWithCheerio(post.content).images[0]
        ? [extractContentWithCheerio(post.content).images[0].src]
        : ["/images/bible-study.jpg"],
    },
    twitter: {
      url: canonicalUrl,
      card: "summary_large_image",
      title: getPrimaryTitle(post.title),
      description:
        extractContentWithCheerio(post.content).metaDescription ||
        post?.content?.slice(0, 160),
      creator: "@jimboyz-js",
      images: extractContentWithCheerio(post.content).images[0]
        ? [extractContentWithCheerio(post.content).images[0].src]
        : ["/images/bible-study.jpg"],
    },
    robots: {
      index: robots.index,
      follow: robots.follow,
      nocache: robots.nocache,
      googleBot: {
        index: googleBot.index,
        follow: googleBot.follow,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const PostPage = async ({ params }) => {
  const param = (await params).postId;
  const postId = param.split("--").pop();
  const post = await getPostById(postId);
  const parsed = extractContentWithCheerio(post.content);
  const htmlContent = getExtractedContent(post.content);
  const tag = hasTags(post.labels) ? getTag(post.labels) : "Untagged";
  const category = hasCategories(post.labels)
    ? getCategory(post.labels)
    : "Uncategorized";

  const recentPosts = await getAllPosts({ maxResult: 4 });
  const relatedLabel = getRelatedTag(post.labels)
    ? `related:${getRelatedTag(post.labels)}`
    : `tag:${tag}`;
  const relatedPosts = post.labels ? await getPostByLabel(relatedLabel, 3) : "";
  const seriesPosts = post.labels
    ? await getPostByLabel("type:series-overview", 3)
    : "";

  const highlightPosts = await getFeaturedPosts(2);

  const archives = await blogArchives({ maxResult: 100 });

  const has_post =
    hasPost(relatedPosts) &&
    relatedPosts.filter((post) => post.id !== postId).length > 0;

  if (!postId) return notFound();
  if (!post) return notFound();

  const correctSlug = slugify(post.url);
  const currentSlug = param.replace(`--${postId}`, "");

  // Redirect if slug is outdated (SEO critical)
  if (currentSlug !== correctSlug) {
    return redirect(`/blog/post/${correctSlug}--${postId}`);
  }

  const canonicalUrl = `${BASE_URL}/blog/post/${correctSlug}--${postId}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: getPrimaryTitle(post.title),
    description: parsed.metaDescription || post?.content?.slice(0, 160) || "",
    image: parsed.images[0]?.src
      ? [parsed.images[0].src]
      : [`${BASE_URL}/images/messages-of-hope-img.jpg`],
    author: { "@type": "Person", name: post.author?.displayName || "" },
    publisher: {
      "@type": "Organization",
      name: DOMAIN || "",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
    },
    datePublished: post.published,
    dateModified: post.updated || post.published,
  };

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
            name: formatLabel(category),
            url: `${BASE_URL}/blog/category/${encodeURIComponent(category.trim())}`,
          },
          {
            name: formatLabel(tag),
            url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag.trim())}`,
          },
          {
            name: `${truncateText(getPrimaryTitle(post.title), 70)}`,
            url: canonicalUrl,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ArticleJsonLd
        title={post.title}
        description={parsed.metaDescription}
        url={canonicalUrl}
        image={parsed.images[0]?.src ?? "/images/bible-study.jpg"}
        datePublished={post.published}
        dateModified={post.updated}
        authorName={post.author.displayName}
        publisherName="Christian Ministry Website"
        publisherLogo={`${BASE_URL}/logo.png`}
      />

      <article id="post" className="max-w-7xl mx-auto px-4 py-4 min-h-screen">
        <nav aria-label="Breadcrumbs">
          <Breadcrumbs
            items={[
              {
                name: "Home",
                href: "/",
                icon: "default",
              },
              {
                name: "Blog",
                href: "/blog/",
                icon: "default",
              },
              {
                name: formatLabel(category),
                href:
                  category !== "Uncategorized"
                    ? `/blog/category/${encodeURIComponent(category.trim())}`
                    : null,
                icon: "default",
              },
              {
                name: formatLabel(tag),
                href:
                  tag !== "Untagged"
                    ? `/blog/tag/${encodeURIComponent(tag.trim())}`
                    : null,
                icon: "default",
              },
              {
                name: `${truncateText(getPrimaryTitle(post.title), 70)}`,
                href: null,
                icon: null,
              },
            ]}
          />
        </nav>
        <section className="grid grid-cols-1 md:grid-cols-[1fr_250px] lg:grid-cols-[minmax(0,1fr)_350px] gap-12">
          <div className="">
            <header className="header">
              <div className="">
                {parsed.images[0] ? (
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src={parsed.images[0].src}
                      alt={parsed.metaDescription || "Thumbnail"}
                      loading="lazy"
                      className="md:max-w-xl max-w-xs rounded-sm md:rounded-md xl:rounded-lg"
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <h1 className="font-extrabold text-[1.5em] md:text-4xl">
                      {getPrimaryTitle(post.title)}
                    </h1>
                    <h3 className="font-semibold text-gray-600 text-[1.3em] md:text-xl">
                      {getSecondaryTitle(post.title)}
                    </h3>
                  </div>
                  <p className="italic leading-6 text-gray-600 text-[1.3em] md:text-xl">
                    {parsed.metaDescription}
                  </p>
                </div>
                <div className="flex flex-wrap">
                  <div className="flex items-center pt-4 gap-2">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
                      {post.author.image?.url ? (
                        <img
                          src={post.author.image.url.replace(
                            /\/s\d+(?:-c)?\//,
                            "/s256-c/",
                          )}
                          alt={post.author.displayName}
                          loading="lazy"
                          decoding="async"
                          width="48"
                          height="48"
                          className="block h-full w-full object-cover object-center"
                        />
                      ) : (
                        <FaUser className="h-full w-full p-2" />
                      )}
                    </div>
                    <p className="flex items-center divide-gray-300 text-lg space-x-2 divide-x-2 text-gray-600 rtl:space-x-reverse">
                      <strong className="pr-2 text-sm md:text-base">
                        {post.author.displayName}
                      </strong>
                      <span className="">
                        <time
                          className="flex items-center text-xs md:text-base"
                          dateTime={post.published}
                        >
                          {formatDateTime(post.published)}
                        </time>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <section
              id="article"
              className={`
                ${sourceSans.className}
            prose
            prose-lg
            md:prose-xl
            max-w-none
            prose-img:rounded-xl
            prose-img:w-full
            prose-a:text-blue-600
            prose-blockquote:border-l-blue-500
            hover:prose-a:underline
            [&>*:first-child]:mt-0
            `}
            >
              <div
                className="post-content pt-5"
                dangerouslySetInnerHTML={{ __html: htmlContent.content }}
              />
              <div className="flex flex-wrap items-center py-3 text-sm">
                <span className="pr-2">Tags:</span>
                <ul className="inline-flex flex-wrap items-center list-none p-0">
                  {hasTags(post.labels)
                    ? post.labels
                        .filter((label) => label.startsWith("tag:"))
                        .map((lbl, index) => {
                          const label = formatLabel(lbl);

                          return (
                            <li
                              key={index}
                              className="tag whitespace-nowrap"
                              role="listitem"
                            >
                              <Link
                                href={`/blog/tag/${encodeURIComponent(labelSlugify(label)?.replace(/`/g, ""))}`}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 no-underline transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                aria-label={`Browse posts tagged ${label?.replace(/`/g, "")}`}
                              >
                                {label?.replace(/`/g, "")}
                              </Link>
                            </li>
                          );
                        })
                    : "No tags"}
                </ul>
              </div>
              <div className="flex my-3 gap-1">
                <a
                  href={shareTo({ url: canonicalUrl }).facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <div className="md:w-32 w-9 h-8 flex items-center transition-all duration-300 eas-in-out hover:opacity-80">
                    <div className="flex items-center justify-center w-9 md:w-14 h-full bg-[#3b5999e8]">
                      <FaFacebookF className="text-white" />
                    </div>
                    <div className="hidden md:flex items-center justify-center w-full bg-[#3b5999]">
                      <h6 className="capitalize text-accent text-xs leading-8">
                        facebook
                      </h6>
                    </div>
                  </div>
                </a>
                <a
                  href={
                    shareTo({ url: canonicalUrl, title: post.title }).twitter
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <div className="md:w-32 w-9 h-8 flex items-center transition-all duration-300 eas-in-out hover:opacity-80">
                    <div className="flex items-center justify-center w-9 md:w-14 h-full bg-[#14171ae8]">
                      <FaXTwitter className="text-white" />
                    </div>
                    <div className="hidden md:flex items-center justify-center w-full bg-[#14171A]">
                      <h6 className="capitalize text-accent text-xs leading-8 tracking-wider">
                        twitter
                      </h6>
                    </div>
                  </div>
                </a>
                <a
                  href={
                    shareTo({
                      url: canonicalUrl,
                      title: post.title,
                      image: parsed.images[0]?.src,
                    }).pinterest
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Pinterest"
                >
                  <div className="flex items-center justify-center w-9 h-full bg-[#ca2127] transition-all duration-300 eas-in-out hover:opacity-80">
                    <FaPinterest className="text-white" />
                  </div>
                </a>
                <a
                  href={shareTo({ url: canonicalUrl }).linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <div className="flex items-center justify-center w-9 h-full bg-[#0077b5] transition-all duration-300 eas-in-out hover:opacity-80">
                    <FaLinkedinIn className="text-white" />
                  </div>
                </a>
                <a
                  href={
                    shareTo({ url: canonicalUrl, title: post.title }).whatsapp
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <div className="flex items-center justify-center w-9 h-full bg-[#3fbb50] transition-all duration-300 eas-in-out hover:opacity-80">
                    <FaWhatsapp className="text-white" />
                  </div>
                </a>
                <a
                  href={shareTo({ url: canonicalUrl, title: post.title }).email}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share via Email"
                >
                  <div className="flex items-center justify-center w-9 h-full bg-[#888] transition-all duration-300 eas-in-out hover:opacity-80">
                    <FaEnvelope className="text-white" />
                  </div>
                </a>
              </div>
              <TranslateButton
                content={htmlContent.content}
                className="bottom-5 md:right-10 right-2 z-500"
              />
            </section>
          </div>
          <SideBar
            sections={[
              {
                type: "subscribe",
              },
              {
                type: "relatedPosts",
                related_posts: relatedPosts,
                currentPostId: post.id,
                hasRelatedPost: has_post,
                relatedLabel,
              },
              {
                type: "series",
                seriesPosts,
                currentPostId: post.id,
                seriesLabel: post.labels
                  ?.find((label) => label.includes("series:"))
                  ?.split(":", 2)[1],
              },
              {
                type: "featuredPosts",
                highlight_posts: highlightPosts,
                currentPostId: post.id,
              },
              {
                type: "recentPosts",
                recentPosts,
                currentPostId: post.id,
              },
              {
                type: "archivePosts",
                posts: archives,
              },
            ]}
          />
        </section>
      </article>
    </>
  );
};

export default PostPage;
