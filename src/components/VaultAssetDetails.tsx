import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Wrench, Shield, MessageSquare, Send, User, AlertTriangle, Gavel } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../store/auth';
import { useLanguage } from '../store/language';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: any;
}

interface VaultAssetDetailsProps {
  asset: any;
  onClose: () => void;
}

export const VaultAssetDetails = ({ asset, onClose }: VaultAssetDetailsProps) => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'maintenance' | 'inspections' | 'chat'>('overview');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDescription, setDisputeDescription] = useState('');
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock data for Vault-specific info
  const vaultInfo = {
    purchaseDate: '2023-10-15',
    maintenanceHistory: [
      { date: '2024-01-20', task: 'Full Service & Oil Change', status: 'Completed', cost: 'AED 4,500' },
      { date: '2024-03-15', task: 'Brake Pad Replacement', status: 'Upcoming', cost: 'AED 2,200' },
    ],
    inspections: [
      { date: '2023-12-01', result: 'Passed', inspector: 'RTA Dubai', notes: 'Perfect condition' },
      { date: '2024-02-10', result: 'Passed', inspector: 'Third Party Audit', notes: 'No issues found' },
    ]
  };

  useEffect(() => {
    if (activeTab === 'chat' && asset.id) {
      const q = query(
        collection(db, 'asset_chats'),
        where('assetId', '==', asset.id),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs: Message[] = [];
        snapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(msgs);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 100);
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'asset_chats'));

      return () => unsubscribe();
    }
  }, [activeTab, asset.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'asset_chats'), {
        assetId: asset.id,
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || 'Co-owner',
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'asset_chats');
    }
  };

  const handleSumbitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !disputeReason || !disputeDescription) return;

    setIsSubmittingDispute(true);
    try {
      await addDoc(collection(db, 'disputes'), {
        assetId: asset.id,
        reporterId: user.uid,
        reporterName: user.displayName || user.email?.split('@')[0] || 'Co-owner',
        reason: disputeReason,
        description: disputeDescription,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setDisputeSuccess(true);
      setTimeout(() => {
        setShowDisputeForm(false);
        setDisputeSuccess(false);
        setDisputeReason('');
        setDisputeDescription('');
      }, 2000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'disputes');
    } finally {
      setIsSubmittingDispute(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      dir={lang === 'AR' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[92vh] sm:h-auto sm:max-h-[90vh]"
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-full flex justify-center pt-4 pb-2 absolute top-0 z-20 pointer-events-none">
          <div className="w-12 h-1.5 bg-white/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="relative h-56 sm:h-64 flex-shrink-0">
          <img 
            src={asset.imageUrl} 
            alt={asset.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className={`absolute top-6 ${lang === 'AR' ? 'left-6' : 'right-6'}`}>
            <button 
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className={`absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 ${lang === 'AR' ? 'sm:flex-row-reverse' : ''}`}>
            <div className={lang === 'AR' ? 'text-right' : ''}>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight">{asset.name}</h2>
              <div className={`flex items-center space-x-4 ${lang === 'AR' ? 'space-x-reverse' : ''}`}>
                <span className="px-3 py-1 bg-accent text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {t(`dashboard.categories.${asset.subcategory.toLowerCase()}`)}
                </span>
                <span className="text-white/70 text-xs sm:text-sm font-medium">
                  {asset.sharesOwned} / {asset.totalShares} {t('vault.shares')}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setShowDisputeForm(true)}
              className={`flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-red-600 rounded-xl sm:rounded-2xl text-white shadow-lg hover:bg-red-700 hover:scale-105 transition-all group ${lang === 'AR' ? 'space-x-reverse' : ''}`}
            >
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">{t('vault.dispute.file')}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b border-gray-100 dark:border-white/10 px-8 overflow-x-auto no-scrollbar ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
          {[
            { id: 'overview', label: t('vault.tabs.overview'), icon: Calendar },
            { id: 'maintenance', label: t('vault.tabs.maintenance'), icon: Wrench },
            { id: 'inspections', label: t('vault.tabs.inspections'), icon: Shield },
            { id: 'chat', label: t('vault.tabs.chat'), icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-4 border-b-2 transition-all whitespace-nowrap ${lang === 'AR' ? 'space-x-reverse' : ''} ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{t('vault.overview.purchaseDate')}</p>
                    <p className="text-xl font-bold text-primary">{format(new Date(vaultInfo.purchaseDate), 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{t('dashboard.stats.equity')}</p>
                    <p className="text-xl font-bold text-primary">AED {asset.totalValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{t('vault.overview.specs')}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(asset.specs || {}).map(([key, value]: [string, any]) => (
                      <div key={key} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t(`vault.specs.${key}`)}</p>
                        <p className="text-xs font-bold text-primary">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'maintenance' && (
              <motion.div
                key="maintenance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {vaultInfo.maintenanceHistory.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-4 ${lang === 'AR' ? 'space-x-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div className={lang === 'AR' ? 'text-right' : ''}>
                        <p className="text-sm font-bold text-primary">{item.task}</p>
                        <p className="text-xs text-gray-500">{format(new Date(item.date), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                    <div className={lang === 'AR' ? 'text-left' : 'text-right'}>
                      <p className="text-sm font-bold text-primary">{item.cost}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                        {t(`vault.status.${item.status.toLowerCase()}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'inspections' && (
              <motion.div
                key="inspections"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {vaultInfo.inspections.map((item, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 text-right">
                    <div className={`flex items-center justify-between mb-4 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-3 ${lang === 'AR' ? 'space-x-reverse' : ''}`}>
                        <Shield className="w-5 h-5 text-accent" />
                        <p className="text-sm font-bold text-primary">{item.inspector}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {t(`vault.status.${item.result.toLowerCase()}`)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{format(new Date(item.date), 'MMMM d, yyyy')}</p>
                    <p className="text-sm text-primary italic">"{item.notes}"</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-[400px]"
              >
                <div className={`flex items-center justify-between mb-4 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('vault.tabs.chat')}</h4>
                  <button 
                    onClick={() => setShowDisputeForm(true)}
                    className={`text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center ${lang === 'AR' ? 'flex-row-reverse' : ''}`}
                  >
                    <AlertTriangle className={`w-3 h-3 ${lang === 'AR' ? 'ml-1' : 'mr-1'}`} />
                    {t('vault.chat.report')}
                  </button>
                </div>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar"
                >
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                      <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm">{t('vault.chat.empty')}</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${msg.userId === user?.uid ? (lang === 'AR' ? 'items-start' : 'items-end') : (lang === 'AR' ? 'items-end' : 'items-start')}`}
                      >
                        <div className={`flex items-center space-x-2 mb-1 ${lang === 'AR' ? 'space-x-reverse' : ''}`}>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{msg.userName}</span>
                          {msg.timestamp && (
                            <span className="text-[9px] text-gray-300">
                              {format(msg.timestamp.toDate(), 'HH:mm')}
                            </span>
                          )}
                        </div>
                        <div className={`px-4 py-2 rounded-2xl text-sm ${
                          msg.userId === user?.uid 
                            ? `bg-primary text-white ${lang === 'AR' ? 'rounded-tl-none' : 'rounded-tr-none'}` 
                            : `bg-gray-100 dark:bg-white/5 text-primary ${lang === 'AR' ? 'rounded-tr-none' : 'rounded-tl-none'}`
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t('vault.chat.placeholder')}
                    className={`w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${lang === 'AR' ? 'pl-16 text-right' : 'pr-16'}`}
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`absolute top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 ${lang === 'AR' ? 'left-3' : 'right-3'}`}
                  >
                    <Send className={`w-4 h-4 ${lang === 'AR' ? 'rotate-180' : ''}`} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Dispute Modal */}
      <AnimatePresence>
        {showDisputeForm && (
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
              className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2rem] p-8 shadow-2xl"
              dir={lang === 'AR' ? 'rtl' : 'ltr'}
            >
              <div className={`flex items-center justify-between mb-6 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center space-x-3 ${lang === 'AR' ? 'space-x-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-red-600" />
                  </div>
                  <div className={lang === 'AR' ? 'text-right' : ''}>
                    <h3 className="text-lg font-bold text-primary">{t('vault.dispute.title')}</h3>
                    <p className="text-xs text-gray-500">{t('vault.dispute.subtitle')}</p>
                  </div>
                </div>
                <button onClick={() => setShowDisputeForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {disputeSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">{t('vault.dispute.success.title')}</h4>
                  <p className="text-sm text-gray-500">{t('vault.dispute.success.desc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSumbitDispute} className="space-y-4">
                  <div>
                    <label className={`block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ${lang === 'AR' ? 'text-right' : ''}`}>{t('vault.dispute.reason.label')}</label>
                    <select
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      required
                      className={`w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 ${lang === 'AR' ? 'text-right' : ''}`}
                    >
                      <option value="">{t('vault.dispute.reason.placeholder')}</option>
                      <option value="Damage">{t('vault.dispute.reason.damage')}</option>
                      <option value="Late Return">{t('vault.dispute.reason.late')}</option>
                      <option value="Rules Violation">{t('vault.dispute.reason.violation')}</option>
                      <option value="Cleanliness">{t('vault.dispute.reason.cleanliness')}</option>
                      <option value="Other">{t('vault.dispute.reason.other')}</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ${lang === 'AR' ? 'text-right' : ''}`}>{t('vault.dispute.desc.label')}</label>
                    <textarea
                      value={disputeDescription}
                      onChange={(e) => setDisputeDescription(e.target.value)}
                      required
                      placeholder={t('vault.dispute.desc.placeholder')}
                      rows={4}
                      className={`w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none ${lang === 'AR' ? 'text-right' : ''}`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingDispute}
                    className="w-full py-4 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmittingDispute ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      t('vault.dispute.submit')
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
