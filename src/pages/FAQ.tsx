import React from 'react';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h3 className="text-lg font-bold text-[#0b1b34] group-hover:text-[#256ab1] transition-colors">{question}</h3>
        {isOpen ? <Minus className="w-5 h-5 text-[#256ab1]" /> : <Plus className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-gray-600 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

export const FAQ = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <SEO
        title="Coshare FAQ | Co-ownership, Sharing & Platform Questions"
        description="Find answers about how Coshare works, co-ownership structure, safety, usage, and payments."
        canonical="https://www.coshare.ai/faq"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is cosharing?", "acceptedAnswer": { "@type": "Answer", "text": "Cosharing is a modern ownership model where multiple parties share the cost and usage of a tangible asset. In Coshare's case, this includes cars, and we are working to bring boats and real estate soon." } },
            { "@type": "Question", "name": "Is it legal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Phase 1 utilizes a streamlined legal structure protected by a comprehensive co-ownership agreement and official registration to ensure strict compliance." } },
            { "@type": "Question", "name": "How are maintenance and insurance handled?", "acceptedAnswer": { "@type": "Answer", "text": "We facilitate maintenance and insurance to keep things simple. While we offer a fully managed service if required, costs are transparently split, and you only pay for the services you need." } },
            { "@type": "Question", "name": "Can I sell my fraction later?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Coshare provides a secondary marketplace where you can list your fraction for sale to the public, providing liquidity without waiting for the asset to be sold entirely." } },
            { "@type": "Question", "name": "How do I book time with the asset?", "acceptedAnswer": { "@type": "Answer", "text": "You can book time through the Coshare app. Our AI-powered calendar ensures fair distribution of peak and off-peak days based on your share percentage." } },
            { "@type": "Question", "name": "What happens if an asset is damaged?", "acceptedAnswer": { "@type": "Answer", "text": "In the event of damage, repair costs may be covered fully or partially according to the user's insurance policy. To preserve the asset's value, our team can handle the entire claims and repair process if desired." } },
            { "@type": "Question", "name": "Are there any hidden fees?", "acceptedAnswer": { "@type": "Answer", "text": "No, there are no hidden fees. We pride ourselves on complete transparency. While the core co-ownership structure is clear, we do offer optional additional services (like premium storage, specialized cleaning, or delivery) whose prices may vary according to the specific asset and user requests." } },
            { "@type": "Question", "name": "Who can use the asset?", "acceptedAnswer": { "@type": "Answer", "text": "Only verified co-owners who have passed our strict KYC and background checks are authorized to use the asset." } },
            { "@type": "Question", "name": "How are expenses split?", "acceptedAnswer": { "@type": "Answer", "text": "All running costs—including insurance, routine maintenance, and registration—are divided proportionally based on your ownership stake. Our platform automates this process, providing transparent, itemized billing so you only pay your fair share." } },
            { "@type": "Question", "name": "How are conflicts resolved?", "acceptedAnswer": { "@type": "Answer", "text": "Conflicts are mediated by our dedicated support team using clear guidelines, with the primary goal of preserving the asset's value for everyone involved." } }
          ]
        })}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">{t('home.faq.title')}</h1>
          <p className="text-base md:text-lg text-gray-600">{t('home.faq.subtitle')}</p>
        </motion.div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="space-y-2">
            <FAQItem 
              question={t('home.faq.1.q')} 
              answer={t('home.faq.1.a')} 
            />
            <FAQItem 
              question={t('home.faq.2.q')} 
              answer={t('home.faq.2.a')} 
            />
            <FAQItem 
              question={t('home.faq.3.q')} 
              answer={t('home.faq.3.a')} 
            />
            <FAQItem 
              question={t('home.faq.4.q')} 
              answer={t('home.faq.4.a')} 
            />
            <FAQItem 
              question={t('home.faq.5.q')} 
              answer={t('home.faq.5.a')} 
            />
            <FAQItem 
              question={t('home.faq.6.q')} 
              answer={t('home.faq.6.a')} 
            />
            <FAQItem 
              question={t('home.faq.7.q')} 
              answer={t('home.faq.7.a')} 
            />
            <FAQItem 
              question={t('home.faq.8.q')} 
              answer={t('home.faq.8.a')} 
            />
            <FAQItem 
              question={t('home.faq.9.q')} 
              answer={t('home.faq.9.a')} 
            />
            <FAQItem 
              question={t('home.faq.10.q')} 
              answer={t('home.faq.10.a')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
