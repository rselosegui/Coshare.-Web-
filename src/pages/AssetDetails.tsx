import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../store/language';
import { useAuth } from '../store/auth';
import { motion } from 'motion/react';
import { ArrowLeft, Share, Heart, MapPin, Calendar, Shield, Info, Calculator, CheckCircle, FileText, Lock, UserCheck, CreditCard, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';

export const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const asset = ASSETS.find(a => a.id === id);
  const [selectedShares, setSelectedShares] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: KYC, 2: Legal, 3: Payment

  const handleStartPurchase = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckoutModal(true);
    setCheckoutStep(1);
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

  if (!asset) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa]">
        <h2 className="text-2xl font-bold text-[#0b1b34] mb-4">Asset not found</h2>
        <button onClick={() => navigate('/assets')} className="text-[#256ab1] hover:underline">
          Return to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
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
            {asset.specs?.location || 'Dubai, UAE'}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0b1b34] mb-4">About this Asset</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {asset.description}
              </p>
              
              <h3 className="text-lg font-bold text-[#0b1b34] mb-4">Specifications</h3>
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
                <h2 className="text-2xl font-bold text-[#0b1b34]">Legal & Ownership Structure</h2>
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 mb-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  This asset is held in a dedicated, bankruptcy-remote Special Purpose Vehicle (SPV) registered in the Abu Dhabi Global Market (ADGM). By purchasing shares, you are acquiring direct membership interests in this specific LLC.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                    <FileText className="w-5 h-5 text-[#256ab1] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Entity Type</p>
                      <p className="text-sm font-bold text-[#0b1b34]">ADGM SPV (LLC)</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                    <Lock className="w-5 h-5 text-[#256ab1] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Asset Status</p>
                      <p className="text-sm font-bold text-[#0b1b34]">Fully Insured & Secured</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-[#0b1b34] uppercase tracking-wider mb-4">Due Diligence Documents</h3>
              <div className="space-y-3">
                {['Operating Agreement (Draft)', 'Independent Valuation Report', 'Physical Inspection Certificate'].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#49bee4]/50 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#256ab1] mr-3 transition-colors" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#0b1b34]">{doc}</span>
                    </div>
                    <span className="text-xs font-bold text-[#256ab1] opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0b1b34] mb-6">Ownership Benefits</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#49bee4]/10 flex items-center justify-center mr-4 shrink-0">
                    <Calendar className="w-5 h-5 text-[#256ab1]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b1b34]">Guaranteed Usage Days</h4>
                    <p className="text-sm text-gray-600 mt-1">Enjoy proportional access to the asset throughout the year based on your share ownership.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#49bee4]/10 flex items-center justify-center mr-4 shrink-0">
                    <Shield className="w-5 h-5 text-[#256ab1]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b1b34]">Fully Managed</h4>
                    <p className="text-sm text-gray-600 mt-1">Maintenance, insurance, and storage are completely handled by the <span dir="ltr">coshare.</span> team.</p>
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
                  <h2 className="text-4xl font-display font-bold text-[#0b1b34]">AED {asset.pricePerShare.toLocaleString()}</h2>
                </div>
              </div>

              {/* Dynamic Calculator */}
              <div className="bg-[#f8f9fa] rounded-2xl p-5 mb-8 border border-gray-100">
                <div className="flex items-center mb-4 text-[#0b1b34]">
                  <Calculator className="w-5 h-5 mr-2" />
                  <h3 className="font-bold">{t('asset.calculator.title')}</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{t('asset.calculator.shares')}</span>
                    <span className="font-bold text-[#256ab1]">{selectedShares} / {asset.availableShares}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max={asset.availableShares || 1} 
                    value={selectedShares}
                    onChange={(e) => setSelectedShares(parseInt(e.target.value))}
                    disabled={asset.availableShares === 0}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#256ab1]"
                  />
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{t('asset.calculator.days')}</span>
                    <span className="font-bold text-[#0b1b34]">{Math.round((365 / asset.totalShares) * selectedShares)} days</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Est. Annual Yield</span>
                    <span className="font-bold text-green-600">~8.5%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                    <span className="font-medium text-[#0b1b34]">{t('asset.calculator.total')}</span>
                    <span className="text-xl font-bold text-[#256ab1]">AED {(asset.pricePerShare * selectedShares).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                disabled={asset.availableShares === 0 || isPurchasing || purchaseSuccess}
                onClick={handleStartPurchase}
                className="w-full py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4 shadow-lg shadow-[#0b1b34]/20 flex justify-center items-center"
              >
                {asset.availableShares === 0 ? (
                  t('asset.soldOut')
                ) : (
                  `${t('asset.acquire')} (${selectedShares})`
                )}
              </button>
              
              <div className="flex items-start text-xs text-gray-500 mt-4">
                <Info className="w-4 h-4 mr-2 shrink-0" />
                <p>By proceeding, you agree to our fractional ownership terms and conditions. Capital at risk.</p>
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
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-display font-bold text-[#0b1b34]">Secure Checkout</h3>
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
                  { step: 1, icon: UserCheck, label: 'Identity' },
                  { step: 2, icon: FileText, label: 'Legal' },
                  { step: 3, icon: CreditCard, label: 'Payment' }
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
                    <h4 className="text-2xl font-bold text-[#0b1b34] mb-2">Verify your Identity</h4>
                    <p className="text-gray-600 text-sm">To comply with ADGM financial regulations, we need to verify your identity before you can purchase fractional shares.</p>
                  </div>
                  
                  <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 text-center border-dashed">
                    <UserCheck className="w-12 h-12 text-[#256ab1] mx-auto mb-4 opacity-50" />
                    <p className="text-sm font-medium text-[#0b1b34] mb-1">Upload Government ID</p>
                    <p className="text-xs text-gray-500 mb-4">Passport, Emirates ID, or Driver's License</p>
                    <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#0b1b34] hover:bg-gray-50 transition-colors">
                      Select File
                    </button>
                  </div>
                  
                  <div className="flex items-center p-4 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium">
                    <Shield className="w-4 h-4 mr-2 shrink-0" />
                    Your data is securely encrypted and processed by our regulated KYC partner.
                  </div>

                  <button onClick={() => setCheckoutStep(2)} className="w-full py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-colors">
                    Continue to Legal
                  </button>
                </motion.div>
              )}

              {/* Step 2: Legal */}
              {checkoutStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-[#0b1b34] mb-2">Operating Agreement</h4>
                    <p className="text-gray-600 text-sm">Review and sign the LLC membership agreement for {asset.name}.</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-48 overflow-y-auto text-xs text-gray-600 space-y-4">
                    <p className="font-bold text-[#0b1b34] text-sm mb-2">MEMBERSHIP INTEREST PURCHASE AGREEMENT</p>
                    <p>This Membership Interest Purchase Agreement (this "Agreement") is entered into as of today, by and between Coshare SPV LLC (the "Company") and the undersigned investor (the "Purchaser").</p>
                    <p>WHEREAS, the Company owns the asset described as {asset.name};</p>
                    <p>WHEREAS, the Purchaser desires to purchase {selectedShares} membership interests (the "Shares") in the Company at a price of AED {asset.pricePerShare.toLocaleString()} per Share, for a total purchase price of AED {(asset.pricePerShare * selectedShares).toLocaleString()};</p>
                    <p>NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows...</p>
                    <p className="italic">[Simulated Document Content]</p>
                  </div>
                  
                  <label className="flex items-start space-x-3 cursor-pointer p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#256ab1] rounded border-gray-300 focus:ring-[#256ab1]" />
                    <span className="text-sm text-gray-700 font-medium">I have read and agree to the Operating Agreement, and I electronically sign this document.</span>
                  </label>

                  <div className="flex space-x-4">
                    <button onClick={() => setCheckoutStep(1)} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button onClick={() => setCheckoutStep(3)} className="w-2/3 py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-colors">
                      Sign & Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {checkoutStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-[#0b1b34] mb-2">Complete Purchase</h4>
                    <p className="text-gray-600 text-sm">You are acquiring {selectedShares} shares of {asset.name}.</p>
                  </div>
                  
                  <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Total Amount Due</span>
                      <span className="text-2xl font-bold text-[#0b1b34]">AED {(asset.pricePerShare * selectedShares).toLocaleString()}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border-2 border-[#256ab1] bg-white rounded-xl cursor-pointer">
                        <div className="flex items-center">
                          <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-[#256ab1] border-gray-300 focus:ring-[#256ab1]" />
                          <span className="ml-3 font-bold text-[#0b1b34]">Credit Card</span>
                        </div>
                        <CreditCard className="w-5 h-5 text-[#256ab1]" />
                      </label>
                      <label className="flex items-center justify-between p-4 border-2 border-transparent bg-white rounded-xl cursor-pointer hover:border-gray-200 transition-colors">
                        <div className="flex items-center">
                          <input type="radio" name="payment" className="w-4 h-4 text-[#256ab1] border-gray-300 focus:ring-[#256ab1]" />
                          <span className="ml-3 font-bold text-gray-600">Bank Wire Transfer</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {purchaseSuccess ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-[#0b1b34] mb-2">Purchase Successful!</h4>
                      <p className="text-sm text-gray-500 text-center">Your shares have been added to your Vault. Redirecting...</p>
                    </motion.div>
                  ) : (
                    <div className="flex space-x-4">
                      <button onClick={() => setCheckoutStep(2)} disabled={isPurchasing} className="w-1/3 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50">
                        Back
                      </button>
                      <button onClick={handlePurchase} disabled={isPurchasing} className="w-2/3 py-4 bg-[#0b1b34] text-white font-bold rounded-full hover:bg-[#0b1b34]/90 transition-colors flex justify-center items-center disabled:opacity-50">
                        {isPurchasing ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          `Pay AED ${(asset.pricePerShare * selectedShares).toLocaleString()}`
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
