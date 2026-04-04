import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { formatCurrency } from '../lib/format';
import { useAuth } from '../store/auth';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { ArrowLeft, Share, Heart, MapPin, Calendar, Shield, Info, Calculator, CheckCircle, FileText, Lock, UserCheck, CreditCard, X, Apple, TrendingUp, Wrench, Play, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '../components/PaymentForm';
import { useAssets } from '../hooks/useAssets';

// Initialize Stripe outside of component to avoid recreating the object
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy');

export const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { assets, loading } = useAssets();
  const asset = assets.find(a => a.id === id);
  const [selectedShares, setSelectedShares] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: KYC, 2: Legal, 3: Payment
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<string>('unverified');
  const [isKycLoading, setIsKycLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    const fetchKycStatus = async () => {
      if (user && user.uid !== 'demo-user-123') {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setKycStatus(userDoc.data().kycStatus || 'unverified');
          }
        } catch (error) {
          console.error("Error fetching KYC status", error);
        }
      }
    };
    fetchKycStatus();
  }, [user]);

  useEffect(() => {
    if (checkoutStep === 3 && asset && !clientSecret) {
      // Fetch client secret when entering payment step
      const fetchPaymentIntent = async () => {
        try {
          const finalAmount = Math.max(0, (asset.pricePerShare * selectedShares) - discountAmount);
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: finalAmount,
              assetId: asset.id,
              shares: selectedShares,
              promoCode: isPromoApplied ? promoCode : undefined
            }),
          });
          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        } catch (error) {
          console.error('Failed to create payment intent:', error);
        }
      };
      
      // Don't fetch for demo user to avoid errors if backend isn't fully set up
      if (user?.uid !== 'demo-user-123') {
        fetchPaymentIntent();
      }
    }
  }, [checkoutStep, asset, selectedShares, clientSecret, user, discountAmount, isPromoApplied, promoCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-8 h-8 border-4 border-[#256ab1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa]">
        <h2 className="text-2xl font-bold text-[#0b1b34] mb-4">{t('asset.notFound.title')}</h2>
        <button onClick={() => navigate('/assets')} className="text-[#256ab1] hover:underline">
          {t('asset.notFound.return')}
        </button>
      </div>
    );
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": asset.name,
    "image": asset.imageUrl,
    "description": asset.description,
    "brand": {
      "@type": "Brand",
      "name": "Coshare"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://coshare.ai/assets/${asset.id}`,
      "priceCurrency": "AED",
      "price": asset.pricePerShare,
      "availability": "https://schema.org/InStock"
    }
  };

  const handleStartPurchase = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckoutModal(true);
    setCheckoutStep(1);
  };

  const handleKycSubmit = async () => {
    if (user?.uid === 'demo-user-123') {
      setCheckoutStep(2);
      return;
    }

    setIsKycLoading(true);
    try {
      // In a real app, this would integrate with Sumsub/Jumio
      // For MVP, we simulate verification success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await updateDoc(doc(db, 'users', user!.uid), {
        kycStatus: 'verified'
      });
      setKycStatus('verified');
      setCheckoutStep(2);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user?.uid}`);
    } finally {
      setIsKycLoading(false);
    }
  };

  const handleAgreementSign = async () => {
    if (user?.uid === 'demo-user-123') {
      setCheckoutStep(3);
      return;
    }

    try {
      const now = new Date().toISOString();
      await addDoc(collection(db, 'agreements'), {
        userId: user!.uid,
        assetId: asset!.id,
        signatureData: 'simulated_signature_hash_' + Date.now(),
        ipAddress: '192.168.1.1', // Simulated
        signedAt: now
      });
      setCheckoutStep(3);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'agreements');
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    let discount = 0;
    if (promoCode.toUpperCase() === 'WELCOME10') {
      discount = (asset!.pricePerShare * selectedShares) * 0.10;
    } else if (promoCode.toUpperCase().startsWith('REF-')) {
      discount = 500;
    } else {
      setPromoError(t('asset.checkout.promoInvalid'));
      setIsPromoApplied(false);
      setDiscountAmount(0);
      return;
    }
    
    setDiscountAmount(discount);
    setIsPromoApplied(true);
    setPromoError('');
    setClientSecret(null); // Force re-fetch of payment intent
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!asset) return;

    setIsPurchasing(true);
    try {
      const now = new Date().toISOString();
      const totalPrice = asset.pricePerShare * selectedShares;

      // Handle Demo User
      if (user.uid === 'demo-user-123') {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPurchaseSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        return;
      }

      // Add to transactions
      await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        assetId: asset.id,
        shares: selectedShares,
        amount: totalPrice,
        status: 'completed',
        createdAt: now
      });

      // Add to portfolio
      await addDoc(collection(db, 'portfolio'), {
        userId: user.uid,
        assetId: asset.id,
        shares: selectedShares,
        purchasePrice: totalPrice,
        acquiredAt: now
      });

      // Update available shares
      const assetRef = doc(db, 'assets', asset.id);
      await updateDoc(assetRef, {
        availableShares: asset.availableShares - selectedShares
      });

      setPurchaseSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'transactions/portfolio');
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      <SEO 
        title={`${asset.name} | Coshare`}
        description={asset.description}
        image={asset.imageUrl}
        type="product"
        canonical={`https://coshare.ai/assets/${asset.id}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img
          src={asset.imageUrl}
          alt={asset.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34]/80 via-transparent to-transparent" />
        
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-6 right-4 sm:right-6 lg:right-8 z-10 flex space-x-3">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
            <Share className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider mb-3">
            {asset.subcategory}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
            {asset.name}
          </h1>
          <div className="flex items-center text-gray-200 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {asset.specs?.location || 'Miami, USA'}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0b1b34] mb-4">{t('asset.details.about')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {asset.description}
              </p>
              
              <h3 className="text-lg font-bold text-[#0b1b34] mb-4">{t('asset.details.specs')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {asset.specs && Object.entries(asset.specs).map(([key, value]) => (
                  <div key={key} className="bg-[#f8f9fa] p-4 rounded-2xl">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{key}</p>
                    <p className="font-medium text-[#0b1b34] capitalize">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-[#256ab1] mr-3" />
                <h2 className="text-2xl font-bold text-[#0b1b34]">{t('asset.legal.title')}</h2>
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 mb-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t('asset.legal.desc')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                    <FileText className="w-5 h-5 text-[#256ab1] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{t('asset.legal.entityType')}</p>
                      <p className="text-sm font-bold text-[#0b1b34]">{t('asset.legal.entityValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                    <Lock className="w-5 h-5 text-[#256ab1] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{t('asset.legal.status')}</p>
                      <p className="text-sm font-bold text-[#0b1b34]">{t('asset.legal.statusValue')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-[#0b1b34] uppercase tracking-wider mb-4">{t('asset.checkout.legal')}</h3>
              <div className="space-y-3">
                {[t('asset.checkout.agreement'), t('asset.legal.doc2'), t('asset.legal.doc3')].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#49bee4]/50 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#256ab1] mr-3 transition-colors" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#0b1b34]">{doc}</span>
                    </div>
                    <span className="text-xs font-bold text-[#256ab1] opacity-0 group-hover:opacity-100 transition-opacity">{t('asset.checkout.continue')}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0b1b34] mb-6">{t('asset.benefits.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#49bee4]/10 flex items-center justify-center mr-4 shrink-0">
                    <Calendar className="w-5 h-5 text-[#256ab1]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b1b34]">{t('asset.benefits.usage')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('asset.benefits.usage.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#49bee4]/10 flex items-center justify-center mr-4 shrink-0">
                    <Shield className="w-5 h-5 text-[#256ab1]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b1b34]">{t('asset.benefits.concierge')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('asset.benefits.concierge.desc')}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{t('asset.pricePerShare')}</p>
                <div className="flex items-end">
                  <h2 className="text-4xl font-display font-bold text-[#0b1b34]">{formatCurrency(asset.pricePerShare, lang)}</h2>
                </div>
              </div>

              {/* Dynamic Calculator / Usage Simulator */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6 mb-8 border border-gray-100 shadow-inner">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-[#0b1b34]">
                    <Calculator className="w-5 h-5 mr-2 text-[#256ab1]" />
                    <h3 className="font-bold text-lg">{t('asset.calculator.title')}</h3>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-[#256ab1] uppercase tracking-widest">Live Simulator</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px]">{t('asset.calculator.shares')}</span>
                    <span className="font-bold text-[#0b1b34] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">{selectedShares} / {asset.availableShares}</span>
                  </div>
                  <div className="relative h-6 flex items-center">
                    <input 
                      type="range" 
                      min="1" 
                      max={asset.availableShares || 1} 
                      value={selectedShares}
                      onChange={(e) => setSelectedShares(parseInt(e.target.value))}
                      disabled={asset.availableShares === 0}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#256ab1] relative z-10"
                    />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#256ab1]/20 rounded-lg" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{t('asset.benefits.usage')}</span>
                    </div>
                    <p className="text-lg font-bold text-[#0b1b34]">{Math.round((365 / asset.totalShares) * selectedShares)} <span className="text-xs font-medium text-gray-400">days</span></p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center text-gray-400 mb-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Appreciation</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-600">~8.5% <span className="text-xs font-medium text-gray-400">p.a.</span></p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Wrench className="w-3 h-3 mr-1" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Maint.</span>
                    </div>
                    <p className="text-lg font-bold text-[#0b1b34]">{formatCurrency(Math.round((asset.pricePerShare * 0.02) * selectedShares), lang)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center text-gray-400 mb-1">
                      <Shield className="w-3 h-3 mr-1" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{t('asset.share')}</span>
                    </div>
                    <p className="text-lg font-bold text-[#256ab1]">{((selectedShares / asset.totalShares) * 100).toFixed(1)}%</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0b1b34] uppercase tracking-widest text-[10px]">{t('asset.calculator.total')}</span>
                    <span className="text-2xl font-bold text-[#256ab1]">{formatCurrency(asset.pricePerShare * selectedShares, lang)}</span>
                  </div>
                </div>
              </div>

              <button 
                disabled={asset.availableShares === 0 || isPurchasing || purchaseSuccess}
                onClick={handleStartPurchase}
                className="w-full py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mb-4 shadow-lg shadow-[#0b1b34]/20 flex justify-center items-center"
              >
                {asset.availableShares === 0 ? (
                  t('asset.soldOut')
                ) : (
                  `${t('asset.acquire')} (${selectedShares})`
                )}
              </button>
              
              <div className="flex items-start text-xs text-gray-500 mt-4">
                <Info className="w-4 h-4 mr-2 shrink-0" />
                <p>By proceeding, you agree to our cosharing terms and conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0b1b34]/80 backdrop-blur-sm" onClick={() => !isPurchasing && !purchaseSuccess && setShowCheckoutModal(false)} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-display font-bold text-[#0b1b34]">{t('asset.checkout.title')}</h3>
              {!isPurchasing && !purchaseSuccess && (
                <button onClick={() => setShowCheckoutModal(false)} className="p-2 text-gray-400 hover:text-[#0b1b34] rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {/* Progress Steps */}
              <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-100 -z-10" />
                <div className="absolute left-0 top-1/2 h-0.5 bg-[#256ab1] -z-10 transition-all duration-500" style={{ width: `${((checkoutStep - 1) / 2) * 100}%` }} />
                
                {[
                  { step: 1, icon: UserCheck, label: t('asset.checkout.identity') },
                  { step: 2, icon: FileText, label: t('asset.checkout.legal') },
                  { step: 3, icon: CreditCard, label: t('asset.checkout.payment') }
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center bg-white px-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${checkoutStep >= s.step ? 'bg-[#256ab1] border-[#256ab1] text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${checkoutStep >= s.step ? 'text-[#0b1b34]' : 'text-gray-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Step 1: KYC */}
              {checkoutStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-[#0b1b34] mb-2">{t('asset.checkout.verify')}</h4>
                    <p className="text-gray-600 text-sm">{t('asset.checkout.verifyDesc')}</p>
                  </div>
                  
                  <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 text-center border-dashed">
                    <UserCheck className={`w-12 h-12 mx-auto mb-4 ${kycStatus === 'verified' ? 'text-green-500' : 'text-[#256ab1] opacity-50'}`} />
                    <p className="text-sm font-medium text-[#0b1b34] mb-1">
                      {kycStatus === 'verified' ? t('asset.checkout.verified') : t('asset.checkout.verify')}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {kycStatus === 'verified' ? t('asset.checkout.verifiedDesc') : t('asset.checkout.uploadDesc')}
                    </p>
                    {kycStatus !== 'verified' && (
                      <button 
                        onClick={handleKycSubmit}
                        disabled={isKycLoading}
                        className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#0b1b34] hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-sm"
                      >
                        {isKycLoading ? 'Verifying...' : 'Start Verification'}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center p-4 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium">
                    <Shield className="w-4 h-4 mr-2 shrink-0" />
                    {t('asset.checkout.secureData')}
                  </div>

                  <button 
                    onClick={() => setCheckoutStep(2)} 
                    disabled={kycStatus !== 'verified' && user?.uid !== 'demo-user-123'}
                    className="w-full py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-[#0b1b34]/20"
                  >
                    {t('asset.checkout.continueLegal')}
                  </button>
                </motion.div>
              )}

              {/* Step 2: Legal */}
              {checkoutStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-[#0b1b34] mb-2">{t('asset.checkout.agreement')}</h4>
                    <p className="text-gray-600 text-sm">{t('asset.checkout.reviewSign')}</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-48 overflow-y-auto text-xs text-gray-600 space-y-4">
                    <p className="font-bold text-[#0b1b34] text-sm mb-2">MEMBERSHIP INTEREST PURCHASE AGREEMENT</p>
                    <p>This Co-Ownership Agreement (this "Agreement") is entered into as of today, by and between Coshare (the "Manager") and the undersigned investor (the "Cosharer").</p>
                    <p>WHEREAS, the Company owns the asset described as {asset.name};</p>
                    <p>WHEREAS, the Purchaser desires to purchase {selectedShares} membership interests (the "Shares") in the Company at a price of {formatCurrency(asset.pricePerShare, lang)} per Share, for a total purchase price of {formatCurrency(asset.pricePerShare * selectedShares, lang)};</p>
                    <p>NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows...</p>
                    <p className="italic">[Simulated Document Content]</p>
                  </div>
                  
                  <label className="flex items-start space-x-3 cursor-pointer p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#256ab1] rounded border-gray-300 focus:ring-[#256ab1]" />
                    <span className="text-sm text-gray-700 font-medium">{t('asset.checkout.agree')}</span>
                  </label>

                  <div className="flex space-x-4">
                    <button onClick={() => setCheckoutStep(1)} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-sm">
                      {t('asset.checkout.back')}
                    </button>
                    <button onClick={handleAgreementSign} className="w-2/3 py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0b1b34]/20">
                      {t('asset.checkout.signContinue')}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {checkoutStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-[#0b1b34] mb-2">{t('asset.checkout.pay')}</h4>
                    <p className="text-gray-600 text-sm">You are acquiring {selectedShares} shares of {asset.name}.</p>
                  </div>
                  
                  <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">{t('asset.checkout.subtotal')}</span>
                      <span className="text-lg font-bold text-[#0b1b34]">{formatCurrency(asset.pricePerShare * selectedShares, lang)}</span>
                    </div>
                    
                    {isPromoApplied && (
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 text-green-600">
                        <span className="font-medium">{t('asset.checkout.discount')} ({promoCode.toUpperCase()})</span>
                        <span className="font-bold">- {formatCurrency(discountAmount, lang)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-800 font-bold text-lg">{t('asset.checkout.total')}</span>
                      <span className="text-2xl font-bold text-[#0b1b34]">
                        {formatCurrency(Math.max(0, (asset.pricePerShare * selectedShares) - discountAmount), lang)}
                      </span>
                    </div>
                    
                    {/* Promo Code Input */}
                    {!isPromoApplied ? (
                      <div className="mb-6">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder={t('asset.checkout.promoPlaceholder')}
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0b1b34] focus:border-transparent outline-none uppercase text-sm"
                          />
                          <button
                            onClick={handleApplyPromo}
                            disabled={!promoCode}
                            className="px-6 py-3 bg-[#0b1b34] text-white font-bold rounded-xl hover:bg-[#0b1b34]/90 transition-colors disabled:opacity-50 text-sm"
                          >
                            {t('asset.checkout.apply')}
                          </button>
                        </div>
                        {promoError && <p className="text-red-500 text-xs mt-2 font-medium">{promoError}</p>}
                      </div>
                    ) : (
                      <div className="mb-6 flex justify-between items-center bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                        <span className="text-green-700 font-medium text-sm">{t('asset.checkout.promoSuccess')}</span>
                        <button 
                          onClick={() => {
                            setIsPromoApplied(false);
                            setDiscountAmount(0);
                            setPromoCode('');
                            setClientSecret(null);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {clientSecret ? (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                          <PaymentForm 
                            amount={Math.max(0, (asset.pricePerShare * selectedShares) - discountAmount)} 
                            onSuccess={handlePurchase}
                            onCancel={() => setCheckoutStep(2)}
                          />
                        </Elements>
                      ) : user?.uid === 'demo-user-123' ? (
                        <div className="space-y-3">
                          <button 
                            onClick={handlePurchase} 
                            disabled={isPurchasing} 
                            className="w-full py-4 bg-black text-white font-bold rounded-full hover:bg-black/90 transition-all flex justify-center items-center group relative overflow-hidden"
                          >
                            <Apple className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Pay with Apple Pay
                          </button>
                          
                          <button 
                            onClick={handlePurchase} 
                            disabled={isPurchasing} 
                            className="w-full py-4 bg-white border-2 border-gray-200 text-[#0b1b34] font-bold rounded-full hover:bg-gray-50 transition-all flex justify-center items-center"
                          >
                            <div className="flex items-center">
                              <span className="text-blue-600">G</span>
                              <span className="text-red-500">o</span>
                              <span className="text-yellow-500">o</span>
                              <span className="text-blue-600">g</span>
                              <span className="text-green-500">l</span>
                              <span className="text-red-500">e</span>
                              <span className="ml-1">Pay</span>
                            </div>
                          </button>

                          <div className="flex items-center py-4">
                            <div className="flex-1 h-px bg-gray-100" />
                            <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or pay with card</span>
                            <div className="flex-1 h-px bg-gray-100" />
                          </div>

                          <div className="flex space-x-4">
                            <button onClick={() => setCheckoutStep(2)} disabled={isPurchasing} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50">
                              {t('asset.checkout.back')}
                            </button>
                            <button onClick={handlePurchase} disabled={isPurchasing} className="w-2/3 py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-colors flex justify-center items-center disabled:opacity-50">
                              {isPurchasing ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                `${t('asset.checkout.pay')} ${formatCurrency(asset.pricePerShare * selectedShares, lang)}`
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#256ab1]"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {purchaseSuccess && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-[#0b1b34] mb-2">{t('asset.checkout.success')}</h4>
                      <p className="text-sm text-gray-500 text-center">{t('asset.checkout.success.desc')}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Sticky Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 z-40 pb-safe">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t('asset.checkout.total')}</span>
            <span className="text-lg font-bold text-[#0b1b34]">{formatCurrency(asset.pricePerShare * selectedShares, lang)}</span>
          </div>
          <button 
            disabled={asset.availableShares === 0 || isPurchasing || purchaseSuccess}
            onClick={handleStartPurchase}
            className="flex-1 py-3.5 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0b1b34]/20 flex justify-center items-center text-sm"
          >
            {asset.availableShares === 0 ? (
              t('asset.soldOut')
            ) : (
              `${t('asset.acquire')} (${selectedShares})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
