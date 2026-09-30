# Christian Ministry Website

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-Open%20Source-5E5E5E?style=for-the-badge" alt="Open source" />
</p>

A public open-source Christian ministry website built with Next.js, designed for churches, outreach ministries, and discipleship organizations to share Bible teachings, devotionals, sermon content, blog posts, and ministry updates.

This repository is a cleaned public version of a larger private project. Some branded assets, premium features, and production-only integrations have been intentionally removed or left out for open-source release.

## Why this project exists

The app gives ministries a modern web presence with:

- a responsive homepage and ministry landing pages
- article/blog browsing powered by Blogger
- sermon categories, archives, search, and related content
- newsletter form support
- contact form functionality
- SEO-ready pages with metadata, sitemap, and robots support
- optional donation/giving integration code for future setup

## Features

### Content & ministry site

- Responsive homepage with hero section, featured post, mission/vision, recent posts, and verse highlighting
- Blog archive, search, category, tag, and series pages
- Individual post pages optimized for reading and SEO
- Ministry pages including About, Contact, Donate, Statement of Faith, Editorial Policy, Privacy Policy, and Terms of Use
- RSS feeds and sitemap support

### Community tools

- Newsletter signup flow powered by MailerLite
- Contact form integrated through EmailJS
- Social links and ministry contact details
- Bible-related API endpoints and verse integrations

### Technical highlights

- Next.js App Router project structure
- Server-side data fetching from Google Blogger API
- Tailwind-based responsive styling
- Metadata and social preview setup for SEO and sharing

## Public version note

This repository is intentionally a public-facing version of a larger private project. Some elements may be missing or placeholder-based, including:

- proprietary brand graphics and photography
- private ministry media and campaign content
- production-only admin or CMS workflows
- live credentials and private deployment configuration
- business-specific integrations used in the full version

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Google Blogger API
- Node.js server routes for API integrations
- EmailJS for contact form submissions
- MailerLite for newsletter subscriptions
- SQLite support in codebase for internal tooling
- PayMongo, PayPal, and Stripe integration code present but optional and credential-based

## Project structure

```text
.
├── README.md
├── EMAIL_SETUP_GUIDE.md
├── email-templates/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── blog/
│   │   ├── components/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── donate/
│   │   ├── subscribe/
│   │   └── ...
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
└── .gitignore
```

## Prerequisites

Before running this project locally, make sure you have:

- Node.js 20 or newer
- npm (or another package manager like pnpm)
- A Google Blogger blog and API access
- Optional: EmailJS account for contact form functionality
- Optional: MailerLite account for newsletter signup integration
- Optional: payment provider credentials if you enable giving/donation features

## Installation

```bash
npm install
```

## Environment variables

Create a `.env.local` file in the project root and add the required values for your deployment.

Example:

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

```

### Optional payment-related variables

These are only relevant if you enable the donation or payment features in the app:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_WEBHOOK_ID=your_webhook_id
PAYMONGO_SECRET_KEY=your_paymongo_secret_key
PAYMONGO_WEBHOOK_SECRET=your_paymongo_webhook_secret
```

> The public version is intentionally flexible. These variables may remain unused unless you activate those features.

## Running locally

### Development mode

```bash
npm run dev
```

Then open the site in your browser:

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

## Content model

This project is built around a Google Blogger content source. Posts, categories, tags, archives, pages, and featured material are pulled from the configured Blogger blog. If you want to use this with your own ministry content, update the blog ID, API keys, and labels accordingly.

## Notes for deployment

Before launching a live version, review these items:

- replace placeholder text and ministry branding
- configure social media and contact information
- set actual environment variables in your deployment platform
- enable EmailJS and MailerLite if you want those flows active
- confirm the proper Blogger blog ID and API credentials
- disable or secure payment integrations unless they are intentionally used

## License

This project is open-source and intended for learning, adaptation, and reuse in ministry or church website projects.

Please review the code and environment requirements carefully before deploying it publicly or in production.

## Acknowledgements

Built for Christian ministry and discipleship communication using modern web technologies and open-source tooling.

---
