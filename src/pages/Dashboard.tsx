import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { ASSETS } from '../data/assets';
import { motion } from 'motion/react';
import { PieChart, Wallet, Car, TrendingUp, ChevronRight } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';
import { VaultAssetDetails } from '../components/VaultAssetDetails';
import { AnimatePresence } from 'motion/react';

interface PortfolioItem {
  id: string;
  assetId: string;
  shares: number;
  purchasePrice: number;
}

export const Dashboard = () => {
  const { user, isAuthReady } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssetForDetails, setSelectedAssetForDetails] = useState<any>(null);

  useEffect(() => {
    if (!isAuthReady || !user) {
      setLoading(false);
      return;
    }

    // Handle Demo User
    if (user.uid === 'demo-user-123') {
      const mockPortfolio: PortfolioItem[] = [
        {
          id: 'demo-p1',
          assetId: 'car-super-1',
          shares: 1,
          purchasePrice: 125000,
        },
        {
          id: 'demo-p2',
          assetId: 'car-desert-2',
          shares: 2,
          purchasePrice: 70000,
        }
      ];
      setPortfolio(mockPortfolio);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'portfolio'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: PortfolioItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      setPortfolio(items);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'portfolio');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, isAuthReady]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-[#0b1b34] mb-2">Access Denied</h2>
          <p className="text-gray-600">Please sign in to view your Vault.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-8 h-8 border-4 border-[#256ab1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const portfolioAssets = portfolio.map(p => {
    const asset = ASSETS.find(a => a.id === p.assetId);
    return {
      ...asset,
      sharesOwned: p.shares,
      totalValue: p.purchasePrice
    };
  }).filter(a => a.id !== undefined);

  const totalValue = portfolioAssets.reduce((sum, a) => sum + a.totalValue, 0);
  const totalAssets = portfolioAssets.length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-[#0b1b34]">The Vault</h1>
          <p className="text-gray-600 mt-1 text-lg">Your exclusive co-owner portfolio and asset management dashboard.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#0b1b34]/5 rounded-2xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#256ab1]" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Equity Value</p>
            <h2 className="text-3xl font-display font-bold text-[#0b1b34]">AED {totalValue.toLocaleString()}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#0b1b34]/5 rounded-2xl flex items-center justify-center">
                <Car className="w-6 h-6 text-[#256ab1]" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Assets Owned</p>
            <h2 className="text-3xl font-display font-bold text-[#0b1b34]">{totalAssets}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#0b1b34]/5 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#256ab1]" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">Est. Annual</span>
            </div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Projected Yield</p>
            <h2 className="text-3xl font-display font-bold text-[#0b1b34]">AED {(totalValue * 0.08).toLocaleString()}</h2>
          </motion.div>
        </div>

        {/* Portfolio List */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-[#0b1b34] mb-6">Your Holdings</h2>
          {portfolioAssets.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
              <p className="text-gray-500 mb-4">You don't own any assets yet.</p>
              <button onClick={() => window.location.href = '/assets'} className="px-6 py-2 bg-[#0b1b34] text-white rounded-full font-medium hover:bg-[#0b1b34]/90 transition-colors">
                Explore Assets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolioAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row group cursor-pointer hover:shadow-xl hover:border-primary/20 transition-all duration-500"
                  onClick={() => setSelectedAssetForDetails(asset)}
                >
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                    <img
                      src={asset.imageUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#0b1b34] uppercase tracking-wider">
                      {asset.sharesOwned}/{asset.totalShares} Shares
                    </div>
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#0b1b34] leading-tight">{asset.name}</h3>
                        <span className="text-xs font-medium text-[#256ab1] bg-[#49bee4]/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                          {asset.subcategory}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{asset.specs?.location}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Equity Value</p>
                          <p className="text-xl font-bold text-[#0b1b34]">AED {asset.totalValue.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/booking?assetId=${asset.id}`;
                          }} 
                          className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center group/btn"
                        >
                          Book Days
                          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedAssetForDetails && (
          <VaultAssetDetails 
            asset={selectedAssetForDetails} 
            onClose={() => setSelectedAssetForDetails(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
