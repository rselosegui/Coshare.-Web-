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
  title = "Coshare | Co-own and Share Assets", 
  description = "Join the future of ownership. Co-own cars, boats, real estate and more all around the world with Coshare's AI-powered cosharing marketplace.",
  canonical = "https://coshare.ai",
  image = "https://storage.googleapis.com/aistudio-user-uploads/6117622839446220/1741689564993_image.png",
  type = 'website'
}) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Coshare",
    "url": "https://coshare.ai",
    "logo": "https://coshare.ai/logo.png",
    "description": "Cosharing platform for high-value assets all around the world.",
    "sameAs": [
      "https://instagram.com/coshare.ai",
      "https://linkedin.com/company/coshare-ai"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is cosharing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cosharing allows multiple individuals to share ownership of a high-value asset, such as a car or yacht. Each owner is officially registered as an authorized co-owner to ensure legal compliance."
        }
      },
      {
        "@type": "Question",
        "name": "How does Coshare work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Coshare identifies assets, protects them under a comprehensive co-ownership agreement, and allows users to buy shares (from 1/8th). We handle all maintenance, insurance, and storage while you enjoy guaranteed usage days."
        }
      },
      {
        "@type": "Question",
        "name": "Is cosharing legal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Coshare utilizes a streamlined legal structure protected by a comprehensive co-ownership agreement and official registration to ensure strict compliance."
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
