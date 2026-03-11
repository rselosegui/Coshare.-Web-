import React, { useState } from 'react';
import { ASSETS, AssetCategory, AssetSubcategory } from '../data/assets';
import { useLanguage } from '../store/language';
import { motion } from 'motion/react';
import { Filter, Search, Home, Ship, Car, Watch, LayoutGrid } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Assets = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<AssetCategory | 'All'>('All');
  const [activeSubcategory, setActiveSubcategory] = useState<AssetSubcategory | 'All'>('All');

  const filteredAssets = ASSETS.filter(asset => {
    if (activeCategory !== 'All' && asset.category !== activeCategory) return false;
    if (activeSubcategory !== 'All' && asset.subcategory !== activeSubcategory) return false;
    return true;
  });

  const subcategories = Array.from(new Set(ASSETS.map(a => a.subcategory)));

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-[#0b1b34] mb-2">{t('nav.assets')}</h1>
            <p className="text-gray-600">Discover premium fractional ownership opportunities in the UAE.</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assets..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#256ab1] bg-white"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => { setActiveCategory('All'); setActiveSubcategory('All'); }}
            className={`flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${
              activeCategory === 'All' ? 'bg-[#0b1b34] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            All Assets
          </button>
          {[
            { id: 'Real Estate', icon: Home, label: 'Real Estate' },
            { id: 'Yachts', icon: Ship, label: 'Yachts' },
            { id: 'Cars', icon: Car, label: 'Supercars' },
            { id: 'Watches', icon: Watch, label: 'Watches' },
            { id: 'Others', icon: Filter, label: 'Others' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id as AssetCategory); setActiveSubcategory('All'); }}
              className={`flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${
                activeCategory === cat.id ? 'bg-[#0b1b34] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <cat.icon className="w-4 h-4 mr-2" />
              {cat.label}
            </button>
          ))}
        </div>

        {activeCategory !== 'All' && (
          <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveSubcategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSubcategory === 'All' ? 'bg-[#256ab1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All {activeCategory}
            </button>
            {subcategories
              .filter(sub => ASSETS.find(a => a.subcategory === sub && a.category === activeCategory))
              .map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub as AssetSubcategory)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeSubcategory === sub ? 'bg-[#256ab1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
          </div>
        )}

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => navigate(`/assets/${asset.id}`)}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-pointer flex flex-col"
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
                    <p className="text-lg font-bold text-[#256ab1]">AED {asset.pricePerShare.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('asset.available')}</p>
                    <p className="text-sm font-medium text-[#0b1b34]">{asset.availableShares} / {asset.totalShares}</p>
                  </div>
                </div>
                
                {/* Scarcity Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden">
                    <div 
                      className="bg-[#256ab1] h-1.5 rounded-full" 
                      style={{ width: `${((asset.totalShares - asset.availableShares) / asset.totalShares) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right uppercase tracking-wider">
                    {Math.round(((asset.totalShares - asset.availableShares) / asset.totalShares) * 100)}% Sold
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No assets found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};
