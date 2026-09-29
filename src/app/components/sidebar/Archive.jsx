import { getArchivePosts } from "@/utils/archive";
import { hasPostObj } from "@/utils/has-posts";
import Link from "next/link";
import React from "react";
const Archive = ({ posts }) => {
  const archives = getArchivePosts(posts);

  return (
    <div className={`${hasPostObj(posts) ? "block" : "hidden"}`}>
      <h2 className="font-semibold text-base text-gray-700 uppercase">
        Blog Archive
      </h2>
      <ul>
        {Object.entries(archives).map(([year, months]) =>
          Object.entries(months).map(([month, archive]) => {
            const monthNumber = String(
              new Date(`${month} 1, 2000`).getMonth() + 1,
            ).padStart(2, "0");
            return (
              <li key={`${year}-${month}`} className="text-gray-600">
                <Link
                  href={`/blog/archive/${year}/${monthNumber}`}
                  className="flex items-center justify-between my-2 hover:text-accent-soft"
                >
                  {month} {year}
                  <span className="rounded-sm bg-accent-soft hover:bg-accent-soft-hover transition-all duration-300 text-xs text-accent w-fit px-2 py-1">
                    {archive.count}
                  </span>
                </Link>
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
};

export default Archive;
