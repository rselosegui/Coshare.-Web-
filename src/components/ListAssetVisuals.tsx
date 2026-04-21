import React from 'react';
import { Upload, CheckCircle2, FileText, Wallet, Camera, ShieldCheck, ChevronRight, PieChart } from 'lucide-react';

export const ListVisual1 = () => {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex items-center gap-2">
        <div className="font-bold text-lg">List Asset</div>
      </div>
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-full h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 mb-4">
            <Camera className="w-8 h-8 mb-2 text-gray-400" />
            <span className="text-xs font-medium">Upload Photos</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Asset Type</div>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-medium">Supercar</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Make & Model</div>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-medium">Porsche 911 GT3</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Desired Valuation</div>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-medium text-[#49bee4]">AED 1,200,000</div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="w-full bg-gray-900 text-white text-center py-3 rounded-xl font-bold text-sm shadow-lg shadow-gray-900/20">
            Submit for Review
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListVisual2 = () => {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex items-center gap-2">
        <div className="font-bold text-lg">Due Diligence</div>
      </div>
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold">Verification in Progress</div>
              <div className="text-xs text-gray-500">Step 2 of 4</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="text-sm font-medium">Document Verification</div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div className="text-sm font-medium">Independent Valuation</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <div className="text-sm font-medium text-blue-500">Physical Inspection</div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              <div className="text-sm font-medium">Fractional Structuring</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1">
           <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Proposed Structure</div>
           <div className="flex items-center gap-3">
             <PieChart className="w-8 h-8 text-[#49bee4]" />
             <div>
               <div className="font-bold text-sm">1/8 Shares</div>
               <div className="text-xs text-gray-500">AED 150,000 per share</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const ListVisual3 = () => {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex items-center gap-2">
        <div className="font-bold text-lg">Legal Setup</div>
      </div>
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col">
          <div className="flex items-center justify-center py-6">
            <div className="w-20 h-24 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center relative">
              <FileText className="w-10 h-10 text-blue-500" />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[8px] font-bold px-2 py-1 rounded-full border-2 border-white">
                READY
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="font-bold text-lg">Shareholder Agreement</div>
            <div className="text-xs text-gray-500 mt-1">Please review and sign the SHA to establish the Lead Owner structure.</div>
          </div>

          <div className="space-y-3 mt-auto">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#49bee4]" />
              <div className="text-xs font-medium">Lead Owner Rights Defined</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#49bee4]" />
              <div className="text-xs font-medium">Authorized User Terms</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#49bee4]" />
              <div className="text-xs font-medium">Maintenance & Insurance Rules</div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="w-full bg-gray-900 text-white text-center py-3 rounded-xl font-bold text-sm shadow-lg shadow-gray-900/20">
            Sign & Approve SHA
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListVisual4 = () => {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex justify-between items-center">
        <div className="font-bold text-lg">Seller Dashboard</div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Status */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-gray-900/20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Asset Status</div>
          <div className="font-bold text-xl mb-4 text-green-400">Live on Marketplace</div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-gray-400 mb-1">Shares Sold</div>
              <div className="font-bold text-2xl">2 <span className="text-sm text-gray-500 font-normal">/ 8</span></div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
              <PieChart className="w-6 h-6 text-[#49bee4]" />
            </div>
          </div>
        </div>

        {/* Funds */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Funds Received</div>
              <div className="font-bold text-lg">AED 300,000</div>
            </div>
          </div>
          <div className="w-full bg-gray-50 text-gray-900 text-center py-2 rounded-lg font-bold text-xs border border-gray-200">
            Withdraw to Bank
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Activity</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Share Purchased</div>
              <div className="text-xs text-gray-500">2h ago</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Share Purchased</div>
              <div className="text-xs text-gray-500">1d ago</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Asset Listed</div>
              <div className="text-xs text-gray-500">2d ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
