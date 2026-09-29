"use client";
import React from "react";
import Section from "./Section";
import { categories } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Category = ({ showPagination = false }) => {
  return (
    <Section id="category" className="w-full py-8 md:py-12">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Explore
        </p>
        <h2
          animation="left"
          className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl"
        >
          Browse topics
        </h2>
        <p className="mt-4 text-base leading-relaxed tracking-wide text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea maiores
          minus soluta doloremque, sed quidem, mollitia ex atque quasi ipsum
          omnis? Vitae, dolore. Dolor nihil possimus quo quae similique.
          Corporis?
        </p>
      </div>
      <div className="mt-6">
        <Swiper
          style={{
            "--swiper-pagination-color": "#007AFF",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 3000 }}
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          className="flex justify-center items-center pb-20 max-w-xs md:max-w-full rounded-lg"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link href={category.href}>
                <article
                  itemScope
                  itemType="http://schema.org/Article"
                  className="flex h-full flex-col rounded-xl border border-gray-200 bg-white transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-sm md:mx-2 md:my-6"
                >
                  <figure className="relative w-full rounded-t-lg group">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      loading="eager"
                      width={1280}
                      height={720}
                      sizes="600px"
                      title={category.title}
                      className="w-full object-cover rounded-t-lg object-center aspect-video"
                      itemProp="image"
                    />
                  </figure>

                  <div className="mx-auto flex flex-1 flex-col px-3">
                    <header>
                      <h2
                        itemProp="headline"
                        className="py-1 text-base text-gray-900 line-clamp-2"
                      >
                        {category.title}
                      </h2>
                    </header>

                    <div className="pb-3 flex flex-1 min-h-0 text-normal leading-snug text-gray-600 text-sm md:leading-normal md:text-base line-clamp-3">
                      <p
                        itemProp="description"
                        aria-label={category.description}
                        className="h-full"
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
          <div
            className={`swiper-pagination gap-1 ${showPagination ? "block" : "hidden"}`}
          ></div>
          {/* Previous Button */}
          <button className="custom-prev absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full cursor-pointer">
            <FaCaretLeft />
          </button>

          {/* Next Button */}
          <button className="custom-next absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full cursor-pointer">
            <FaCaretRight />
          </button>
        </Swiper>
      </div>
    </Section>
  );
};

export default Category;
