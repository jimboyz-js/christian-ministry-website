import Link from "next/link";
import { Breadcrumbs } from "@/app/components";
import Section from "@/app/components/Section";
import { BreadcrumbJsonLd } from "@/app/components/seo";
import { getTagsWithCounts } from "@/utils/get-tags";
import { formatLabel, labelSlugify } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "All Tags",
  description: "Browse all tags",
  alternates: {
    canonical: "/blog/tag",
  },
};

export const revalidate = 84600; // Revalidate every 24 hours (in seconds)
const TagIndexPage = async () => {
  const tags = await getTagsWithCounts();

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
            name: "Tags",
            url: `${BASE_URL}/blog/tag`,
          },
        ]}
      />
      <Section
        id="tags-page"
        className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-white pb-16 pt-4 sm:pb-24"
      >
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
              name: "Tags",
            },
          ]}
        />
        <h1 className="mt-8 mb-10 border-l-4 border-blue-600 pl-5 text-4xl font-bold tracking-tight text-slate-900 sm:mt-12 sm:pl-7 sm:text-5xl">
          Tags
        </h1>
        {tags.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => (
              <li key={tag.name.toLowerCase()}>
                <Link
                  className="group flex min-h-24 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  href={`/blog/tag/${labelSlugify(tag.name)}`}
                >
                  <span className="min-w-0 text-base font-semibold text-slate-800 transition-colors group-hover:text-blue-700">
                    {formatLabel(`tag:${tag.name}`)}
                  </span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700">
                    {tag.count} {tag.count === 1 ? "post" : "posts"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500 shadow-sm">
            No tags found.
          </p>
        )}
      </Section>
    </>
  );
};

export default TagIndexPage;
