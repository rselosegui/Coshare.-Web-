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
        canonical="https://coshare.ai/faq"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is cosharing?", "acceptedAnswer": { "@type": "Answer", "text": "Cosharing allows multiple individuals to share ownership of a high-value asset, such as a car or yacht. Each owner is officially registered as an authorized co-owner to ensure legal compliance." } },
            { "@type": "Question", "name": "How does Coshare work?", "acceptedAnswer": { "@type": "Answer", "text": "Coshare identifies assets, protects them under a comprehensive co-ownership agreement, and allows users to buy shares (from 1/8th). We handle all maintenance, insurance, and storage while you enjoy guaranteed usage days." } },
            { "@type": "Question", "name": "Is cosharing legal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Coshare utilizes a streamlined legal structure protected by a comprehensive co-ownership agreement and official registration to ensure strict compliance." } }
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
