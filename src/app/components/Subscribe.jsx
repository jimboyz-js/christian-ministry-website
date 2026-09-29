"use client";
import Link from "next/link";
import React, { useState } from "react";

const Subscribe = () => {
  const [data, setData] = useState({
    email: "",
    isAgree: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL_API_END_POINT}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const _data = await response.json();
      setLoading(false);
      alert(_data.message);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-7 rounded-md shadow-card border-2 border-line bg-accent max-w-lg text-gray-700 z-50">
      <h2 className="">Subscribe to our Newsletter</h2>
      <h4 className="my-2 text-base">
        Subscribe to our newsletter and stay updated.
      </h4>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="form">
          <label className="font-semibold whitespace-nowrap" htmlFor="email">
            Enter you email address to subscribe{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="rounded-xs w-full p-1 border border-line mb-2 outline-none focus:ring-2 focus:ring-accent-soft focus:border-transparent transition"
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={data.email}
            onChange={handleChange}
            required
          />
          <small className="text-xs text-text-muted">
            Provide your email address to subscribe. For e.g mail@gmail.com
          </small>
          <div className="my-2">
            <label htmlFor="check">
              <input
                type="checkbox"
                name="check"
                className="cursor-pointer mr-2"
                checked={data.isAgree}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, isAgree: e.target.checked }))
                }
                required
              />
              I agree to receive your newsletters and accept the data{" "}
              <span className="text-accent-soft hover:underline">
                <Link href="/privacy-policy">privacy</Link>
              </span>{" "}
              statement.
            </label>
          </div>
          <small className="text-xs text-text-muted">
            You may unsubscribe at any time using the link in our newsletter.
          </small>
          <p className="text-md leading-relaxed mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab commodi
            culpa maxime praesentium nulla facilis perferendis voluptates, quod
            impedit. Nisi iusto eaque ipsam dolorum officia obcaecati harum
            voluptas porro ad.
          </p>
          <button
            disabled={loading}
            className={`uppercase shadow-soft text-accent px-2 py-1.25 mt-2 font-medium rounded-sm tracking-wide ${loading ? "bg-gray-400 cursor-not-allowed opacity-70" : "bg-accent-soft cursor-pointer hover:bg-accent-soft-hover transition-all duration-300 eas-in-out"}`}
          >
            {loading ? (
              <span className="flex items-center normal-case justify-center gap-2">
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                Please wait...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                subscribe
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
