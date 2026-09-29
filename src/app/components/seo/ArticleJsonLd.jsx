export default function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  publisherName,
  publisherLogo,
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: title,

    description,

    image: image ? [image] : undefined,

    datePublished,
    dateModified,

    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl && {
        url: authorUrl,
      }),
    },

    publisher: {
      "@type": "Organization",
      name: publisherName,
      ...(publisherLogo && {
        logo: {
          "@type": "ImageObject",
          url: publisherLogo,
        },
      }),
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
