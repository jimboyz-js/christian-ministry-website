/**
 * @author jimboyz-js
 * Date: 06-03-2026 Wed. 4:47-48 PM
 */

import { labelSlugify } from "@/utils";

export const categories = [
  {
    title: "Category1",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptates
        at dolorem accusantium labore fuga vel temporibus beatae voluptatem cum?
        Architecto dignissimos alias mollitia perspiciatis, quae deserunt
        blanditiis distinctio! Repellat!`,
    href: "/blog/category/category1",
    image: {
      src: "/images/category-banner/category-1.jpg",
      alt: "Category 1",
    },
    id: 1,
  },
  {
    title: "Category2",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non quae suscipit soluta, debitis molestiae dicta aliquid natus blanditiis dolore expedita placeat labore porro, aspernatur accusantium nobis asperiores sint voluptate quisquam. ",
    href: "/blog/category/category2",
    image: {
      src: "/images/category-banner/category-2.jpg",
      alt: "Category 2",
    },
    id: 2,
  },
  {
    title: "Category 3",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, dolor! Quae, itaque labore! Odio ratione eum, officia necessitatibus expedita sint cupiditate blanditiis debitis assumenda neque veniam, pariatur vitae natus accusantium.",
    href: "/blog/category/category3",
    image: {
      src: "/images/category-banner/category-3.jpg",
      alt: "Category 3",
    },
    id: 3,
  },
  {
    title: "Bible Study",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, quod non odit a debitis dicta quisquam repellendus, tempora eos enim quasi. Doloribus totam nihil ullam dolorum quibusdam reiciendis amet possimus?",
    href: `/blog/category/${encodeURIComponent(labelSlugify("Bible Study"))}`,
    image: {
      src: "/images/category-banner/bible-study.jpg",
      alt: "Bible Study",
    },
    id: 4,
  },
  {
    title: "Sermon",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, dolor! Quae, itaque labore! Odio ratione eum, officia necessitatibus expedita sint cupiditate blanditiis debitis assumenda neque veniam, pariatur vitae natus accusantium.",
    href: "/blog/category/sermon",
    image: {
      src: "/images/category-banner/sermon.jpg",
      alt: "Sermon",
    },
    id: 5,
  },
];
