/**
 * @author jimboyz-js
 * @date 05-29-2026 Fri. 12:34 PM
 */
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";

const FACEBOOK = process.env.NEXT_PUBLIC_SOCIAL_FB;
const EMAIL = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
const IG = process.env.NEXT_PUBLIC_SOCIAL_IG;
const YT = process.env.NEXT_PUBLIC_SOCIAL_YT;
const X = process.env.NEXT_PUBLIC_SOCIAL_X;

export const footerLinks = [
  {
    title: "Explore",
    id: 1,
    url: {
      target: "_blank",
      rel: "",
      href: "/blog/category",
    },
    items: [
      {
        label: "Bible",
        url: "/bible",
      },
      {
        label: "Books",
        url: "/books",
      },
      {
        label: "Giving",
        url: "/donate",
      },
      {
        label: "Blog Archive",
        url: "/blog/archive",
      },
    ],
  },
  {
    title: "Information",
    items: [
      {
        label: "Subscribe",
        url: "/#subscribe",
      },
      {
        label: "RSS Feeds",
        url: "/feeds",
      },
      {
        label: "Sitemap",
        url: {
          target: "_blank",
          rel: "noopener noreferrer",
          href: "/sitemap.xml",
        },
      },
      {
        label: "Terms of Use",
        url: "/terms-of-use",
      },
      {
        label: "Editorial Policy",
        url: "/editorial-policy",
      },
      {
        label: "Privacy",
        url: "/privacy-policy",
      },
    ],
    id: 2,
  },
];

export const socialIcons = [
  {
    icon: <FaYoutube />,
    href: YT,
    id: 1,
  },
  {
    icon: <FaTwitter />,
    href: X,
    id: 2,
  },
  {
    icon: <FaFacebook />,
    href: FACEBOOK,
    id: 3,
  },
  {
    icon: <FaInstagram />,
    href: IG,
    id: 4,
  },
  {
    icon: <FaRegEnvelope />,
    href: `mailto:${EMAIL}`,
    id: 5,
  },
];

export const footerItems1 = [
  {
    label: "Christian Ministry Website",
    id: 1,
  },
  {
    label: "Feedback",
    url: "http://localhost:300/exampl-feedback",
    id: 2,
  },
];

export const footerItems2 = [
  {
    label: `©${new Date().getFullYear()} - Christian Ministry Website`,
    id: 1,
  },
];
