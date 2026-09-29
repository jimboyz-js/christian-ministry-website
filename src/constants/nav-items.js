/**
 * @update 05-07-2026 12:57-58 PM Wed.
 * @author jimboyz-js
 */

import { labelSlugify } from "@/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
    id: "home-page",
  },
  {
    label: "Browse",
    href: "/blog/category",
    id: "blog-page",
    dropdown: [
      {
        label: "Category1",
        href: "/blog/category/category1",
        match: "/blog/category",
      },
      { label: "Category2", href: "/blog/category/category2" },
      { label: "Category3", href: "/blog/category/category3" },
      {
        label: "Sermons",
        submenu: [
          {
            label: "Expository",
            href: `/blog/category/${encodeURIComponent(labelSlugify("Expository Sermon"))}`,
          },
          {
            label: "Devotional",
            href: `/blog/category/${encodeURIComponent(labelSlugify("Devotional Sermon"))}`,
          },
          {
            label: "Topical",
            href: `/blog/category/${encodeURIComponent(labelSlugify("Topical Sermon"))}`,
          },
        ],
        href: "/blog/category/sermon",
      },
      {
        label: "Bible Study",
        href: `/blog/category/${encodeURIComponent(labelSlugify("Bible Study"))}`,
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    id: "about-page",
  },
  {
    label: "Resources",
    href: "#",
    dropdown: [
      {
        label: "Newsletter",
        href: "/#subscribe",
      },
    ],
  },
  {
    label: "Support",
    href: "/donate",
  },
  {
    label: "Contact",
    href: "/contact",
    id: "contact-page",
  },
];

export { navItems };
