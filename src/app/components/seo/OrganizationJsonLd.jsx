import React from "react";

const OrganizationJsonLd = ({ name, url, logo, description }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: { "@type": "ImageObject", url: logo },
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default OrganizationJsonLd;
