import Section from "@/app/components/Section";
import Link from "next/link";
import { FaArrowRight, FaCheck, FaHome, FaNewspaper } from "react-icons/fa";

export const metadata = {
  title: "Thank You for Subscribing Christian Ministry Website",
  description: "",
  robots: {
    index: false,
    follow: true,
  },
};

const ThankyouForSubscribingPage = () => {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden bg-[#f7f8f5] px-4 py-16 sm:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(11,77,162,0.12),transparent_32%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[min(88%,900px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      <Section className="w-full max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-emerald-100 text-emerald-600 shadow-[0_12px_30px_rgba(16,185,129,0.16)]">
          <FaCheck aria-hidden="true" className="h-8 w-8" />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#0b4da2]">
          Welcome to the community
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          You&apos;re officially subscribed.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          Thank you for making room for hope in your inbox. We&apos;ll send you
          thoughtful devotionals, Bible insights, and new articles from Messages
          of Hope.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
          <div className="border-l-2 border-amber-400 bg-white/70 px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              What&apos;s next?
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Keep an eye on your inbox for the next message.
            </p>
          </div>
          <div className="border-l-2 border-[#0b4da2] bg-white/70 px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Read something today
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Explore encouragement while you wait.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b4da2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(11,77,162,0.2)] transition hover:bg-[#083d82] focus:outline-none focus:ring-2 focus:ring-[#0b4da2] focus:ring-offset-2 sm:w-auto"
          >
            <FaNewspaper aria-hidden="true" />
            Explore articles
            <FaArrowRight aria-hidden="true" className="text-xs" />
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:w-auto"
          >
            <FaHome aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default ThankyouForSubscribingPage;
