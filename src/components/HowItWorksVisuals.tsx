import React from 'react';
import { ShieldCheck, Zap, ChevronRight, Sparkles, Search, FileText } from 'lucide-react';



const ScreenImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full bg-white overflow-hidden relative">
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover object-top"
      style={{ 
        /* This 'cuts' the top 5% of the image off. 
           The image stays in place, but the top becomes invisible.
           Adjust 5% to 4% or 6% to get it pixel-perfect.
        */
        clipPath: 'inset(5% 0 0 0)' 
      }}
    />
  </div>
);

export const Visual1 = () => (
  <ScreenImage 
    src="/assets/step-1.png" 
    alt="step 1 browse assets" 
  />
);


export const Visual2 = () => (
  <div className="w-full h-full bg-gray-50 flex flex-col font-sans text-gray-900">
    <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex items-center gap-2">
      <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
      <div className="font-bold text-lg">Checkout</div>
    </div>
    <div className="flex-1 p-4 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold">Co-Ownership Agreement</div>
            <div className="text-xs text-gray-500">Ready to sign</div>
          </div>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-blue-500 rounded-full" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Summary</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">1x Share (1/8)</span><span className="font-medium">AED 150,000</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Platform Fee</span><span className="font-medium">AED 1,500</span></div>
          <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between font-bold"><span>Total Due</span><span className="text-[#49bee4]">AED 152,000</span></div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="w-full bg-gray-900 text-white text-center py-3 rounded-xl font-bold text-sm">Sign & Pay</div>
      </div>
    </div>
  </div>
);

export const Visual3 = () => (
  <ScreenImage 
    src="/assets/step-3.png" 
    alt="Coshare calendar" 
  />
);


export const Visual4 = () => (
  <div className="w-full h-full bg-gray-50 flex flex-col font-sans text-gray-900">
    <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex justify-between items-center">
      <div className="font-bold text-lg">My Asset</div>
      <Sparkles className="w-4 h-4 text-gray-600" />
    </div>
    <div className="flex-1 p-4 flex flex-col gap-4">
      <div className="bg-gray-900 rounded-2xl p-6 text-white text-center relative overflow-hidden">
        <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-[#49bee4]" />
        </div>
        <div className="font-bold text-lg">Digital Key Active</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
          <div className="text-xs font-bold">Request Cleaning</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
          <div className="text-xs font-bold">Maintenance</div>
        </div>
      </div>
    </div>
  </div>
);