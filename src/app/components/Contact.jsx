"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaFacebookMessenger,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageStatus, setMessageStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit message to 500 characters
    if (name === "message" && value.length > 500) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FACEBOOK = process.env.NEXT_PUBLIC_SOCIAL_FB;
  const MESSENGER = process.env.NEXT_PUBLIC_SOCIAL_META_MSGR;
  const EMAIL_ADD = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_US_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          to_name: "Christian Ministry Website",
          subject: "Contact Form Inquiry",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          setError(false);
          setMessageStatus(
            "✓ Email sent successfully! We'll get back to you soon.",
          );
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setError(true);
          setMessageStatus(
            "✗ Something went wrong. Please try again or email us directly.",
          );
        },
      );

    setTimeout(() => {
      setMessageStatus("");
    }, 9000);
  };

  return (
    <>
      {/* Contact Information Cards */}
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 mb-12">
        <div
          title="Christian Ministry Website Media Ministry"
          className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-lg border border-blue-200 w-full md:max-w-xs px-6 py-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full bg-white shadow-md w-14 h-14">
              <a target="_blank" rel="noreferrer noopener" href={FACEBOOK}>
                <FaFacebook color="#2563eb" className="w-5 h-5" />
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-base text-gray-800">
                Facebook
              </h4>
              <span className="text-gray-600 text-sm hover:text-blue-600 transition">
                <a target="_blank" rel="noreferrer noopener" href={FACEBOOK}>
                  Christian Ministry Website Media
                </a>
              </span>
            </div>
          </div>
        </div>

        <div
          title="Message of Hope"
          className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-lg border border-purple-200 w-full md:max-w-xs px-6 py-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full bg-white shadow-md w-14 h-14">
              <a target="_blank" rel="noopener noreferrer" href={MESSENGER}>
                <FaFacebookMessenger color="#2563eb" className="w-5 h-5" />
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-base text-gray-800">
                Meta Messenger
              </h4>
              <span className="text-gray-600 text-sm hover:text-blue-600 transition">
                <a target="_blank" rel="noopener noreferrer" href={MESSENGER}>
                  Christian Ministry Website
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="mb-12">
        <div className="inline-block mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Contact us
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        <p className="text-gray-600 tracking-wide text-base mb-8 leading-relaxed max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quam
          pariatur maxime nisi quibusdam tempore, unde, culpa doloremque eius
          eos beatae inventore earum molestias fugit sunt magnam ullam libero?
          Odio?
        </p>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl p-8 md:p-10 border border-gray-200">
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2 text-sm"
              >
                Your Name <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-3.5 transition-all duration-300 ${
                    focusedField === "name" ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  <FaUser size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2 text-sm"
              >
                Email Address <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-3.5 transition-all duration-300 ${
                    focusedField === "email" ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  <FaEnvelope size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2 text-sm"
              >
                Message <span className="text-red-500 text-lg">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Share your thoughts, questions, or testimonies with us..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-gray-400 resize-none"
              ></textarea>
              <div className="text-right mt-1 text-xs text-gray-500">
                {form.message.length}/500
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaEnvelopeCircleCheck size={20} />
                  Send Message
                </span>
              )}
            </button>
          </form>

          {/* Status Message */}
          {messageStatus && (
            <div
              className={`mt-6 p-4 rounded-lg border-2 flex items-center gap-3 animate-in fade-in duration-300 ${
                error
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "bg-green-50 border-green-300 text-green-700"
              }`}
            >
              {error ? (
                <FaExclamationCircle
                  size={20}
                  className="flex-shrink-0 mt-0.5"
                />
              ) : (
                <FaCheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              )}
              <p className="font-medium">{messageStatus}</p>
            </div>
          )}
        </div>

        {/* Alternative Contact */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Prefer to email directly?</span>
          </p>
          <p className="text-gray-600">
            You can also email us at:{" "}
            <a
              href={`mailto:${EMAIL_ADD}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {EMAIL_ADD}
            </a>
          </p>
          <p className="text-gray-600 mt-3 text-sm italic">
            Thank you and God bless you!
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
