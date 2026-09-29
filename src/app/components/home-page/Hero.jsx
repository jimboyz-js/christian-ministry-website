"use client";
import Section from "../Section";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { slides } from "@/constants";

const Hero = ({ className = "" }) => {
  return (
    <Section id="hero" className={`w-full py-8 md:py-12 ${className}`}>
      <header className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Bible teaching • Christian • Ministry
          </p>

          <h1 className="text-gradient-purple mb-4 text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            Christian Ministry Website
          </h1>

          <p className="mb-5 max-w-xl text-base leading-relaxed text-[#555] md:text-lg">
            Sharing Bible-based teaching, prophetic insight, and encouragement
            through the living Word of God.
          </p>

          <blockquote className="mb-6 max-w-xl rounded-2xl border border-gray-200 bg-white/80 p-4 text-sm italic text-[#4b5563] shadow-sm md:text-base">
            “For the word of God is alive and active. Sharper than any
            double-edged sword.”
            <footer className="mt-2 text-right font-semibold not-italic text-gray-700">
              — Hebrews 4:12
            </footer>
          </blockquote>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#recent-posts-homepage"
              className="inline-flex items-center justify-center rounded-md bg-accent-soft px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-soft-hover hover:shadow-soft"
            >
              Explore Articles
            </Link>
            <Link
              href="#verse-for-the-day"
              className="inline-flex items-center justify-center rounded-md border-2 border-accent-soft bg-transparent px-6 py-3 text-sm font-semibold text-accent-soft transition-all duration-300 hover:bg-accent-soft hover:text-white hover:shadow-soft"
            >
              Study the Bible
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600">
            <li className="rounded-full bg-gray-100 px-3 py-1.5">FAITH</li>
            <li className="rounded-full bg-gray-100 px-3 py-1.5">HOPE</li>
            <li className="rounded-full bg-gray-100 px-3 py-1.5">LOVE</li>
          </ul>
        </div>

        <div
          animation="js-up motion-md-right"
          className="relative min-h-90 w-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-soft md:min-h-105"
        >
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
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true,
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            className="h-full rounded-2xl"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <Link
                  href={slide.link}
                  aria-label={slide.description || `View article ${slide.id}`}
                >
                  <Image
                    src={slide.image}
                    loading="eager"
                    priority={slide.id === 1}
                    alt={
                      slide.description ||
                      `Christian Ministry Website article cover ${slide.id}`
                    }
                    width={900}
                    height={620}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-80 w-full rounded-2xl object-cover md:h-100"
                  />
                </Link>
              </SwiperSlide>
            ))}

            <div className="swiper-pagination bottom-3!"></div>

            <button
              aria-label="Previous slide"
              className="custom-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70"
            >
              <FaChevronLeft />
            </button>

            <button
              aria-label="Next slide"
              className="custom-next absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70"
            >
              <FaChevronRight />
            </button>
          </Swiper>
        </div>
      </header>
    </Section>
  );
};

export default Hero;
