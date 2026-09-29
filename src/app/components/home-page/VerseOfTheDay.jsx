"use client";
import { useBibleVerseAPI } from "@/hooks";
import Section from "../Section";
import Image from "next/image";

import { Inter, Merriweather } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const VerseOfTheDay = ({ className = "" }) => {
  // ourmanna or bible-api.com
  const { verses, bibleAPI } = useBibleVerseAPI("ourmanna");

  return (
    <Section
      id="verse-for-the-day"
      className={`w-full py-8 md:py-12 ${className}`}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Daily Scripture
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Discover God’s Word daily
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed tracking-wide text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            totam natus porro labore tempore temporibus voluptate rerum fugiat.
            Rem nulla harum ullam deleniti odio recusandae ex facilis minus aut.
            Assumenda?
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed tracking-wide text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            sunt in assumenda magni placeat nihil voluptatibus numquam, hic
            minus quasi a quas suscipit consectetur corrupti tenetur veniam
            soluta nisi dolores.
          </p>
          <div className="mt-6">
            <Link
              className="inline-flex rounded-md border-2 border-accent-soft px-5 py-3 text-sm font-semibold text-accent-soft transition-all duration-300 hover:bg-accent-soft hover:text-white hover:shadow-soft"
              href="/bible"
            >
              Read the Bible
            </Link>
          </div>
        </div>

        <div className="relative min-h-90 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
          <Image
            src="/images/verse-banner/bible-verse-banner.jpg"
            alt="A Bible open to a devotional passage with a peaceful Christian setting"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex min-h-90 items-center justify-center p-6">
            <div className="max-w-3xl text-center text-white">
              <h3
                className={`mb-4 text-sm font-semibold uppercase tracking-[0.2em] ${inter.className}`}
              >
                Verse of the Day
              </h3>
              {bibleAPI === "ourmanna" ? (
                <>
                  {verses?.verse?.details.text !== undefined ? (
                    <>
                      <div className="text-center">
                        <blockquote
                          className={`text-xl font-medium md:text-2xl ${merriweather.className}`}
                        >
                          {`“${verses?.verse?.details.text}”`}
                        </blockquote>
                      </div>
                      <p className={`mt-4 text-sm ${inter.className}`}>
                        <Link
                          href={`/blog/search/?q=${encodeURIComponent(verses.reference)}`}
                          className="transition-all duration-300 ease-in-out hover:underline"
                        >
                          {`${verses?.verse?.details.reference} – ${verses?.verse?.details.version}`}
                        </Link>
                      </p>
                    </>
                  ) : (
                    "Something went wrong. Please refresh the page."
                  )}
                </>
              ) : (
                <>
                  {verses?.verses.length ? (
                    <>
                      {verses?.verses.map((verse, index) => {
                        return (
                          <div key={index} className="text-center">
                            <blockquote
                              className={`text-xl font-medium md:text-2xl ${merriweather.className}`}
                            >
                              {`“${verse.text}”`}
                            </blockquote>
                          </div>
                        );
                      })}
                      <p className={`mt-4 text-sm ${inter.className}`}>
                        <Link
                          href={`/blog/search/?q=${encodeURIComponent(verses.reference)}`}
                          className="transition-all duration-300 ease-in-out hover:underline"
                        >
                          {`${verses.reference} – ${verses.translation_name}`}
                        </Link>
                      </p>
                    </>
                  ) : (
                    "Something went wrong. Please refresh the page."
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default VerseOfTheDay;
