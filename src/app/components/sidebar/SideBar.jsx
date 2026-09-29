"use client";
import {
  RecentPosts,
  FeaturedPosts,
  RelatedPosts,
  Archive,
  SubscribeAside,
  SeriesPosts,
} from "./index";

const componentMap = {
  recentPosts: RecentPosts,
  relatedPosts: RelatedPosts,
  featuredPosts: FeaturedPosts,
  archivePosts: Archive,
  subscribe: SubscribeAside,
  series: SeriesPosts,
};

// showSubscribe set to true as default. You can set to false if you want to exclude it in the SideBar.
// recentPosts, shows the recent posts.
// relatedPosts, shows the related posts. When it call, you can specified the value {label}.
// currentPostId is a post.id in a single post. Use it to filter the "related posts", it will escape the same post in the current post.
// Note: Recent posts only shown in a single post, otherwise it may throws an error.
const SideBar = ({ sections = [] }) => {
  return (
    <aside className="flex flex-col items-center gap-7 win-w-0">
      <div className="flex flex-col gap-5">
        {sections.map((section, index) => {
          const Component = componentMap[section.type];

          if (!Component) return null;

          return <Component key={index} {...section} />;
        })}
      </div>
    </aside>
  );
};

export default SideBar;
