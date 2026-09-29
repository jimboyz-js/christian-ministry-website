"use client";
import React from "react";

const Feeds = ({ feeds }) => {
  return (
    <>
      <header className="max-w-4xl mx-auto text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
          Understanding RSS (Really Simple Syndication)
        </h1>
        <p className="mt-4 text-neutral-600">
          RSS lets you receive timely updates from Christian Ministry Website
          without visiting the site — subscribe once and new sermons, articles,
          and or audio posts will arrive in your reader or podcast app
          automatically. Use any RSS reader, podcast app, or browser to follow
          the feeds below.
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          Click a feed to open it in a new tab, or use the subscribe button to
          copy the feed URL.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feeds.map((feed, index) => (
            <article
              key={`${feed.name}-${index}`}
              className="flex flex-col justify-between p-4 border border-line rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-400 transition-all duration-300"
              aria-labelledby={`feed-${index}-title`}
              role="article"
            >
              <div>
                <h2
                  id={`feed-${index}-title`}
                  className="text-lg font-semibold"
                >
                  {feed.name}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  {feed.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <a
                  href={feed.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-soft text-sm break-all"
                  aria-label={`Open ${feed.name} RSS feed`}
                >
                  {feed.link}
                </a>

                <button
                  onClick={() => navigator.clipboard?.writeText(feed.link)}
                  className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 bg-accent-soft text-white rounded text-sm hover:bg-accent-soft-hover transition-all duration-300 cursor-pointer"
                  aria-label={`Copy ${feed.name} feed URL`}
                >
                  Subscribe
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Feeds;
