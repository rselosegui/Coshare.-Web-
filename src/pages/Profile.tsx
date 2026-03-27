import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { useLanguage } from '../store/language';
import { formatCurrency } from '../lib/format';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Shield, MapPin, Calendar, Edit2, Camera, Wallet, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'vault'>('overview');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center text-4xl text-on-primary font-display font-bold shadow-xl">
                {user.displayName?.[0] || user.email?.[0].toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-display font-bold text-primary mb-1">
                    {user.displayName || 'Coshare Member'}
                  </h1>
                  <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                </div>
                <button className="px-6 py-2.5 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md">
                  <Edit2 className="w-3.5 h-3.5 mr-2" />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Member Since</p>
                  <p className="text-sm font-bold text-primary">March 2024</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center">
                    <Shield className="w-3.5 h-3.5 text-accent mr-1.5" />
                    <p className="text-sm font-bold text-primary">Verified Elite</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 col-span-2 md:col-span-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-sm font-bold text-primary">Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-sm mb-8 max-w-md mx-auto">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'vault', label: 'Vault', icon: Wallet },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-on-primary shadow-lg' 
                  : 'text-gray-500 hover:text-primary hover:bg-white/50'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
                <h3 className="text-lg font-bold text-primary mb-6 flex items-center">
                  <User className="w-5 h-5 mr-3 text-secondary" />
                  Personal Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <p className="text-sm font-medium text-primary pb-2 border-b border-gray-100">{user.displayName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <p className="text-sm font-medium text-primary pb-2 border-b border-gray-100">+971 50 123 4567</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date of Birth</label>
                    <p className="text-sm font-medium text-primary pb-2 border-b border-gray-100">January 15, 1990</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
                <h3 className="text-lg font-bold text-primary mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-secondary" />
                  Address Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Residence</label>
                    <p className="text-sm font-medium text-primary pb-2 border-b border-gray-100">Downtown Dubai, UAE</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nationality</label>
                    <p className="text-sm font-medium text-primary pb-2 border-b border-gray-100">United Arab Emirates</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto w-full"
            >
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
                <h3 className="text-lg font-bold text-primary mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-secondary" />
                  Account Security
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-emerald-600 mr-3" />
                      <div>
                        <p className="text-sm font-bold text-emerald-900">KYC Verified</p>
                        <p className="text-[10px] text-emerald-700 font-medium">Your identity is fully verified</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-primary">Password</p>
                      <p className="text-[10px] text-gray-500 font-medium">Last changed 3 months ago</p>
                    </div>
                    <button className="text-xs font-bold text-secondary hover:underline">Update</button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-primary">Two-Factor Auth</p>
                      <p className="text-[10px] text-gray-500 font-medium">Enabled via Authenticator App</p>
                    </div>
                    <button className="text-xs font-bold text-secondary hover:underline">Manage</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vault' && (
            <motion.div 
              key="vault"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto w-full"
            >
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-primary flex items-center">
                    <Wallet className="w-5 h-5 mr-3 text-secondary" />
                    Vault Summary
                  </h3>
                  <Link to="/dashboard" className="text-xs font-bold text-secondary flex items-center hover:underline">
                    View Full Dashboard
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Equity</p>
                    <p className="text-2xl font-display font-bold text-primary">{formatCurrency(1580000, lang).replace('.00', '')}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Assets</p>
                    <p className="text-2xl font-display font-bold text-primary">3</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Performance</p>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-sm font-bold text-emerald-900">Portfolio Growth</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">+12.5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
