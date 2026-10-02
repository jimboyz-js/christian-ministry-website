# Christian Ministry Website

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-Open%20Source-5E5E5E?style=for-the-badge" alt="Open source" />
</p>

A Next.js 16 Christian ministry website powered by Google Blogger content. The project includes a public-facing blog, ministry pages, newsletter subscribe flow, contact form, donation page, RSS feed, and SEO-ready metadata.

## Overview

This repository reflects the current app structure and routes that are actually present in the codebase. Some earlier templates and route references were removed or no longer used, so this README has been updated to match the real project.

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Google Blogger API
- Node.js API routes
- EmailJS
- MailerLite
- SQLite support for internal tooling
- RSS generation with `rss`

## Current app structure

```text
.
├── README.md
├── EMAIL_SETUP_GUIDE.md
├── email-templates/
├── public/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── api/
│   │   │   ├── blogger/
│   │   │   │   ├── posts/
│   │   │   │   └── posts/[postId]/
│   │   │   ├── newsletter/
│   │   │   │   └── run/
│   │   │   └── subscribe/
│   │   ├── blog/
│   │   │   ├── archive/
│   │   │   │   ├── [year]/
│   │   │   │   └── [year]/[month]/
│   │   │   ├── category/
│   │   │   │   ├── [slug]/
│   │   │   │   └── page.jsx
│   │   │   ├── featured/
│   │   │   ├── post/[postId]/
│   │   │   ├── related/[slug]/
│   │   │   ├── rss.xml/
│   │   │   ├── search/
│   │   │   ├── series/
│   │   │   │   ├── [slug]/
│   │   │   │   └── more-series-topic/[slug]/
│   │   │   ├── tag/
│   │   │   │   ├── [slug]/
│   │   │   │   └── page.jsx
│   │   │   ├── archive/page.jsx
│   │   │   ├── category/page.jsx
│   │   │   ├── featured/page.jsx
│   │   │   ├── page.jsx
│   │   │   ├── search/page.jsx
│   │   │   ├── series/page.jsx
│   │   │   └── tag/page.jsx
│   │   ├── components/
│   │   ├── contact/
│   │   ├── donate/
│   │   ├── editorial-policy/
│   │   ├── feeds/
│   │   ├── privacy-policy/
│   │   ├── statement-of-faith/
│   │   │   └── what-we-believe/
│   │   ├── subscribe/
│   │   │   └── thank-you/
│   │   ├── terms-of-use/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── not-found.jsx
│   │   ├── page.js
│   │   ├── robots.js
│   │   └── sitemap.js
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   └── ...
├── package.json
├── next.config.mjs
├── jsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── .gitignore
└── .env.example (if used in your local setup)
```

## Current routes

### Public pages

- `/`
- `/about`
- `/contact`
- `/donate`
- `/blog`
- `/blog/category`
- `/blog/category/[slug]`
- `/blog/featured`
- `/blog/search`
- `/blog/archive`
- `/blog/archive/[year]`
- `/blog/archive/[year]/[month]`
- `/blog/series`
- `/blog/series/[slug]`
- `/blog/series/more-series-topic/[slug]`
- `/blog/tag`
- `/blog/tag/[slug]`
- `/blog/post/[postId]`
- `/blog/related/[slug]`
- `/feeds`
- `/statement-of-faith`
- `/statement-of-faith/what-we-believe`
- `/editorial-policy`
- `/privacy-policy`
- `/terms-of-use`
- `/subscribe`
- `/subscribe/thank-you`

### API routes

- `/api/blogger/posts`
- `/api/blogger/posts/[postId]`
- `/api/subscribe`
- `/api/newsletter/run`
- `/blog/rss.xml`

> The project no longer includes some of the older public route references that were present in the older README copy. The current application matches the structure shown above.

## Features

- Responsive ministry landing page and homepage
- Blog browsing with category, tag, archive, series, and featured content
- Search and related-post functionality
- Individual post pages with metadata support
- Newsletter signup integration through MailerLite
- Contact form using EmailJS
- Donation/support page with integration placeholders
- RSS feed generation for blog content
- SEO metadata, sitemap, and robots file support

## Content model

The site is built around Google Blogger content. Posts are pulled from the configured Blogger blog and mapped into categories, tags, archives, searches, and series pages. The app expects a Blogger blog ID and API credentials to fetch content.

## Prerequisites

Before running locally, make sure you have:

- Node.js 20 or newer
- npm or another package manager
- A Google Blogger blog and API access
- Optional: EmailJS account
- Optional: MailerLite account
- Optional: SMTP or payment credentials depending on your planned integrations

## Installation

```bash
npm install
```

## Environment variables

Create a `.env.local` file in the project root and add values like the following:

```env
BASE_URL=http://localhost:3000
DOMAIN_NAME=localhost

# Blogger / content
BLOG_ID=your_blogger_blog_id
API_KEY=your_google_api_key
BLOG_BASE_URL=https://your-blog.blogspot.com
MAX_RESULTS=7

# Public frontend URLs
NEXT_PUBLIC_BACK_END_URL_API_END_POINT=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN_NAME=localhost
NEXT_PUBLIC_EMAIL_ADDRESS=hello@example.com
NEXT_PUBLIC_SOCIAL_FB=https://facebook.com/your_page
NEXT_PUBLIC_SOCIAL_IG=https://instagram.com/your_handle
NEXT_PUBLIC_SOCIAL_X=https://x.com/your_handle
NEXT_PUBLIC_SOCIAL_YT=https://youtube.com/@your_channel
NEXT_PUBLIC_SOCIAL_META_MSGR=https://m.me/your_page

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_CONTACT_US_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# MailerLite
MAILERLITE_API_END_POINT=https://connect.mailerlite.com/api
MAILERLITE_API_TOKEN=your_mailerlite_token
MAILERLITE_GROUP_ID=your_group_id
MAILERLITE_FROM_NAME=Christian Ministry Website
MAILERLITE_FROM_EMAIL=hello@yourdomain.com

# Optional email sending
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_RECEIVER=hello@yourdomain.com
```

### Optional payment variables

These are only needed if donation or payment features are active:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_WEBHOOK_ID=your_paypal_webhook_id
PAYMONGO_SECRET_KEY=your_paymongo_secret_key
PAYMONGO_WEBHOOK_SECRET=your_paymongo_webhook_secret
```

## Running locally

### Development

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Deployment notes

Before deploying, make sure to:

- replace placeholder ministry branding and copy
- configure actual social media links and contact details
- set real environment values on your hosting provider
- enable EmailJS and MailerLite only if those flows are intended to work live
- verify the Blogger blog ID and API key match the target content source
- remove or secure any optional payment integrations you do not plan to use

## License

This project is intended for ministry, church, and Christian content websites and can be adapted for learning, internal use, and public deployment.

Please review the environment configuration and content source carefully before launching a public production site.

## Acknowledgements

Built for Christian discipleship, ministry communication, and digital outreach using modern web tools and open-source technology.

---
