import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Coshare | Luxury Fractional Ownership in UAE", 
  description = "Experience premium fractional ownership of supercars, yachts, and desert 4x4s in Dubai. Smart, secure, and fully managed co-ownership for the modern lifestyle.",
  canonical = "https://coshare.ae"
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
    <script type="application/ld+json">
      {JSON.stringify([organizationSchema, faqSchema])}
    </script>
  );
};
