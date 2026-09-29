/**
 * @author jimboyz-js
 * @date 08-14-2026 FRI. 5:12 PM
 */

const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
export const RSS_FEEDS = [
  {
    name: "Blog",
    description: "blog",
    link: `${BASE_URL}/blog/rss.xml`,
  },
];
