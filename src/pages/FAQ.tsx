import React from 'react';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
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
        <h4 className="text-lg font-bold text-[#0b1b34] group-hover:text-[#256ab1] transition-colors">{question}</h4>
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
        title="FAQ | Coshare"
        description="Frequently asked questions about Coshare."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">{t('home.faq.title')}</h1>
          <p className="text-base md:text-lg text-gray-600">{t('home.faq.subtitle')}</p>
        </div>
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
