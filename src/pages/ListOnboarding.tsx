import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ChevronRight, MapPin, Calendar, Loader2 } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../store/auth';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';

export const ListOnboarding = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    location: '',
    idleWeeks: 12,
  });

  const categories = ['Cars', 'Others'];
  const subcategories = {
    Cars: ['Supercars', 'Desert 4x4', 'Classics'],
    Others: ['Sailing', 'Superbikes']
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
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Step {step} of 3</span>
            <span className="text-xs font-bold text-[#256ab1] uppercase tracking-wider">
              {step === 1 ? 'Asset Type' : step === 2 ? 'Valuation & Vetting' : 'Application Submitted'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0b1b34]"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h2 className="text-3xl font-display font-bold text-[#0b1b34] mb-2">Apply for Coshare Vetting</h2>
                <p className="text-gray-600 mb-8">Select the category of the asset you wish to fractionalize. All assets undergo a rigorous concierge review.</p>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setFormData({ ...formData, category: cat, subcategory: '' })}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            formData.category === cat ? 'border-[#0b1b34] bg-[#0b1b34]/5' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="block font-bold text-[#0b1b34]">{cat}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-3">Subcategory</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {subcategories[formData.category as keyof typeof subcategories].map(sub => (
                          <button
                            key={sub}
                            onClick={() => setFormData({ ...formData, subcategory: sub })}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${
                              formData.subcategory === sub ? 'border-[#256ab1] bg-[#256ab1]/5 text-[#256ab1]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <span className="block text-sm font-medium">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!formData.category || !formData.subcategory}
                    className="px-8 py-3 bg-[#0b1b34] text-white font-medium rounded-full hover:bg-[#0b1b34]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h2 className="text-3xl font-display font-bold text-[#0b1b34] mb-2">Initial Valuation</h2>
                <p className="text-gray-600 mb-8">Provide details for our initial yield estimate. A physical inspection will follow.</p>

                <div className="space-y-8 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#256ab1]" />
                      Primary Location (UAE)
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#0b1b34] bg-white text-[#0b1b34] font-medium"
                    >
                      <option value="" disabled>Select Emirate</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#256ab1]" />
                        Estimated Idle Weeks / Year
                      </div>
                      <span className="text-[#0b1b34] font-bold text-lg">{formData.idleWeeks} weeks</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="52"
                      value={formData.idleWeeks}
                      onChange={(e) => setFormData({ ...formData, idleWeeks: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0b1b34]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                      <span>1 week</span>
                      <span>52 weeks</span>
                    </div>
                    
                    <div className="mt-6 bg-[#f8f9fa] p-4 rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-600 text-center">
                        Based on <strong className="text-[#0b1b34]">{formData.idleWeeks} idle weeks</strong>, our AI estimates a potential yield of <strong className="text-[#256ab1]">AED {(formData.idleWeeks * 2500).toLocaleString()}</strong> annually. Final valuation requires physical inspection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-8 py-3 bg-white text-gray-600 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.location || isSubmitting}
                    className="px-8 py-3 bg-[#0b1b34] text-white font-medium rounded-full hover:bg-[#0b1b34]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-display font-bold text-[#0b1b34] mb-4">Application Received</h2>
                <div className="text-left bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 mb-8 max-w-md mx-auto">
                  <h3 className="font-bold text-[#0b1b34] mb-3">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Our concierge team will review your application.</li>
                    <li>We will contact you to schedule a physical inspection.</li>
                    <li>Legal structuring and LLC formation (if approved).</li>
                    <li>Asset listed on the Coshare platform.</li>
                  </ol>
                </div>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-3 bg-[#0b1b34] text-white font-medium rounded-full hover:bg-[#0b1b34]/90 transition-colors"
                >
                  Return to Homepage
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
