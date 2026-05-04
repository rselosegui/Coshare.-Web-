import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Wallet, ShieldCheck, Star, CheckCircle, Shield,
  Camera, ClipboardCheck, BatteryCharging, Truck, ShoppingBag,
  PieChart, Settings
} from 'lucide-react';

const ScreenImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full bg-white overflow-hidden relative">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-top"
      style={{ clipPath: 'inset(5% 0 0 0)' }}
    />
  </div>
);

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

// ─── Share Journey ────────────────────────────────────────────────────────────

export const VisualShare1 = () => (
  <ScreenImage src="/assets/step-1-modified.jpg" alt="step 1 browse assets" />
);

export const VisualShare2 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-center justify-between h-24">
      <div className="font-bold text-lg text-[#0b1b34] mt-auto">Guest Vetted</div>
      <ShieldCheck className="w-5 h-5 text-emerald-500 mt-auto" />
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <div className="font-bold text-sm">Alex Morrison</div>
            <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 fill-current text-orange-400" /> 4.9 (12 reviews)
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Government ID', verified: true },
            { label: 'Facial Match', verified: true },
            { label: 'Driving Record', verified: true },
            { label: 'Background Check', verified: true },
          ].map((req, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-2.5">
              <div className="text-xs font-semibold text-[#0b1b34]">{req.label}</div>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-[#49bee4]" />
            <span className="text-xs font-bold text-[#0b1b34]">Coverage Active</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-tight">
            Comprehensive $1M insurance policy is automatically active for this booking. Liability and damage are fully covered.
          </p>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const VisualShare3 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-end h-24">
      <div className="font-bold text-lg text-[#0b1b34]">Digital Handover</div>
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-[#0b1b34] rounded-2xl p-4 text-white relative shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10">
            <ClipboardCheck className="w-4 h-4 text-[#49bee4]" />
          </div>
          <div className="font-bold text-sm">Pre-Trip Report</div>
        </div>
        <button className="w-full bg-[#49bee4] text-[#0b1b34] font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2">
          <Camera className="w-4 h-4" /> Scan Asset Condition
        </button>
      </motion.div>
      <motion.div variants={itemVariants} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3">Concierge Services</div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"><Sparkles className="w-4 h-4 text-blue-500" /></div>
            <span className="text-[8px] font-medium text-center">Valet &<br/>Clean</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center"><BatteryCharging className="w-4 h-4 text-orange-500" /></div>
            <span className="text-[8px] font-medium text-center">Refuel &<br/>Charge</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-[#49bee4]/10 border-2 border-[#49bee4] rounded-full flex items-center justify-center text-[#0b1b34]"><Truck className="w-4 h-4" /></div>
            <span className="text-[8px] font-bold text-center">Deliver to<br/>Marina</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-emerald-500" /></div>
            <span className="text-[8px] font-medium text-center">Provisions<br/>Added</span>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const VisualShare4 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-end h-24">
      <div className="w-full flex items-center justify-between">
        <div className="font-bold text-lg text-[#0b1b34]">Wallet</div>
        <Wallet className="w-5 h-5 text-gray-400" />
      </div>
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-[#0b1b34] rounded-2xl p-5 text-white shadow-xl shadow-[#0b1b34]/20">
        <div className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-80 text-[#49bee4]">Total Earnings</div>
        <div className="text-4xl font-display font-bold flex items-center gap-2">
          <Wallet className="w-7 h-7 text-[#49bee4]" /> 15,400
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Recent Earnings</div>
        {[
          { date: 'Oct 12', from: 'Porsche 911 (3 days)', amount: '+4,500' },
          { date: 'Oct 05', from: 'Mastercraft Boat (1 day)', amount: '+1,200' },
        ].map((e, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <div>
              <div className="font-bold text-xs">{e.from}</div>
              <div className="text-[9px] text-gray-400">{e.date}</div>
            </div>
            <div className="text-xs font-bold text-emerald-500">{e.amount}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

// ─── Own Journey ──────────────────────────────────────────────────────────────

export const VisualOwn1 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-end h-24">
      <div className="font-bold text-lg text-[#0b1b34]">Co-own Assets</div>
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-white rounded-3xl p-2.5 shadow-sm border border-gray-100">
        <div className="h-32 rounded-2xl overflow-hidden mb-3">
          <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400" alt="Villa" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="px-1">
          <div className="font-bold text-sm mb-1">Dubai Marina Villa</div>
          <div className="text-[10px] text-gray-500 mb-3">Total Value: AED 760,000</div>
          <div className="flex justify-between items-end bg-gray-50 p-2 rounded-xl mb-3">
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase">Available Share</div>
              <div className="text-xs font-bold text-blue-600 flex items-center gap-1"><PieChart className="w-3 h-3" /> 1/8 Share</div>
            </div>
            <div className="text-sm font-bold text-[#0b1b34]">AED 95,000</div>
          </div>
          <button className="w-full bg-[#256ab1] text-white font-bold text-xs py-2.5 rounded-xl">Co-own This Asset</button>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const VisualOwn2 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-end h-24">
      <div className="font-bold text-lg text-[#0b1b34]">Your Team</div>
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3">Verified Co-owners (4/8)</div>
        <div className="flex justify-start gap-2 mb-4">
          {[1, 2, 3, 'You'].map((id, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`w-8 h-8 rounded-full ${id === 'You' ? 'bg-[#0b1b34] text-white' : 'bg-indigo-100'} border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold`}
            >
              {id}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="bg-green-50 p-3 rounded-xl flex items-center gap-2 border border-green-100"
        >
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-[10px] font-bold text-green-800">Legal Framework Ready</div>
            <div className="text-[8px] text-green-600">All identities and funds cryptographically verified.</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

export const VisualOwn3 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-end h-24">
      <div className="w-full flex items-center justify-between">
        <div className="font-bold text-lg text-[#0b1b34]">AI Management</div>
        <Settings className="w-5 h-5 text-gray-400" />
      </div>
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <div className="bg-emerald-50 text-emerald-600 text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full text-nowrap">Auto-Paid</div>
        </div>
        <div className="mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Maintenance</div>
        <div className="text-2xl font-display font-bold text-[#0b1b34] mb-4">AED 1,200</div>
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-gray-900 border-b border-gray-100 pb-1">Split Breakdown</div>
          {[
            { name: 'You', share: '1/8', amount: '150', color: 'text-gray-900 font-bold' },
            { name: 'Sarah', share: '3/8', amount: '450', color: 'text-gray-500' },
            { name: 'Omar', share: '4/8', amount: '600', color: 'text-gray-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`flex justify-between items-center origin-left`}
            >
              <div className={`text-[10px] ${item.color}`}>{item.name} <span className="text-gray-400">({item.share})</span></div>
              <div className={`text-[10px] ${item.color}`}>AED {item.amount}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const VisualOwn4 = () => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    className="w-full h-full bg-[#f8f9fa] flex flex-col font-sans text-gray-900"
  >
    <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 flex items-end h-24">
      <div className="font-bold text-lg text-[#0b1b34]">Your Shares</div>
    </div>
    <div className="flex-1 p-5 pb-24 flex flex-col gap-4 overflow-hidden">
      <motion.div variants={itemVariants} className="bg-[#0b1b34] rounded-2xl p-5 text-white relative shadow-xl overflow-hidden">
        <div className="relative z-10">
          <div className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mb-1">Total Ownership Value</div>
          <div className="text-3xl font-display font-bold">AED 145,000</div>
          <div className="mt-4 flex gap-4">
            <div><div className="text-[9px] text-gray-400">Assets</div><div className="text-sm font-bold">2 Shares</div></div>
            <div><div className="text-[9px] text-gray-400">Yield</div><div className="text-sm font-bold text-emerald-400">+5.1%</div></div>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-20%] bottom-[-20%] w-32 h-32 bg-blue-500/20 blur-2xl rounded-full"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xs">Exit Strategy</span>
        </div>
        <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">
          Hold genuine legal shares. When you're ready to move on, list your share natively on the marketplace with one click.
        </p>
        <button className="w-full border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold">Sell Share</button>
      </motion.div>
    </div>
  </motion.div>
);

// ─── Legacy aliases ───────────────────────────────────────────────────────────
export const Visual1 = VisualOwn1;
export const Visual2 = VisualOwn2;
export const Visual3 = VisualOwn3;
export const Visual4 = VisualOwn4;
