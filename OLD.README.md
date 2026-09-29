# Christian Ministry Website

This repository is the public open-source version of a Christian ministry website built with Next.js. It is designed for a ministry, church, or Christian outreach organization to publish devotional content, Bible study articles, sermon categories, ministry information, and newsletter signups.

This public version intentionally removes some proprietary branding, assets, premium integrations, and private features from the full production project.

## Overview

The site is a modern, responsive web application that uses:

- Next.js 16
- React 19
- Tailwind CSS
- Blogger API for content management
- Custom ministry pages and blog architecture
- EmailJS for contact submissions
- MailerLite for newsletter subscriptions
- Optional payment integration code for PayMongo, Stripe, and PayPal

The content is primarily managed through a Blogger blog and exposed through the app via API routes and server-side data fetching. The public version is meant to serve as a reusable foundation for a ministry website, not a full private production stack.

## Features included in this public version

- Responsive homepage with hero, featured post, mission/vision, recent posts, and verse highlighting
- Blog browsing experience with:
  - featured posts
  - categories
  - tags
  - archives
  - series pages
  - search
  - RSS feed
  - individual post pages
- Ministry pages such as:
  - About
  - Contact
  - Donate
  - Statement of Faith
  - What We Believe
  - Terms of Use
  - Privacy Policy
  - Editorial Policy
  - Feeds
- Newsletter subscription form
- Contact form using EmailJS
- Social media and email links in the site footer/header
- SEO setup with sitemap and robots configuration
- Bible-related API endpoints and verse integration

## Not included in this public version

Some private or premium items from the original full project were intentionally removed or left out for open-source publication. This may include:

- proprietary brand assets and photography
- private ministry media and campaign content
- custom internal tools or admin workflows
- production-only payment/giving flows and live credentials
- certain business-specific integrations

## Tech stack

- Framework: Next.js 16
- UI: React 19, Tailwind CSS
- Data source: Google Blogger API
- Email: EmailJS, Nodemailer
- Newsletter: MailerLite
- Database: SQLite support present in the codebase for internal tooling
- Payment gateway code: Stripe, PayMongo, and PayPal integration routes are present but require credentials and activation

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

Before running the app, make sure you have:

- Node.js 20+ recommended
- npm or pnpm
- A Google Blogger blog and API access
- Optional: EmailJS account for contact form
- Optional: MailerLite account for newsletter features
- Optional: payment provider credentials if you enable those routes

## Installation

```bash
npm install
```

## Environment variables

Create a `.env.local` file in the project root and add the variables required by your setup.

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

# Bible API
BIBLEQL_API_KEY=your_bible_api_key
```

### Optional payment-related variables

The project includes API routes for payment flows. If you want to enable those, configure the relevant provider credentials. Examples:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_WEBHOOK_ID=your_webhook_id
PAYMONGO_SECRET_KEY=your_paymongo_secret_key
PAYMONGO_WEBHOOK_SECRET=your_paymongo_webhook_secret
```

> In the public open-source version, these are optional and may remain unused unless you enable the corresponding features.

## Running the app

Development mode:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Content model

The website expects content to come from a Blogger source. Posts, categories, tags, archives, and pages are fetched from the configured Blogger blog. If you want to use the project with your own ministry content, update your Blogger blog ID and API settings and keep the labels/tags consistent with the app's logic.

## Notes for maintainers

- The app includes SEO metadata, canonical URLs, and sitemap generation.
- The newsletter integration uses MailerLite and expects a valid API token and group ID.
- The contact page depends on EmailJS configuration.
- Some payment-related code exists in the repository but may not be active in the public version without the necessary credentials.
- The homepage and page text still include placeholder content in some sections, which should be replaced with your ministry-specific copy before deployment.

## License

This project is provided as a public open-source codebase for learning, adaptation, and use in ministry or church website projects.

Please review the code and environment requirements carefully before deploying it publicly.

## Credits

Built for Christian ministry and discipleship communications, using modern Next.js tooling and open-source community libraries.

---
