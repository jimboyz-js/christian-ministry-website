"use client";
import { navItems } from "@/constants";
import screenDim from "@/utils/screen";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const CaretDownIcon = ({ open }) => (
  <svg
    viewBox="0 0 256 256"
    className={`w-4 h-4 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    fill="black"
  >
    <path d="M128 188a12 12 0 0 1-8.49-3.51l-80-80a12 12 0 1 1 17-17L128 159l71.51-71.51a12 12 0 1 1 17 17l-80 80A12 12 0 0 1 128 188Z" />
  </svg>
);

const CaretRightIcon = ({ open }) => (
  <svg
    viewBox="0 0 256 256"
    className={`w-4 h-4 transition-transform duration-200 ${
      open ? "rotate-90" : ""
    }`}
    fill="black"
    transform="rotate(270)"
  >
    <path d="M128 188a12 12 0 0 1-8.49-3.51l-80-80a12 12 0 1 1 17-17L128 159l71.51-71.51a12 12 0 1 1 17 17l-80 80A12 12 0 0 1 128 188Z" />
  </svg>
);

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const isMobile = screenDim("(max-width: 450px)");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/blog/search/?q=${encodeURIComponent(query)}`);
  };

  const handleSearchIconClick = () => {
    setSearchOpen(true);
    // Wait for the input to render, then focus
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <header className="sticky w-full top-0 bg-header backdrop-blur-[12px] border-b border-line shadow-sm text-black z-1000">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-5">
        {/* LOGO */}
        <div className={`${!isMobile && searchOpen ? "hidden" : "flex"} mr-4`}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Christian Ministry Website"
              loading="eager"
              width={60}
              height={60}
              className="w-auto h-auto m-0 p-0"
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div
          className={`hidden gap-6 items-center transition uppercase font-base text-[1em] ${
            searchOpen ? "hidden" : "md:flex"
          }`}
        >
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            const isHovered = hovered === item.href;
            const isHighlighted = isActive || isHovered;
            return (
              <div key={i} className="relative group">
                {/* Top Level */}
                <div
                  className={`flex items-center justify-between gap-1 cursor-pointer font-medium relative ${isHighlighted ? "text-blue-700" : "text-gray-700"}`}
                  onMouseEnter={() => {
                    setOpenDropdown(i);
                    setHovered(item.href);
                  }}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link href={item.href}>{item.label}</Link>

                  {/* Animated Border Bottom */}
                  <button className="cursor-pointer" href={item.href}>
                    {item.dropdown && (
                      <CaretDownIcon open={openDropdown === i} />
                    )}
                  </button>
                </div>

                {/* Animated Border Bottom */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-blue-700 transition-all duration-300 ${isHighlighted ? "w-full" : "w-0"}`}
                />

                {/* Dropdown */}
                {item.dropdown && (
                  <div
                    className="absolute left-0 top-full bg-[#fff] text-base capitalize border border-line rounded-lg shadow-card hidden group-hover:flex flex-col gap-2 py-1 min-w-[210px]"
                    onMouseLeave={() => {
                      setOpenDropdown(null);
                      setOpenSubmenu(null);
                    }}
                  >
                    {item.dropdown.map((sub, j) => (
                      <div key={j}>
                        {/* If has submenu */}
                        {sub.submenu ? (
                          <>
                            <div className="w-full flex justify-between px-4 py-2 hover:bg-[var(--bg-hover-menu)]">
                              <Link href={sub.href}>{sub.label}</Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenSubmenu(
                                    openSubmenu === `${i}-${j}`
                                      ? null
                                      : `${i}-${j}`,
                                  );
                                }}
                                className="p-1 cursor-pointer"
                              >
                                <CaretRightIcon
                                  open={openSubmenu === `${i}-${j}`}
                                />
                              </button>
                            </div>

                            {/* Submenu (accordion style) */}
                            <div
                              className={`overflow-scroll transition-all text-gray-700 ${
                                openSubmenu === `${i}-${j}`
                                  ? "max-h-80"
                                  : "max-h-0"
                              }`}
                            >
                              {sub.submenu.map((s, k) => (
                                <Link
                                  key={k}
                                  href={s.href}
                                  className="block pl-6 py-2 text-sm hover:bg-[var(--bg-hover-menu)]"
                                >
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={sub.href}
                            className="px-4 py-2 hover:bg-[var(--bg-hover-menu)] flex"
                          >
                            {sub.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {!searchOpen && (
            <div className="flex items-center gap-4">
              {/* SEARCH ICON */}
              <button
                onClick={handleSearchIconClick}
                className="text-xl text-primary cursor-pointer"
              >
                <FaSearch />
              </button>
            </div>
          )}
        </div>

        {!searchOpen && (
          <div className="md:hidden flex items-centerz gap-4">
            {/* SEARCH ICON */}
            <button
              onClick={handleSearchIconClick}
              className="text-xl text-primary cursor-pointer"
            >
              <FaSearch />
            </button>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[4px] text-primary cursor-pointer"
            >
              <span
                className={`block h-[2px] w-6 bg-primary transition ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
              />
              <span
                className={`block h-[2px] w-6 bg-primary transition ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[2px] w-6 bg-primary transition ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
              />
            </button>
          </div>
        )}

        {/* SEARCH BAR */}
        {searchOpen && (
          <div className="flex items-center gap-2 w-full md:w-fit md:min-w-[350px]">
            <form onSubmit={handleSubmit} className="w-full">
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1 border border-line rounded outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                onBlur={() => setSearchOpen(false)} // Hide when you click away
              />
            </form>
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xl cursor-pointer text-primary"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </nav>

      {/* MOBILE MENU */}
      {!searchOpen && (
        <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
          {navItems.map((item, i) => (
            <div key={i} className="border-b border-line">
              {/* Top Level */}
              {item.dropdown ? (
                <>
                  <div className="w-full text-left px-4 py-3 flex justify-between cursor-pointer">
                    <Link href={item.href} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === i ? null : i)
                      }
                      className="cursor-pointer"
                    >
                      {item.dropdown && (
                        <CaretDownIcon open={openDropdown === i} />
                      )}
                    </button>
                  </div>

                  {/* Dropdown */}
                  {openDropdown === i && (
                    <div className="text-gray-800">
                      {item.dropdown.map((sub, j) => (
                        <div key={j}>
                          {sub.submenu ? (
                            <>
                              <div className="w-full text-left px-6 py-2 flex justify-between">
                                <Link
                                  href={sub.href}
                                  // close the menu
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                                <button
                                  onClick={() =>
                                    setOpenSubmenu(
                                      openSubmenu === `${i}-${j}`
                                        ? null
                                        : `${i}-${j}`,
                                    )
                                  }
                                  className="cursor-pointer p-1"
                                >
                                  <CaretRightIcon
                                    open={openSubmenu === `${i}-${j}`}
                                  />
                                </button>
                              </div>

                              {openSubmenu === `${i}-${j}` && (
                                <div>
                                  {sub.submenu.map((s, k) => (
                                    <Link
                                      key={k}
                                      href={s.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="block px-8 py-2 text-gray-700"
                                    >
                                      {s.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={sub.href}
                              className="block px-6 py-2"
                              onClick={() => setMenuOpen(false)} // close the menu when click
                            >
                              {sub.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)} // close the menu when is click
                  className="block px-4 py-3"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
