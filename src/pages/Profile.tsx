import React from 'react';
import { useAuth } from '../store/auth';
import { motion } from 'motion/react';
import { User, Mail, Shield, MapPin, Calendar, Edit2, Camera } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-primary flex items-center justify-center text-4xl text-on-primary font-display font-bold shadow-xl">
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
                <button className="px-6 py-2.5 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary/90 transition-all flex items-center justify-center">
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

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20"
          >
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};
