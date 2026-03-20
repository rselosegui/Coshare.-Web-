import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { CheckCircle, ChevronRight, MapPin, Calendar, Loader2, Globe, Lock, X, ShieldCheck, Info, Clock, FileText, LayoutGrid } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../store/auth';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';

export const ListOnboarding = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    location: '',
    idleWeeks: 12,
    visibility: 'public' as 'public' | 'private',
  });

  const categories = ['Cars', 'Motorbikes', 'Yachts', 'Others'];
  const subcategories: Record<string, string[]> = {
    Cars: ['Supercars', 'Desert 4x4', 'Classics'],
    Motorbikes: ['Superbikes', 'Cruisers', 'Sportbikes'],
    Yachts: ['Sailing', 'Motor Yachts', 'Catamarans'],
    Others: ['Luxury Items', 'Collectibles']
  };

  const handleNext = async () => {
    if (step === 2) {
      if (!user) {
        alert("Please sign in to submit a listing.");
        return;
      }
      setIsSubmitting(true);
      try {
        // Handle Demo User
        if (user.uid === 'demo-user-123') {
          await new Promise(resolve => setTimeout(resolve, 1500));
          setStep(3);
          return;
        }

        await addDoc(collection(db, 'listings'), {
          userId: user.uid,
          category: formData.category,
          subcategory: formData.subcategory,
          location: formData.location,
          idleWeeks: formData.idleWeeks,
          visibility: formData.visibility,
          status: 'pending_review',
          createdAt: new Date().toISOString()
        });
        setStep(3);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'listings');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(s => Math.min(s + 1, 3));
    }
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 md:py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <SEO 
        title="List Your Asset | Coshare Onboarding"
        description="List your luxury asset for fractional ownership on Coshare. Invite friends, split expenses, and manage your asset with AI-powered tools."
        canonical="https://coshare.ae/list"
      />
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8 md:mb-12">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Onboarding Progress</span>
              <h1 className="text-xl font-display font-bold text-[#0b1b34]">
                {step === 1 ? 'Asset Classification' : step === 2 ? 'Vetting Details' : 'Submission Complete'}
              </h1>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-[#256ab1] uppercase tracking-[0.2em] mb-1">Step {step} of 3</span>
              <div className="flex space-x-1">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`h-1 w-6 rounded-full transition-all duration-500 ${
                      s <= step ? 'bg-[#0b1b34]' : 'bg-gray-200'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden hidden">
            <motion.div
              className="h-full bg-[#0b1b34]"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-12 min-h-[400px] relative overflow-hidden">
          {/* Exit Button */}
          {step < 3 && (
            <button 
              onClick={() => window.location.href = '/'}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all z-10"
              title="Exit Onboarding"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-[#0b1b34]/5 rounded-lg flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4 text-[#0b1b34]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#256ab1] uppercase tracking-widest">Classification</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0b1b34] mb-2">Apply for Coshare Vetting</h2>
                <p className="text-sm text-gray-600 mb-8 max-w-md">Select the category of the asset you wish to fractionalize. All assets undergo a rigorous concierge review.</p>

                <div className="space-y-6 md:space-y-8 flex-1">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Select Category</label>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setFormData({ ...formData, category: cat, subcategory: '' })}
                          className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 text-left transition-all group ${
                            formData.category === cat ? 'border-[#0b1b34] bg-[#0b1b34]/5 ring-4 ring-[#0b1b34]/5' : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <span className={`block font-bold text-base md:text-lg mb-1 transition-colors ${formData.category === cat ? 'text-[#0b1b34]' : 'text-gray-400'}`}>{cat}</span>
                          <span className="text-[10px] md:text-xs text-gray-400">Fractionalize your {cat.toLowerCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Specific Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {subcategories[formData.category as keyof typeof subcategories].map(sub => (
                          <button
                            key={sub}
                            onClick={() => setFormData({ ...formData, subcategory: sub })}
                            className={`p-4 rounded-2xl border-2 text-center transition-all ${
                              formData.subcategory === sub ? 'border-[#256ab1] bg-[#256ab1]/5 text-[#256ab1]' : 'border-gray-100 text-gray-400 hover:border-gray-200'
                            }`}
                          >
                            <span className="block text-sm font-bold">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="bg-blue-50/50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-blue-100/50 flex items-start space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#256ab1]" />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-[#0b1b34] mb-1">Concierge Vetting</h4>
                      <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">Our team provides a custom fractionalization report within 24 hours of submission, ensuring your asset meets Coshare standards.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!formData.category || !formData.subcategory}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0b1b34] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0b1b34]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#0b1b34]/20 active:scale-95"
                  >
                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-[#0b1b34]/5 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#0b1b34]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#256ab1] uppercase tracking-widest">Vetting Details</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0b1b34] mb-2">Initial Valuation</h2>
                <p className="text-sm text-gray-600 mb-8 max-w-md">Provide details for our initial yield estimate. A physical inspection will follow.</p>

                <div className="space-y-6 md:space-y-8 flex-1">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-2 text-[#256ab1]" />
                      Primary Location (UAE)
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-4 md:p-5 border-2 border-gray-100 rounded-2xl md:rounded-3xl focus:outline-none focus:border-[#0b1b34] bg-gray-50/50 text-[#0b1b34] font-bold transition-all text-sm md:text-base"
                    >
                      <option value="" disabled>Select Emirate</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-[#256ab1]" />
                        Estimated Idle Weeks / Year
                      </div>
                      <span className="text-[#0b1b34] font-bold text-base bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">{formData.idleWeeks} weeks</span>
                    </label>
                    <div className="px-2">
                      <input
                        type="range"
                        min="1"
                        max="52"
                        value={formData.idleWeeks}
                        onChange={(e) => setFormData({ ...formData, idleWeeks: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0b1b34]"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400 mt-3 font-bold uppercase tracking-widest">
                        <span>1 week</span>
                        <span>52 weeks</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Listing Visibility</label>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <button
                        onClick={() => setFormData({ ...formData, visibility: 'public' })}
                        className={`p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 text-left transition-all flex items-start space-x-2 md:space-x-3 ${
                          formData.visibility === 'public' ? 'border-[#0b1b34] bg-[#0b1b34]/5 ring-4 ring-[#0b1b34]/5' : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <Globe className={`w-4 h-4 md:w-5 md:h-5 mt-0.5 ${formData.visibility === 'public' ? 'text-[#0b1b34]' : 'text-gray-300'}`} />
                        <div>
                          <span className={`block font-bold text-xs md:text-sm mb-0.5 ${formData.visibility === 'public' ? 'text-[#0b1b34]' : 'text-gray-400'}`}>Public</span>
                          <span className="text-[9px] md:text-[10px] text-gray-400 leading-tight block">Visible to all users</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, visibility: 'private' })}
                        className={`p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 text-left transition-all flex items-start space-x-2 md:space-x-3 ${
                          formData.visibility === 'private' ? 'border-[#0b1b34] bg-[#0b1b34]/5 ring-4 ring-[#0b1b34]/5' : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <Lock className={`w-4 h-4 md:w-5 md:h-5 mt-0.5 ${formData.visibility === 'private' ? 'text-[#0b1b34]' : 'text-gray-300'}`} />
                        <div>
                          <span className={`block font-bold text-xs md:text-sm mb-0.5 ${formData.visibility === 'private' ? 'text-[#0b1b34]' : 'text-gray-400'}`}>Private</span>
                          <span className="text-[9px] md:text-[10px] text-gray-400 leading-tight block">Direct link only</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50/80 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-100 flex items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <Info className="w-4 h-4 md:w-5 md:h-5 text-[#256ab1]" />
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
                      AI Estimate: <strong className="text-[#0b1b34]">AED {(formData.idleWeeks * 2500).toLocaleString()}</strong> potential annual yield. Final valuation requires physical inspection.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <button 
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        agreedToTerms ? 'bg-[#0b1b34] border-[#0b1b34]' : 'bg-white border-gray-200'
                      }`}
                    >
                      {agreedToTerms && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      I confirm I am the legal owner or authorized representative of this asset and agree to the <a href="#" className="text-[#256ab1] font-bold underline">Coshare Vetting Terms</a>.
                    </p>
                  </div>
                </div>

                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={handleBack}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-500 font-bold text-xs uppercase tracking-widest rounded-full border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 order-2 sm:order-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.location || !agreedToTerms || isSubmitting}
                    className="w-full sm:w-auto px-10 py-3.5 bg-[#0b1b34] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0b1b34]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#0b1b34]/20 active:scale-95 order-1 sm:order-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>Submit Application <ChevronRight className="ml-2 w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-6"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-green-500/20 rounded-full"
                  />
                </div>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">Application Received</h2>
                <p className="text-sm text-gray-500 mb-8 md:mb-12 max-w-sm">Your asset has been queued for concierge vetting. We will reach out shortly.</p>
                
                <div className="w-full max-w-md mx-auto space-y-4 md:space-y-6 mb-8 md:mb-12">
                  <div className="flex items-start space-x-3 md:space-x-4 text-left">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0b1b34] text-white rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold flex-shrink-0 mt-1 shadow-lg shadow-[#0b1b34]/20">1</div>
                    <div>
                      <h4 className="font-bold text-[#0b1b34] text-xs md:text-sm">Concierge Review</h4>
                      <p className="text-[10px] md:text-xs text-gray-500">Our team reviews your application and initial AI valuation within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 md:space-x-4 text-left">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h4 className="font-bold text-gray-400 text-xs md:text-sm">Physical Inspection</h4>
                      <p className="text-[10px] md:text-xs text-gray-400">A specialist will contact you to schedule a site visit and condition report.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 md:space-x-4 text-left">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h4 className="font-bold text-gray-400 text-xs md:text-sm">Legal Structuring</h4>
                      <p className="text-[10px] md:text-xs text-gray-400">We handle the SPV creation and fractionalization legal framework.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full sm:w-auto px-12 py-4 bg-[#0b1b34] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#0b1b34]/90 transition-all shadow-xl shadow-[#0b1b34]/20 active:scale-95"
                >
                  Return to Marketplace
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
