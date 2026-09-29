import { caret } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Breadcrumbs = ({
  items = [
    {
      name: "Home",
      href: "/",
      icon: null,
    },
  ],
}) => {
  return (
    <nav
      area-label="Breadcrumb"
      className="mb-6 text-sm md:text-base font-semibold text-gray-600"
    >
      <ol className="flex flex-wrap gap-2 items-center">
        {items.map((item, index) => (
          <li
            key={index}
            className="capitalize last:normal-case last:text-muted-foreground/80"
          >
            <span className="flex items-center gap-1">
              {item.href ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                `${item.name}`
              )}
              {item?.icon && (
                <Image
                  src={item.icon === "default" ? caret : item?.icon}
                  width={10}
                  height={10}
                  loading="eager"
                  alt={`caret for ${item.name}`}
                  className="w-[10px] h-[10px]"
                />
              )}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
