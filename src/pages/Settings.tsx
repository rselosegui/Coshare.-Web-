import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../store/language';
import { 
  Bell, Globe, Moon, Lock, CreditCard, HelpCircle, 
  ChevronRight, Languages, X, Check, Sun, Smartphone,
  Mail, MessageSquare, Phone, ExternalLink, MessageCircle
} from 'lucide-react';

export const Settings = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark';
      if (saved) return saved;
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const [currency, setCurrency] = useState('AED');
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    whatsapp: true
  });

  // Apply theme to document root and persist
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        { 
          id: 'language', 
          icon: Languages, 
          label: 'Language', 
          value: lang === 'EN' ? 'English' : 'Arabic',
          action: toggleLang 
        },
        { 
          id: 'notifications', 
          icon: Bell, 
          label: 'Notifications', 
          value: Object.entries(notifications).filter(([_, v]) => v).map(([k]) => k === 'whatsapp' ? 'WhatsApp' : k.charAt(0).toUpperCase() + k.slice(1)).join(', '),
          action: () => setActiveModal('notifications') 
        },
        { 
          id: 'appearance', 
          icon: theme === 'light' ? Sun : Moon, 
          label: 'Appearance', 
          value: theme === 'light' ? 'Light Mode' : 'Dark Mode',
          action: () => setActiveModal('appearance') 
        },
      ]
    },
    {
      title: 'Payments & Billing',
      items: [
        { 
          id: 'payment-methods', 
          icon: CreditCard, 
          label: 'Payment Methods', 
          value: 'Visa ending in 4242',
          action: () => setActiveModal('payment-methods') 
        },
        { 
          id: 'currency', 
          icon: Globe, 
          label: 'Display Currency', 
          value: `${currency} (Dirham)`,
          action: () => setActiveModal('currency') 
        },
      ]
    },
    {
      title: 'Privacy & Support',
      items: [
        { 
          id: 'privacy', 
          icon: Lock, 
          label: 'Privacy Policy', 
          value: 'Last updated March 2024',
          action: () => setActiveModal('privacy') 
        },
        { 
          id: 'help', 
          icon: HelpCircle, 
          label: 'Help & Support', 
          value: '24/7 Concierge Available',
          action: () => setActiveModal('help') 
        },
      ]
    }
  ];

  const renderModalContent = () => {
    switch (activeModal) {
      case 'notifications':
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-6 font-medium">Choose how you want to receive updates about your fractional assets and bookings.</p>
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                <div className="flex items-center">
                  {key === 'push' ? <Smartphone className="w-5 h-5 mr-3 text-primary" /> : 
                   key === 'email' ? <Mail className="w-5 h-5 mr-3 text-primary" /> : 
                   key === 'whatsapp' ? <MessageCircle className="w-5 h-5 mr-3 text-emerald-600" /> :
                   <MessageSquare className="w-5 h-5 mr-3 text-primary" />}
                  <span className="text-sm font-bold text-primary capitalize">{key === 'whatsapp' ? 'WhatsApp' : key} Notifications</span>
                </div>
                <button 
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-on-primary rounded-full transition-all ${value ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        );
      case 'appearance':
        return (
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id as 'light' | 'dark')}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center space-y-3 ${
                  theme === mode.id ? 'border-primary bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <mode.icon className={`w-8 h-8 ${theme === mode.id ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-sm font-bold ${theme === mode.id ? 'text-primary' : 'text-gray-400'}`}>{mode.label}</span>
                {theme === mode.id && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        );
      case 'payment-methods':
        return (
          <div className="space-y-4">
            <div className="p-6 bg-primary text-on-primary rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform" />
              <div className="relative">
                <div className="flex justify-between items-start mb-8">
                  <CreditCard className="w-8 h-8 opacity-50" />
                  <span className="text-xs font-bold tracking-widest">VISA</span>
                </div>
                <p className="text-lg font-mono tracking-[0.2em] mb-4">•••• •••• •••• 4242</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] opacity-50 uppercase tracking-widest">Card Holder</p>
                    <p className="text-sm font-bold">COSHARE MEMBER</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] opacity-50 uppercase tracking-widest">Expires</p>
                    <p className="text-sm font-bold">12/26</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-3xl text-sm font-bold text-gray-400 hover:border-primary hover:text-primary transition-all">
              + Add New Payment Method
            </button>
          </div>
        );
      case 'currency':
        return (
          <div className="space-y-2">
            {['AED', 'USD', 'EUR', 'GBP', 'SAR'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  currency === curr ? 'bg-primary text-on-primary' : 'hover:bg-gray-50 text-primary'
                }`}
              >
                <span className="font-bold">{curr} - {curr === 'AED' ? 'UAE Dirham' : curr === 'USD' ? 'US Dollar' : curr === 'EUR' ? 'Euro' : curr === 'GBP' ? 'British Pound' : 'Saudi Riyal'}</span>
                {currency === curr && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        );
      case 'privacy':
        return (
          <div className="prose prose-sm max-h-[60vh] overflow-y-auto pr-4">
            <h4 className="text-primary font-bold">1. Data Collection</h4>
            <p className="text-gray-500 font-medium">We collect information that you provide directly to us, including when you create an account, make a fractional asset purchase, or communicate with our concierge team.</p>
            <h4 className="text-primary font-bold">2. Use of Information</h4>
            <p className="text-gray-500 font-medium">We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to send you technical notices and support messages.</p>
            <h4 className="text-primary font-bold">3. Data Security</h4>
            <p className="text-gray-500 font-medium">We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
            <h4 className="text-primary font-bold">4. Contact Us</h4>
            <p className="text-gray-500 font-medium">If you have any questions about this Privacy Policy, please contact us at privacy@coshare.com.</p>
          </div>
        );
      case 'help':
        return (
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: MessageSquare, label: 'Live Concierge Chat', desc: 'Available 24/7 for Elite members' },
              { icon: Mail, label: 'Email Support', desc: 'support@coshare.com' },
              { icon: Phone, label: 'Priority Phone Line', desc: '+971 4 000 0000' },
              { icon: ExternalLink, label: 'Help Center', desc: 'Browse our detailed guides' }
            ].map((option) => (
              <button key={option.label} className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-left group border border-gray-100/50">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">{option.label}</p>
                  <p className="text-xs text-gray-500 font-medium">{option.desc}</p>
                </div>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {settingSections.map((section, sectionIdx) => (
            <div key={section.title}>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">
                {section.title}
              </h2>
              <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
                {section.items.map((item, itemIdx) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group ${
                      itemIdx !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-primary">{item.label}</p>
                        {item.value && (
                          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{item.value}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Danger Zone */}
          <div className="pt-8">
            <button className="w-full p-6 bg-red-50 rounded-3xl border border-red-100 text-center group hover:bg-red-100 transition-colors">
              <p className="text-sm font-bold text-red-600">Delete Account</p>
              <p className="text-[10px] font-medium text-red-400 uppercase tracking-widest mt-1">
                This action is permanent and cannot be undone
              </p>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-primary capitalize">
                    {activeModal.replace('-', ' ')}
                  </h3>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                {renderModalContent()}
                <div className="mt-8">
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="w-full py-4 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
