import React from "react";
import {
  excerpt,
  truncateText,
  getPrimaryTitle,
  getDisplayLabel,
} from "@/utils/";

const SeriesPostCard = ({
  postData,
  thumbnail,
  altDescription,
  title,
  description = "",
  showLabel = true,
}) => {
  const content = excerpt(postData.content, 100);
  const summary = description ? excerpt(description, 100) : content;
  const specialLabel = getDisplayLabel(postData.labels);
  const imageAlt = altDescription || title || "Post Thumbnail";

  return (
    <article
      itemScope
      itemType="http://schema.org/Article"
      className="flex h-full flex-col border border-line max-w-lg shadow-card rounded-lg transform-gpu transition-all duration-300 hover:scale-[1.04] hover:shadow-hover z-50"
    >
      <figure className="relative w-full rounded-t-lg group">
        <div
          className={`absolute top-3 left-3 uppercase text-white text-xs font-semibold bg-accent-soft rounded px-[5px] py-[3px] transition-all duration-300 ease-in-out group-hover:hidden ${specialLabel && showLabel ? "flex" : "hidden"}`}
        >
          {showLabel ? truncateText(specialLabel, 50) : ""}
        </div>

        <img
          src={thumbnail || "/images/ui/place-holder-thumbnail.png"}
          alt={imageAlt}
          loading="lazy"
          width={1280}
          height={720}
          sizes="600px"
          title={imageAlt}
          className="w-full object-cover rounded-t-lg object-center aspect-video"
          itemProp="image"
        />
      </figure>

      <div className="mx-auto flex flex-1 flex-col px-3">
        <header className="mt-2">
          <h2
            itemProp="headline"
            className="py-1 text-base text-gray-900 line-clamp-2"
          >
            {getPrimaryTitle(postData.title)}
          </h2>
        </header>

        <div className="pb-3 flex flex-1 min-h-0 text-normal leading-snug text-gray-600 text-sm md:leading-normal md:text-base line-clamp-3">
          <p itemProp="description" aria-label={summary} className="h-full">
            {summary}
          </p>
        </div>
      </div>
    </article>
  );
};

export default SeriesPostCard;
