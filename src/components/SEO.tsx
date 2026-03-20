import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'product';
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Coshare | Fractional Ownership of Assets in UAE", 
  description = "Join the future of ownership. Co-own cars, yachts, real estate and more in the UAE with Coshare's AI-powered fractional ownership marketplace.",
  canonical = "https://coshare.ae",
  image = "https://storage.googleapis.com/aistudio-user-uploads/6117622839446220/1741689564993_image.png",
  type = 'website'
}) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Coshare",
    "url": "https://coshare.ae",
    "logo": "https://coshare.ae/logo.png",
    "description": "Premium fractional ownership platform for luxury assets in the UAE.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "sameAs": [
      "https://instagram.com/coshare.ae",
      "https://linkedin.com/company/coshare-ae"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is fractional ownership?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fractional ownership allows multiple individuals to share ownership of a high-value asset, such as a luxury car or yacht. Each owner holds a legal share in an SPV (Special Purpose Vehicle) that owns the asset."
        }
      },
      {
        "@type": "Question",
        "name": "How does Coshare work in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Coshare identifies premium assets, structures them into ADGM-registered SPVs, and allows users to buy fractions (from 1/10th). We handle all maintenance, insurance, and storage while you enjoy guaranteed usage days."
        }
      },
      {
        "@type": "Question",
        "name": "Is fractional ownership legal in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Coshare uses legally recognized Special Purpose Vehicles (SPVs) registered in the Abu Dhabi Global Market (ADGM) to ensure secure and transparent ownership for all participants."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonical} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <script type="application/ld+json">
        {JSON.stringify([organizationSchema, faqSchema])}
      </script>
    </>
  );
};
