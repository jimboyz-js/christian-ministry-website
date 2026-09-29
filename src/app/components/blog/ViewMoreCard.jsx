import Link from "next/link";

export default function ViewMoreCard({ href, text = "View More" }) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col items-center justify-center border border-line max-w-lg shadow-card rounded-lg transform-gpu transition-all duration-300 hover:scale-[1.04] hover:shadow-hover"
      aria-label={text}
    >
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-line">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">{text}</h2>

        <p className="mt-2 text-sm text-gray-600">
          Continue reading the remaining posts in this series.
        </p>
      </div>
    </Link>
  );
}
