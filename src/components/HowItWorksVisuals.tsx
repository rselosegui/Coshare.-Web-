import React from 'react';
import { Car, ShieldCheck, Zap, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../store/language';

export const Visual1 = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0b1b34]">
      <img 
        src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000" 
        alt="Browse Assets" 
        className="w-full h-full object-cover opacity-80"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-[#0b1b34]/20 to-transparent" />
    </div>
  );
};

export const Visual2 = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0b1b34]">
      <img 
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000" 
        alt="Legal and Financial" 
        className="w-full h-full object-cover opacity-80"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-[#0b1b34]/20 to-transparent" />
    </div>
  );
};

export const Visual3 = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0b1b34]">
      <img 
        src="https://images.unsplash.com/photo-1506784951206-a9fcecb6ed09?auto=format&fit=crop&q=80&w=1000" 
        alt="Smart Scheduling" 
        className="w-full h-full object-cover opacity-80"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-[#0b1b34]/20 to-transparent" />
    </div>
  );
};

export const Visual4 = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0b1b34]">
      <img 
        src="https://images.unsplash.com/photo-1554223090-7e482851df45?auto=format&fit=crop&q=80&w=1000" 
        alt="Additional Services" 
        className="w-full h-full object-cover opacity-80"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-[#0b1b34]/20 to-transparent" />
    </div>
  );
};
