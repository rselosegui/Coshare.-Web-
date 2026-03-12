import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Wrench, Shield, MessageSquare, Send, User, AlertTriangle, Gavel } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../store/auth';
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="relative h-48 sm:h-64 flex-shrink-0">
          <img 
            src={asset.imageUrl} 
            alt={asset.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-6 right-6">
            <button 
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">{asset.name}</h2>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-accent text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {asset.subcategory}
                </span>
                <span className="text-white/70 text-sm font-medium">
                  {asset.sharesOwned} / {asset.totalShares} Shares Owned
                </span>
              </div>
            </div>

            <button 
              onClick={() => setShowDisputeForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 rounded-2xl text-white shadow-lg hover:bg-red-700 hover:scale-105 transition-all group"
            >
              <AlertTriangle className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">File Dispute</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-white/10 px-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Calendar },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench },
            { id: 'inspections', label: 'Inspections', icon: Shield },
            { id: 'chat', label: 'Co-owner Chat', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-4 border-b-2 transition-all whitespace-nowrap ${
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
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Purchase Date</p>
                    <p className="text-xl font-bold text-primary">{format(new Date(vaultInfo.purchaseDate), 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Equity Value</p>
                    <p className="text-xl font-bold text-primary">AED {asset.totalValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Asset Specifications</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(asset.specs || {}).map(([key, value]: [string, any]) => (
                      <div key={key} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{key}</p>
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
                  <div key={idx} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{item.task}</p>
                        <p className="text-xs text-gray-500">{format(new Date(item.date), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{item.cost}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>{item.status}</p>
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
                  <div key={idx} className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-accent" />
                        <p className="text-sm font-bold text-primary">{item.inspector}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {item.result}
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
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Co-owner Chat</h4>
                  <button 
                    onClick={() => setShowDisputeForm(true)}
                    className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center"
                  >
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Report Violation
                  </button>
                </div>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar"
                >
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                      <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm">Start a conversation with other co-owners.</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${msg.userId === user?.uid ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{msg.userName}</span>
                          {msg.timestamp && (
                            <span className="text-[9px] text-gray-300">
                              {format(msg.timestamp.toDate(), 'HH:mm')}
                            </span>
                          )}
                        </div>
                        <div className={`px-4 py-2 rounded-2xl text-sm ${
                          msg.userId === user?.uid 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-gray-100 dark:bg-white/5 text-primary rounded-tl-none'
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
                    placeholder="Type a message..."
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="w-4 h-4" />
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
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">File a Dispute</h3>
                    <p className="text-xs text-gray-500">Report a co-owner violation</p>
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
                  <h4 className="text-xl font-bold text-primary mb-2">Dispute Submitted</h4>
                  <p className="text-sm text-gray-500">Our team will review the report and take appropriate action.</p>
                </div>
              ) : (
                <form onSubmit={handleSumbitDispute} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Reason</label>
                    <select
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      required
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    >
                      <option value="">Select a reason</option>
                      <option value="Damage">Asset Damage</option>
                      <option value="Late Return">Late Return</option>
                      <option value="Rules Violation">Rules Violation</option>
                      <option value="Cleanliness">Cleanliness Issues</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      value={disputeDescription}
                      onChange={(e) => setDisputeDescription(e.target.value)}
                      required
                      placeholder="Please provide details about the violation..."
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
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
                      'Submit Report'
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
