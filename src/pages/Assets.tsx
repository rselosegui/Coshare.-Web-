import React, { useState } from 'react';
import { AssetCategory, AssetSubcategory } from '../data/assets';
import { useLanguage } from '../store/language';
import { formatCurrency } from '../lib/format';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, Home, Ship, Car, Watch, LayoutGrid, Bike, Sparkles, X, Mail, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAssets } from '../hooks/useAssets';

export const Assets = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { assets } = useAssets();
  const [activeCategory, setActiveCategory] = useState<AssetCategory | 'All'>('All');
  const [activeSubcategory, setActiveSubcategory] = useState<AssetSubcategory | 'All'>('All');
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredAssets = assets.filter(asset => {
    if (activeCategory !== 'All' && asset.category !== activeCategory) return false;
    if (activeSubcategory !== 'All' && asset.subcategory !== activeSubcategory) return false;
    return true;
  });

  const subcategories = Array.from(new Set(assets.map(a => a.subcategory)));

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        email: notifyEmail,
        category: activeCategory,
        createdAt: new Date().toISOString()
      });
      setSubmitSuccess(true);
      setNotifyEmail('');
      setTimeout(() => {
        setIsNotifyModalOpen(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 md:py-24">
      <SEO 
        title={t('seo.assets.title')}
        description={t('seo.assets.desc')}
        canonical="https://coshare.ai/assets"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#0b1b34] mb-2">{t('nav.assets')}</h1>
            <p className="text-sm sm:text-base text-gray-600">{t('assets.subtitle')}</p>
          </div>
          
          <div className="w-full md:w-auto flex items-center space-x-3">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('assets.search')}
                className="w-full md:w-64 pl-11 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#256ab1] bg-white shadow-sm"
              />
            </div>
            <button className="p-3 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="relative mb-8 sm:mb-12">
          <div className="flex overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => { setActiveCategory('All'); setActiveSubcategory('All'); }}
              className={`flex-shrink-0 flex items-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-sm ${
                activeCategory === 'All' ? 'bg-[#0b1b34] text-white' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              {t('assets.filter.all')}
            </button>
            {[
              { id: 'Cars', icon: Car, label: t('assets.filter.cars') },
              { id: 'Motorbikes', icon: Bike, label: t('assets.filter.motorbikes') },
              { id: 'Yachts', icon: Ship, label: t('assets.filter.yachts') },
              { id: 'Others', icon: Filter, label: t('assets.filter.others') }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id as AssetCategory); setActiveSubcategory('All'); }}
                className={`flex-shrink-0 flex items-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-sm ${
                  activeCategory === cat.id ? 'bg-[#0b1b34] text-white' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.label}
              </button>
            ))}
          </div>
          {/* Mobile Scroll Indicator Gradient */}
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none md:hidden" />
        </div>

        {activeCategory !== 'All' && activeCategory !== 'Yachts' && (
          <div className="flex overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap gap-3 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveSubcategory('All')}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSubcategory === 'All' ? 'bg-[#256ab1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All {activeCategory}
            </button>
            {subcategories
              .filter(sub => assets.find(a => a.subcategory === sub && a.category === activeCategory))
              .map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub as AssetSubcategory)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeSubcategory === sub ? 'bg-[#256ab1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
          </div>
        )}

        {/* Yachts Coming Soon Banner */}
        {activeCategory === 'Yachts' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-12 group"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=2000" 
                alt="Sailing boat with Dubai skyline"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b1b34] via-[#0b1b34]/60 to-transparent opacity-90" />
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 mb-6">
                Coming Soon
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 max-w-3xl">
                The Ultimate UAE Experience.
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
                Co-own a boat with your friends, family, or partners and sail into adventure. Coming soon.
              </p>
              <button 
                onClick={() => setIsNotifyModalOpen(true)}
                className="px-8 py-4 bg-white text-[#0b1b34] rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
              >
                Join Yacht Waitlist
              </button>
            </div>
          </motion.div>
        )}

        {/* Asset Grid */}
        {activeCategory !== 'Yachts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => navigate(`/assets/${asset.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10" />
                <img
                  src={asset.imageUrl}
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-5 left-5 z-20 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                  {asset.subcategory}
                </div>
                {asset.availableShares === 0 && (
                  <div className="absolute top-5 right-5 z-20 bg-red-500/80 backdrop-blur-md border border-red-400/50 px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                    {t('asset.soldOut')}
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-[#0b1b34] mb-2">{asset.name}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{asset.description}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('asset.pricePerShare')}</p>
                    <p className="text-lg font-bold text-[#256ab1]">{formatCurrency(asset.pricePerShare, lang)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('asset.available')}</p>
                    <p className="text-sm font-medium text-[#0b1b34]">{asset.availableShares} / {asset.totalShares}</p>
                  </div>
                </div>
                
                {/* Scarcity Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Availability</span>
                    <span className="text-[10px] font-bold text-[#256ab1] uppercase tracking-wider">
                      {Math.round(((asset.totalShares - asset.availableShares) / asset.totalShares) * 100)}% Sold
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 relative overflow-hidden">
                    <motion.div 
                      className="bg-[#256ab1] h-1.5 rounded-full relative z-10" 
                      initial={{ width: 0 }}
                      animate={{ width: `${((asset.totalShares - asset.availableShares) / asset.totalShares) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    {asset.availableShares <= 2 && asset.availableShares > 0 && (
                      <motion.div 
                        className="absolute inset-0 bg-red-400/30 z-0"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  {asset.availableShares <= 2 && asset.availableShares > 0 && (
                    <p className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-widest animate-pulse">
                      Only {asset.availableShares} shares left
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {filteredAssets.length === 0 && activeCategory !== 'Yachts' && (
          <div className="text-center py-24">
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t('assets.empty')}</h3>
            <p className="text-gray-500">{t('assets.empty.desc')}</p>
          </div>
        )}
      </div>

      {/* Notify Me Modal */}
      <AnimatePresence>
        {isNotifyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotifyModalOpen(false)}
              className="absolute inset-0 bg-[#0b1b34]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsNotifyModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#0b1b34] mb-2">{t('assets.notify.success')}</h3>
                  <p className="text-gray-600">
                    We'll notify you as soon as new {activeCategory} opportunities become available.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-[#0b1b34] mb-2">{t('assets.notify.title')}</h3>
                    <p className="text-gray-600">
                      {t('assets.notify.desc')}
                    </p>
                  </div>

                  <form onSubmit={handleNotifySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                        {t('assets.notify.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#256ab1] transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0b1b34]/20"
                    >
                      {isSubmitting ? t('assets.notify.joining') : t('assets.notify.join')}
                    </button>
                  </form>
                  <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest">
                    {t('assets.notify.spam')}
                  </p>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
