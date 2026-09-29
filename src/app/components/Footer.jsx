import Link from "next/link";
import React from "react";
import {
  footerLinks,
  socialIcons,
  footerItems1,
  footerItems2,
} from "@/constants";
import { isObject } from "@/utils";

const Footer = () => {
  return (
    <footer className="bg-primary text-accent" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap sm:justify-between justify-center pt-7 pb-7">
          <div className="flex flex-wrap flex-col sm:flex-row gap-[35px]">
            {footerLinks.map((link_items) => (
              <div
                className="flex flex-col sm:items-start items-center cursor-pointer"
                key={link_items.id}
              >
                <h1 className="font-bold uppercase text-[14px]">
                  {link_items.url && isObject(link_items.url) ? (
                    <a
                      href={link_items.url.href}
                      target={link_items.url.target}
                      rel={link_items.url.rel}
                    >
                      {link_items.title}
                    </a>
                  ) : !link_items.url ? (
                    `${link_items.title}`
                  ) : (
                    <Link href={link_items.url}>{link_items.title}</Link>
                  )}
                </h1>
                <ul className="flex flex-col sm:items-start items-center gap-[4px] text-[.8em] mt-[13px] font-normal">
                  {link_items.items?.map((item, index) => (
                    <li key={index}>
                      {item.url && isObject(item.url) ? (
                        <a
                          href={item.url.href}
                          target={item.url.target}
                          rel={item.url.rel}
                        >
                          {item.label}
                        </a>
                      ) : !item.url ? (
                        `${item.label}`
                      ) : (
                        <Link href={item.url}>{item.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* social icons */}
          <div className="flex items-start justify-center text-[#fefefe] w-full sm:w-fit sm:m-0 mt-5 gap-[20px] sm:text-[1.5em] text-[1.2em]">
            {socialIcons.map((social_icon) => (
              <a key={social_icon.id} href={social_icon.href} target="_blank">
                {social_icon.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap sm:justify-between justify-center pt-7 pb-7">
          <div className="flex flex-wrap items-center text-[#8cacd7] opacity-100 sm:text-[0.9em] text-[0.8em] font-medium">
            {footerItems1.map((footer_item, index) => (
              <React.Fragment key={footer_item.id}>
                {index > 0 && <div className="h-4 w-px bg-[#8cacd7]" />}
                <a href={footer_item.url} className="mx-1">
                  {footer_item.label}
                </a>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-wrap items-center text-[#8cacd7] opacity-100 sm:text-[0.9em] text-[0.8em] font-medium">
            {footerItems2.map((footer_item, index) => (
              <React.Fragment key={footer_item.id}>
                {index > 0 && <div className="h-4 w-px bg-[#8cacd7]" />}
                <a href={footer_item.url} className="mx-1">
                  {footer_item.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
