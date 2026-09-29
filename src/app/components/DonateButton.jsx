"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";

const DonateButton = ({ className }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const goto = () => {
    // const donate = confirm(
    //   "Would you like to support our ministry with a donation?",
    // );
    // if (donate) {
    //   router.push("/donate");
    // }
    router.push("/donate");
  };
  return (
    <>
      <div
        className={`fixed flex justify-center items-center rounded-full bg-header w-10 h-10 border border-line md:border-primary shadow-md backdrop-blur-[15px] cursor-pointer ${className}`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full h-full flex justify-center items-center rounded-full cursor-pointer fa-beat"
        >
          <FaHeart size={20} className="text-red-500" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center duration-300 ease-out z-700">
          <div className="bg-white px-5 py-3 m-2 rounded-lg shadow-lg">
            <h3 className="text-xl text-gray-700 font-semibold mb-4">
              Support Our Ministry
            </h3>
            <p className="text-gray-600 py-2">
              Would you like to support our ministry with a donation?
            </p>
            <div className="mt-4 flex items-center justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 tracking-wide cursor-pointer md:font-medium font-normal text-gray-800"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={goto}
                className="bg-accent-soft hover:bg-accent-soft-hover md:font-medium font-normal duration-300 transition-all rounded-md px-4 py-2 tracking-wide cursor-pointer text-accent"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateButton;
