import React from 'react';
import { Car, ShieldCheck, Zap, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../store/language';

export const Visual1 = () => {
  const { t } = useLanguage();
  return (
  <div className="absolute inset-0 w-full h-full bg-[#0b1b34] p-4 md:p-6 flex flex-col">
    <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
      <div className="font-bold text-base md:text-lg text-white">{t('home.visuals.newListing')}</div>
      <div className="px-2 md:px-3 py-1 bg-[#49bee4]/20 text-[#49bee4] rounded-full text-[10px] md:text-xs">{t('home.visuals.draft')}</div>
    </div>
    <div className="flex gap-4 md:gap-6 flex-1">
      <div className="w-1/2 bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 flex flex-col">
        <div className="w-full flex-1 bg-white/10 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
          <Car className="w-6 h-6 md:w-8 md:h-8 text-white/30" />
        </div>
        <div className="h-3 md:h-4 w-3/4 bg-white/20 rounded mb-2"></div>
        <div className="h-2 md:h-3 w-1/2 bg-white/10 rounded"></div>
      </div>
      <div className="w-1/2 flex flex-col gap-3 md:gap-4">
        <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 flex-1">
          <div className="text-xs md:text-sm font-bold mb-2 md:mb-3 text-white">{t('home.visuals.inviteCoowners')}</div>
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20"></div>
            <div className="flex-1 h-2 md:h-3 bg-white/10 rounded"></div>
            <div className="px-1.5 md:px-2 py-0.5 md:py-1 bg-white/10 rounded text-[8px] md:text-[10px] text-white">{t('home.visuals.invited')}</div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20"></div>
            <div className="flex-1 h-2 md:h-3 bg-white/10 rounded"></div>
            <div className="px-1.5 md:px-2 py-0.5 md:py-1 bg-[#49bee4] text-[#0b1b34] rounded text-[8px] md:text-[10px] font-bold">{t('home.visuals.invite')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export const Visual2 = () => {
  const { t } = useLanguage();
  return (
  <div className="absolute inset-0 w-full h-full bg-[#0b1b34] p-4 md:p-6 flex flex-col">
    <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
      <div className="font-bold text-base md:text-lg text-white">{t('home.visuals.financials')}</div>
      <div className="text-xs md:text-sm text-gray-400">{t('home.visuals.march2026')}</div>
    </div>
    <div className="flex gap-4 md:gap-6 flex-1">
      <div className="w-1/2 flex items-center justify-center">
        <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full border-[6px] md:border-8 border-white/10 border-t-[#49bee4] border-r-[#49bee4] flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-white">25%</div>
            <div className="text-[8px] md:text-xs text-gray-400">{t('home.visuals.yourStake')}</div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center gap-2 md:gap-3">
        <div className="bg-white/5 rounded-xl p-2 md:p-3 border border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-1.5 md:gap-2">
            <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            <span className="text-xs md:text-sm text-white">{t('home.visuals.insurance')}</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-white">{t('home.visuals.aed1250')}</span>
        </div>
        <div className="bg-white/5 rounded-xl p-2 md:p-3 border border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            <span className="text-xs md:text-sm text-white">{t('home.visuals.maintenance')}</span>
          </div>
          <span className="font-bold text-xs md:text-sm text-white">{t('home.visuals.aed800')}</span>
        </div>
        <div className="mt-1 md:mt-2 text-right">
          <div className="text-[8px] md:text-xs text-gray-400 mb-0.5 md:mb-1">{t('home.visuals.yourShare25')}</div>
          <div className="text-sm md:text-xl font-bold text-[#49bee4]">{t('home.visuals.aed512')}</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export const Visual3 = () => {
  const { t } = useLanguage();
  return (
  <div className="absolute inset-0 w-full h-full bg-[#0b1b34] p-4 md:p-6 flex flex-col">
    <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
      <div className="font-bold text-base md:text-lg text-white">{t('home.visuals.calendar')}</div>
      <div className="flex gap-1.5 md:gap-2">
        <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-white/10 flex items-center justify-center"><ChevronRight className="w-3 h-3 md:w-4 md:h-4 rotate-180 text-white" /></div>
        <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-white/10 flex items-center justify-center"><ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white" /></div>
      </div>
    </div>
    <div className="grid grid-cols-7 gap-1.5 md:gap-2 flex-1 content-start">
      {[t('day.m'), t('day.t'), t('day.w'), t('day.th'), t('day.f'), t('day.s'), t('day.su')].map((d, i) => (
        <div key={i} className="text-center text-[10px] md:text-xs text-gray-400 mb-1 md:mb-2">{d}</div>
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className={`aspect-square rounded-md md:rounded-lg border border-white/5 flex items-center justify-center text-xs md:text-sm ${i === 4 || i === 5 ? 'bg-[#49bee4]/20 text-[#49bee4] border-[#49bee4]/30' : i === 8 || i === 9 || i === 10 ? 'bg-white/10 text-gray-500' : 'bg-white/5 text-white'}`}>
          {i + 1}
        </div>
      ))}
    </div>
    <div className="mt-2 md:mt-4 flex gap-3 md:gap-4 text-[10px] md:text-xs text-white">
      <div className="flex items-center gap-1.5 md:gap-2"><div className="w-2 h-2 md:w-3 md:h-3 rounded bg-[#49bee4]/20 border border-[#49bee4]/30"></div> {t('home.visuals.yourDays')}</div>
      <div className="flex items-center gap-1.5 md:gap-2"><div className="w-2 h-2 md:w-3 md:h-3 rounded bg-white/10"></div> {t('home.visuals.booked')}</div>
    </div>
  </div>
  );
};

export const Visual4 = () => {
  const { t } = useLanguage();
  return (
  <div className="absolute inset-0 w-full h-full bg-[#0b1b34] p-4 md:p-6 flex flex-col">
    <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
      <div className="font-bold text-base md:text-lg flex items-center gap-1.5 md:gap-2 text-white"><Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#49bee4]" /> {t('home.visuals.aiAgent')}</div>
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"></div>
    </div>
    <div className="flex-1 flex flex-col gap-3 md:gap-4 overflow-hidden">
      <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 max-w-[85%] md:max-w-[80%]">
        <div className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">{t('home.visuals.systemAlert')}</div>
        <div className="text-xs md:text-sm text-white">{t('home.visuals.alertMsg')}</div>
      </div>
      <div className="bg-[#49bee4]/10 rounded-xl p-3 md:p-4 border border-[#49bee4]/20 max-w-[85%] md:max-w-[80%] self-end">
        <div className="text-xs md:text-sm text-white">{t('home.visuals.userMsg')}</div>
      </div>
      <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 max-w-[85%] md:max-w-[80%]">
        <div className="text-xs md:text-sm text-white">{t('home.visuals.confirmMsg')}</div>
      </div>
    </div>
  </div>
  );
};
