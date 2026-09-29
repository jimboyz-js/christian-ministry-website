/**
 * @author jimboyz-js
 * @date 08-02-2026 3:17 PM SUN.
 */

export default function robots() {
  const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/contact/",
          "/api/",
          "/terms-of-use/",
          "/privacy-policy/",
          "/donate/cancel/",
          "/donate/paymongo/complete-donation/",
          "/donate/paypal/complete-subscription/",
          "/donate/paypal/success/",
          "/donate/stripe/complete-donation/",
          "/donate/xendit/complete-donation/",
          "/donate/xendit/failed/",
          "/subscribe",
          "/subscribe/thank-you",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/terms-of-use/",
          "/contact/",
          "/api/",
          "/privacy-policy/",
          "/donate/cancel/",
          "/donate/paymongo/complete-donation/",
          "/donate/paypal/complete-subscription/",
          "/donate/paypal/success/",
          "/donate/stripe/complete-donation/",
          "/donate/xendit/complete-donation/",
          "/donate/xendit/failed/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
