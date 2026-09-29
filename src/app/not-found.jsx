import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full text-center py-20">
        <div className="relative">
          <h1 className="font-extrabold text-[6.5rem] sm:text-[8rem] md:text-[10rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mx-auto">
            404
          </h1>
        </div>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Page not found
        </h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Sorry — we couldn't find the page you were looking for. It may have
          been moved or removed.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-95 transition"
          >
            <FaHome /> Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
