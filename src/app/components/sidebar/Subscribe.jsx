"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function CustomDialog({ isOpen, onClose, email }) {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Please agree to the privacy/terms to continue.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL_API_END_POINT}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, isAgree: isChecked }),
        },
      );

      const data = await response.json();
      alert(data?.message ?? "Subscription successful");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err?.message ?? "Subscription failed");
      onClose();
    } finally {
      setLoading(false);
      setIsChecked(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg max-w-100 w-full">
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium">Privacy & Terms</h3>
          <p className="text-sm text-gray-600">
            Please review and accept the privacy statement before subscribing.
          </p>

          <label className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            I agree to the
            <span className="text-accent-soft hover:underline">
              <Link href="/privacy-policy">privacy </Link>
            </span>
            statement
          </label>

          <div className="flex justify-end gap-2.5">
            <button type="button" onClick={onClose} className="px-2 py-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isChecked || loading}
              className={`text-white border-0 px-2.5 py-1 rounded ${
                loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center normal-case justify-center gap-2">
                  <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                  Confirming...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Confirm
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const SubscribeAside = () => {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const openDialog = () => {
    const trimmed = email.trim();
    const isValidEmail = /^\S+@\S+\.\S+$/.test(trimmed);
    if (!isValidEmail) {
      alert("Please enter a valid email address first.");
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col justify-between border border-line max-w-lg shadow-md mb-2 rounded-lg p-4 z-50">
      <div className="pb-2">
        <div className="flex items-center justify-center">
          <Image
            src="/logo.png"
            width={pathname === "/about" ? 250 : 150}
            height={pathname === "/about" ? 250 : 150}
            loading="eager"
            alt="Message of Hope logo"
            className="rounded-lg mb-1 w-auto h-auto"
          />
        </div>

        <h2 className="text-gray-700 text-[1.3em]">Subscribe for Updates</h2>
        <input
          type="email"
          name="email"
          placeholder="example@mail.com"
          className="w-full p-1 my-2 rounded-sm border md:border-2 border-line outline-none focus:ring-2 focus:ring-accent-soft focus:border-transparent transition"
          value={email}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (email) {
                openDialog();
              }
              return;
            }
          }}
          required
        />

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setEmail("");
            setIsDialogOpen(false);
          }}
          email={email.trim()}
        />
      </div>
      <div>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          unde nulla quaerat tenetur voluptatibus minus quis distinctio? Aperiam
          provident ullam temporibus maiores at sed accusamus! Nostrum
          consequuntur rerum vero doloremque.
        </p>
        <button
          onClick={openDialog}
          type="button"
          className="bg-accent-soft hover:bg-accent-soft-hover transition-all duration-300 eas-in-out shadow-soft w-full text-accent p-1 rounded-sm tracking-wider font-medium mt-2 uppercase cursor-pointer"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribeAside;
