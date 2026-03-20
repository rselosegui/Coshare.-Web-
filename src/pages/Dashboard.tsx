import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { ASSETS } from '../data/assets';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Wallet, Car, TrendingUp, ChevronRight, ShoppingBag, Tag, ArrowUpRight, BarChart3, Info, X } from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';
import { VaultAssetDetails } from '../components/VaultAssetDetails';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface PortfolioItem {
  id: string;
  assetId: string;
  shares: number;
  purchasePrice: number;
}

interface MarketplaceListing {
  id: string;
  assetId: string;
  sellerId: string;
  sellerName: string;
  shares: number;
  pricePerShare: number;
  createdAt: any;
}

const PERFORMANCE_DATA = [
  { month: 'Oct', value: 1200000 },
  { month: 'Nov', value: 1250000 },
  { month: 'Dec', value: 1220000 },
  { month: 'Jan', value: 1350000 },
  { month: 'Feb', value: 1420000 },
  { month: 'Mar', value: 1580000 },
];

const YIELD_DATA = [
  { name: 'Supercars', value: 65, color: '#0b1b34' },
  { name: 'Yachts', value: 35, color: '#256ab1' },
];

export const Dashboard = () => {
  const { user, isAuthReady } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssetForDetails, setSelectedAssetForDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'holdings' | 'analytics' | 'marketplace'>('holdings');
  const [isListing, setIsListing] = useState(false);
  const [listingAsset, setListingAsset] = useState<any>(null);
  const [listingPrice, setListingPrice] = useState('');
  const [listingShares, setListingShares] = useState(1);

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
      
      const mockListings: MarketplaceListing[] = [
        {
          id: 'm1',
          assetId: 'car-desert-1',
          sellerId: 'other-user',
          sellerName: 'Ahmed R.',
          shares: 1,
          pricePerShare: 85000,
          createdAt: { toDate: () => new Date() }
        }
      ];
      setListings(mockListings);
      setLoading(false);
      return;
    }

    // Portfolio Subscription
    const qPortfolio = query(collection(db, 'portfolio'), where('userId', '==', user.uid));
    const unsubscribePortfolio = onSnapshot(qPortfolio, (snapshot) => {
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

    // Marketplace Subscription
    const qMarketplace = query(collection(db, 'marketplace'));
    const unsubscribeMarketplace = onSnapshot(qMarketplace, (snapshot) => {
      const items: MarketplaceListing[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MarketplaceListing);
      });
      setListings(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'marketplace');
    });

    return () => {
      unsubscribePortfolio();
      unsubscribeMarketplace();
    };
  }, [user, isAuthReady]);

  const handleListForResale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !listingAsset || !listingPrice) return;

    setIsListing(true);
    try {
      await addDoc(collection(db, 'marketplace'), {
        assetId: listingAsset.id,
        sellerId: user.uid,
        sellerName: user.displayName || user.email?.split('@')[0] || 'Co-owner',
        shares: listingShares,
        pricePerShare: parseFloat(listingPrice),
        createdAt: serverTimestamp()
      });
      setListingAsset(null);
      setListingPrice('');
      setListingShares(1);
      setActiveTab('marketplace');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'marketplace');
    } finally {
      setIsListing(false);
    }
  };

  const handleBuyFromMarketplace = async (listing: MarketplaceListing) => {
    if (!user) return;
    // In a real app, this would trigger a payment flow and transfer shares
    alert(`Initiating purchase of ${listing.shares} share(s) from ${listing.sellerName} for AED ${listing.pricePerShare.toLocaleString()}`);
  };

  const handleCancelListing = async (listingId: string) => {
    try {
      await deleteDoc(doc(db, 'marketplace', listingId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'marketplace');
    }
  };

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
      <SEO 
        title="Dashboard | Coshare Portfolio"
        description="Manage your fractional ownership portfolio, track asset performance, and trade shares on the Coshare marketplace."
        canonical="https://coshare.ae/dashboard"
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#0b1b34]">The Vault</h1>
            <p className="text-gray-600 mt-1 text-lg">Your exclusive co-owner portfolio and asset management dashboard.</p>
          </div>
          
          <div className="flex bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-sm">
            {[
              { id: 'holdings', label: 'Holdings', icon: Wallet },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#0b1b34] text-white shadow-lg' 
                    : 'text-gray-500 hover:text-[#0b1b34] hover:bg-white/50'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid - Glassmorphic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-xl shadow-blue-500/5 group"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#0b1b34] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-full flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12.5%
              </span>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Equity Value</p>
            <h2 className="text-3xl font-display font-bold text-[#0b1b34]">AED {totalValue.toLocaleString()}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-xl shadow-blue-500/5 group"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#256ab1] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Assets Owned</p>
            <h2 className="text-3xl font-display font-bold text-[#0b1b34]">{totalAssets}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-xl shadow-blue-500/5 group"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#49bee4] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-500/10 px-3 py-1 rounded-full">Est. Annual</span>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Projected Yield</p>
            <h2 className="text-3xl font-display font-bold text-[#0b1b34]">AED {(totalValue * 0.08).toLocaleString()}</h2>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'holdings' && (
            <motion.div
              key="holdings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-display font-bold text-[#0b1b34] mb-6">Your Holdings</h2>
              {portfolioAssets.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 mb-6 text-lg">You don't own any assets yet.</p>
                  <button onClick={() => window.location.href = '/assets'} className="px-8 py-3 bg-[#0b1b34] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#0b1b34]/90 transition-all hover:scale-105 active:scale-95">
                    Explore Assets
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {portfolioAssets.map((asset, index) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row group cursor-pointer hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                      onClick={() => setSelectedAssetForDetails(asset)}
                    >
                      <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                        <img
                          src={asset.imageUrl}
                          alt={asset.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-bold text-[#0b1b34] uppercase tracking-widest shadow-sm">
                          {asset.sharesOwned}/{asset.totalShares} Shares
                        </div>
                      </div>
                      <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-[#0b1b34] leading-tight group-hover:text-primary transition-colors">{asset.name}</h3>
                            <span className="text-[10px] font-bold text-[#256ab1] bg-[#49bee4]/10 px-2.5 py-1 rounded-full whitespace-nowrap ml-2 uppercase tracking-widest">
                              {asset.subcategory}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-4 font-medium">{asset.specs?.location}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-50 mt-auto">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Equity Value</p>
                              <p className="text-xl font-bold text-[#0b1b34]">AED {asset.totalValue.toLocaleString()}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setListingAsset(asset);
                                }} 
                                className="p-2.5 bg-accent/10 hover:bg-accent text-primary rounded-xl transition-all active:scale-90 shadow-sm"
                                title="List for Resale"
                              >
                                <Tag className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.location.href = `/booking?assetId=${asset.id}`;
                                }} 
                                className="px-5 py-2.5 bg-[#0b1b34] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#0b1b34]/90 active:scale-95 shadow-lg shadow-blue-900/10 flex items-center"
                              >
                                Book
                                <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Chart */}
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-xl shadow-blue-500/5">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-display font-bold text-[#0b1b34]">Portfolio Growth</h3>
                      <p className="text-xs text-gray-500 font-medium">Historical equity value performance</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Equity</span>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PERFORMANCE_DATA}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0b1b34" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0b1b34" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 600, fill: '#9ca3af' }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 600, fill: '#9ca3af' }}
                          tickFormatter={(value) => `AED ${value / 1000000}M`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(10px)'
                          }}
                          labelStyle={{ fontWeight: 'bold', color: '#0b1b34' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0b1b34" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Yield Distribution */}
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-xl shadow-blue-500/5">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-display font-bold text-[#0b1b34]">Asset Allocation</h3>
                      <p className="text-xs text-gray-500 font-medium">Distribution by category</p>
                    </div>
                  </div>
                  <div className="h-[300px] w-full flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={YIELD_DATA} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 12, fontWeight: 700, fill: '#0b1b34' }}
                          width={100}
                        />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                          {YIELD_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {YIELD_DATA.map((item) => (
                      <div key={item.name} className="text-center">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{item.name}</p>
                        <p className="text-lg font-bold text-[#0b1b34]">{item.value}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights Section */}
              <div className="bg-[#0b1b34] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-accent/20">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">Vault Insight: High Yield Opportunity</h3>
                    <p className="text-white/70 text-sm max-w-2xl">
                      Your current portfolio is heavily weighted in Supercars. Based on market trends in Dubai, 
                      diversifying into Yachts could increase your overall projected yield by 2.4% annually.
                    </p>
                  </div>
                  <button className="ml-auto px-6 py-3 bg-white text-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent transition-colors whitespace-nowrap">
                    View Recommendations
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-[#0b1b34]">Secondary Marketplace</h2>
                  <p className="text-sm text-gray-500">Trade shares directly with other co-owners.</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#256ab1] bg-[#256ab1]/5 px-4 py-2 rounded-full border border-[#256ab1]/10">
                  <Info className="w-3.5 h-3.5" />
                  <span>2.5% Transaction Fee applies</span>
                </div>
              </div>

              {listings.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 mb-2 text-lg">No active listings in the marketplace.</p>
                  <p className="text-sm text-gray-400 mb-6">Be the first to list a share for resale!</p>
                  <button onClick={() => setActiveTab('holdings')} className="px-8 py-3 bg-[#0b1b34] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#0b1b34]/90 transition-all">
                    View My Holdings
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => {
                    const asset = ASSETS.find(a => a.id === listing.assetId);
                    if (!asset) return null;
                    const isOwnListing = listing.sellerId === user.uid;

                    return (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300"
                      >
                        <div className="h-40 relative">
                          <img 
                            src={asset.imageUrl} 
                            alt={asset.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <p className="text-white font-bold text-sm leading-tight">{asset.name}</p>
                            <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">{asset.subcategory}</p>
                          </div>
                          {isOwnListing && (
                            <div className="absolute top-4 right-4 bg-accent text-primary px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg">
                              Your Listing
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-center mb-6">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Price per Share</p>
                              <p className="text-xl font-bold text-[#0b1b34]">AED {listing.pricePerShare.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Shares</p>
                              <p className="text-xl font-bold text-[#0b1b34]">{listing.shares}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-2xl">
                            <div className="w-8 h-8 bg-[#0b1b34]/5 rounded-full flex items-center justify-center">
                              <Tag className="w-4 h-4 text-[#256ab1]" />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Seller</p>
                              <p className="text-xs font-bold text-[#0b1b34]">{listing.sellerName}</p>
                            </div>
                          </div>

                          <div className="mt-auto">
                            {isOwnListing ? (
                              <button 
                                onClick={() => handleCancelListing(listing.id)}
                                className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95"
                              >
                                Cancel Listing
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleBuyFromMarketplace(listing)}
                                className="w-full py-3 bg-[#0b1b34] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#0b1b34]/90 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                              >
                                Buy Shares
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* List for Resale Modal */}
      <AnimatePresence>
        {listingAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Tag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-[#0b1b34]">List for Resale</h3>
                    <p className="text-xs text-gray-500 font-medium">Secondary Marketplace</p>
                  </div>
                </div>
                <button onClick={() => setListingAsset(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <img src={listingAsset.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-bold text-[#0b1b34]">{listingAsset.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{listingAsset.sharesOwned} Shares Owned</p>
                </div>
              </div>

              <form onSubmit={handleListForResale} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Number of Shares to Sell</label>
                  <div className="flex items-center space-x-4">
                    <button 
                      type="button"
                      onClick={() => setListingShares(Math.max(1, listingShares - 1))}
                      className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl font-bold"
                    >
                      -
                    </button>
                    <div className="flex-1 h-12 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-lg">
                      {listingShares}
                    </div>
                    <button 
                      type="button"
                      onClick={() => setListingShares(Math.min(listingAsset.sharesOwned, listingShares + 1))}
                      className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Price per Share (AED)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={listingPrice}
                      onChange={(e) => setListingPrice(e.target.value)}
                      placeholder="e.g. 135000"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">AED</div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 italic">Recommended price: AED {(listingAsset.totalValue / listingAsset.sharesOwned).toLocaleString()}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-500">Total Listing Value</span>
                    <span className="text-[#0b1b34]">AED {(parseFloat(listingPrice || '0') * listingShares).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500">Est. Service Fee (2.5%)</span>
                    <span className="text-red-500">- AED {(parseFloat(listingPrice || '0') * listingShares * 0.025).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isListing}
                  className="w-full py-4 bg-[#0b1b34] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#0b1b34]/90 transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center active:scale-95"
                >
                  {isListing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Confirm Listing'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

