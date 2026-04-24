import React, { useRef, useState } from 'react';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, CalendarCheck, Sparkles, ShieldCheck, FileText, Wrench, ArrowRight, CheckCircle2, Search, Users, PieChart, Key } from 'lucide-react';
import { Visual1, Visual2, Visual3, Visual4 } from '../components/HowItWorksVisuals';

export const HowItWorks = () => {
  const { t } = useLanguage();
  const [journey, setJourney] = useState<'share' | 'own'>('share');

  const howRef = useRef<HTMLElement>(null);
  const { scrollYProgress: howScrollY } = useScroll({
    target: howRef,
    offset: ["start start", "end end"]
  });

  // Phone opacity transitions
  const img1Opacity = useTransform(howScrollY, [0, 0.30, 0.32], [1, 1, 0]);
  const img2Opacity = useTransform(howScrollY, [0.30, 0.32, 0.53, 0.57], [0, 1, 1, 0]);
  const img3Opacity = useTransform(howScrollY, [0.53, 0.57, 0.70, 0.82], [0, 1, 1, 0]);
  const img4Opacity = useTransform(howScrollY, [0.70, 0.82, 1], [0, 1, 1]);

  // Per-step activity values for scroll-animated nodes (F)
  const step1Active = useTransform(howScrollY, [0, 0.15, 0.30, 0.32], [0.5, 1, 1, 0.5]);
  const step2Active = useTransform(howScrollY, [0.15, 0.32, 0.53, 0.57], [0.5, 1, 1, 0.5]);
  const step3Active = useTransform(howScrollY, [0.32, 0.57, 0.70, 0.82], [0.5, 1, 1, 0.5]);
  const step4Active = useTransform(howScrollY, [0.57, 0.82, 1], [0.5, 1, 1]);

  // Pre-calculated node border colors (avoids hooks-in-map violation)
  const node1Border = useTransform(step1Active, [0.5, 1], ["rgba(255,255,255,0.1)", "rgba(73,190,228,1)"]);
  const node2Border = useTransform(step2Active, [0.5, 1], ["rgba(255,255,255,0.1)", "rgba(73,190,228,1)"]);
  const node3Border = useTransform(step3Active, [0.5, 1], ["rgba(255,255,255,0.1)", "rgba(73,190,228,1)"]);
  const node4Border = useTransform(step4Active, [0.5, 1], ["rgba(255,255,255,0.1)", "rgba(73,190,228,1)"]);
  const nodeBorders = [node1Border, node2Border, node3Border, node4Border];

  const node1Scale = useTransform(step1Active, [0.5, 1], [0.9, 1.1]);
  const node2Scale = useTransform(step2Active, [0.5, 1], [0.9, 1.1]);
  const node3Scale = useTransform(step3Active, [0.5, 1], [0.9, 1.1]);
  const node4Scale = useTransform(step4Active, [0.5, 1], [0.9, 1.1]);
  const nodeScales = [node1Scale, node2Scale, node3Scale, node4Scale];

  const node1Shadow = useTransform(step1Active, [0.5, 1], ["0px 0px 0px rgba(73,190,228,0)", "0px 0px 20px rgba(73,190,228,0.4)"]);
  const node2Shadow = useTransform(step2Active, [0.5, 1], ["0px 0px 0px rgba(73,190,228,0)", "0px 0px 20px rgba(73,190,228,0.4)"]);
  const node3Shadow = useTransform(step3Active, [0.5, 1], ["0px 0px 0px rgba(73,190,228,0)", "0px 0px 20px rgba(73,190,228,0.4)"]);
  const node4Shadow = useTransform(step4Active, [0.5, 1], ["0px 0px 0px rgba(73,190,228,0)", "0px 0px 20px rgba(73,190,228,0.4)"]);
  const nodeShadows = [node1Shadow, node2Shadow, node3Shadow, node4Shadow];

  const icon1Color = useTransform(step1Active, [0.5, 1], ["#4b5563", "#49bee4"]);
  const icon2Color = useTransform(step2Active, [0.5, 1], ["#4b5563", "#49bee4"]);
  const icon3Color = useTransform(step3Active, [0.5, 1], ["#4b5563", "#49bee4"]);
  const icon4Color = useTransform(step4Active, [0.5, 1], ["#4b5563", "#49bee4"]);
  const iconColors = [icon1Color, icon2Color, icon3Color, icon4Color];

  const pulse1Opacity = useTransform(step1Active, [0.8, 1], [0, 0.4]);
  const pulse2Opacity = useTransform(step2Active, [0.8, 1], [0, 0.4]);
  const pulse3Opacity = useTransform(step3Active, [0.8, 1], [0, 0.4]);
  const pulse4Opacity = useTransform(step4Active, [0.8, 1], [0, 0.4]);
  const pulseOpacities = [pulse1Opacity, pulse2Opacity, pulse3Opacity, pulse4Opacity];

  // Sticky header (B)
  const thresholds = [0, 0.15, 0.32, 0.57, 0.82, 1];
  const stepIndex = useTransform(howScrollY, thresholds, [0, 0, 1, 2, 3, 3]);
  const currentStepNum = useTransform(stepIndex, v => `0${Math.floor(v) + 1}`);
  const currentStepTitle = useTransform(stepIndex, v => {
    const idx = Math.floor(v);
    const titles = {
      share: ['LIST', 'CREDITS', 'BROWSE', 'BOOK'],
      own: ['FIND', 'TEAM', 'AI', 'ENJOY']
    };
    return titles[journey][idx] || titles[journey][0];
  });
  const stickyHeaderOpacity = useTransform(howScrollY, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);

  const shareSteps = [
    { icon: Key, title: t('how.share.step1.title'), description: t('how.share.step1.desc'), points: [t('how.share.step1.point1'), t('how.share.step1.point2'), t('how.share.step1.point3')], num: '01', Visual: Visual1 },
    { icon: Sparkles, title: t('how.share.step2.title'), description: t('how.share.step2.desc'), points: [t('how.share.step2.point1'), t('how.share.step2.point2'), t('how.share.step2.point3')], num: '02', Visual: Visual2 },
    { icon: Search, title: t('how.share.step3.title'), description: t('how.share.step3.desc'), points: [t('how.share.step3.point1'), t('how.share.step3.point2'), t('how.share.step3.point3')], num: '03', Visual: Visual3 },
    { icon: CalendarCheck, title: t('how.share.step4.title'), description: t('how.share.step4.desc'), points: [t('how.share.step4.point1'), t('how.share.step4.point2'), t('how.share.step4.point3')], num: '04', Visual: Visual4 }
  ];

  const ownSteps = [
    { icon: PieChart, title: t('how.own.step1.title'), description: t('how.own.step1.desc'), points: [t('how.own.step1.point1'), t('how.own.step1.point2'), t('how.own.step1.point3')], num: '01', Visual: Visual1 },
    { icon: Users, title: t('how.own.step2.title'), description: t('how.own.step2.desc'), points: [t('how.own.step2.point1'), t('how.own.step2.point2'), t('how.own.step2.point3')], num: '02', Visual: Visual2 },
    { icon: ShieldCheck, title: t('how.own.step3.title'), description: t('how.own.step3.desc'), points: [t('how.own.step3.point1'), t('how.own.step3.point2'), t('how.own.step3.point3')], num: '03', Visual: Visual3 },
    { icon: Key, title: t('how.own.step4.title'), description: t('how.own.step4.desc'), points: [t('how.own.step4.point1'), t('how.own.step4.point2'), t('how.own.step4.point3')], num: '04', Visual: Visual4 }
  ];

  const currentSteps = journey === 'share' ? shareSteps : ownSteps;

  return (
    <div className="min-h-screen bg-[#0b1b34]">
      <SEO
        title="How Coshare Works | Co-ownership, Sharing & Asset Management"
        description="Learn how Coshare lets you co-own and share high-value assets like cars, boats, and property. AI manages scheduling, usage, payments, and agreements automatically."
        canonical="https://coshare.ai/how-it-works"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 md:pt-48 md:pb-64 overflow-hidden bg-[#0b1b34] rounded-b-[60px] md:rounded-b-[100px] z-10 shadow-2xl shadow-[#0b1b34]/20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A7E8]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            {t('how.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {t('how.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Journey Toggle — overlaps hero bottom (A) */}
      <div className="relative z-30 -mt-24 md:-mt-32 mb-12 flex justify-center">
        <div className="inline-flex bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl shadow-black/20">
          <button
            onClick={() => setJourney('share')}
            className={`relative px-8 sm:px-12 py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${journey === 'share' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
          >
            {journey === 'share' && (
              <motion.div
                layoutId="journeyIndicator"
                className="absolute inset-0 bg-[#256ab1] rounded-full shadow-lg"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{t('how.toggle.share')}</span>
          </button>
          <button
            onClick={() => setJourney('own')}
            className={`relative px-8 sm:px-12 py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${journey === 'own' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
          >
            {journey === 'own' && (
              <motion.div
                layoutId="journeyIndicator"
                className="absolute inset-0 bg-[#256ab1] rounded-full shadow-lg"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{t('how.toggle.own')}</span>
          </button>
        </div>
      </div>

      {/* Sticky Mobile Step Header (B) */}
      <motion.div
        style={{ opacity: stickyHeaderOpacity }}
        className="sticky top-20 left-0 right-0 z-40 py-4 px-6 md:hidden border-b border-white/5 bg-[#0b1b34]/80 backdrop-blur-md pointer-events-none"
      >
        <div className="flex items-center gap-4">
          <motion.span className="text-2xl font-display font-bold text-[#49bee4]">
            {currentStepNum}
          </motion.span>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex flex-col">
            <motion.span className="text-[10px] font-bold text-[#49bee4] uppercase tracking-widest leading-none mb-1">
              {currentStepTitle}
            </motion.span>
            <span className="text-[9px] font-medium text-white/40 uppercase tracking-[0.2em] leading-none">
              {journey === 'share' ? 'CO-SHARE JOURNEY' : 'CO-OWN JOURNEY'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Scrolling Steps Section */}
      <section
        id="how-it-works"
        ref={howRef}
        className="bg-[#0b1b34] text-white relative py-16 md:py-24 scroll-mt-20"
      >
        {/* Swipe gesture wrapper (C) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.05}
          dragMomentum={false}
          style={{ touchAction: 'pan-y' }}
          onDragEnd={(_, info) => {
            const threshold = 50;
            if (info.offset.x > threshold && journey === 'own') setJourney('share');
            else if (info.offset.x < -threshold && journey === 'share') setJourney('own');
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 touch-pan-y relative"
        >
          {/* Swipe Hint Badge (Mobile) */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#49bee4]/10 border border-[#49bee4]/20 rounded-full">
              <ArrowLeftRight className="w-3 h-3 text-[#49bee4]" />
              <span className="text-[10px] font-bold text-[#49bee4] uppercase tracking-widest">Swipe to switch journey</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Left: Sticky Phone */}
            <div className="hidden md:flex w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex-col justify-center z-10">

              {/* Vertical Blueprint Label — large desktops (D) */}
              <motion.div
                style={{ opacity: stickyHeaderOpacity }}
                className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center hidden lg:block pointer-events-none"
              >
                <div className="flex items-center gap-6 whitespace-nowrap">
                  <motion.span className="text-7xl font-display font-bold text-[#49bee4]/20 italic">{currentStepNum}</motion.span>
                  <div className="flex flex-col">
                    <motion.span className="text-sm font-bold text-[#49bee4] uppercase tracking-[0.4em] leading-none mb-2">
                      {currentStepTitle}
                    </motion.span>
                    <span className="text-[10px] font-medium text-white/30 uppercase tracking-[0.3em] leading-none">
                      {journey === 'share' ? 'MODE: CO-SHARE' : 'MODE: CO-OWN'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Vertical Blueprint Label — medium desktops (D) */}
              <motion.div
                style={{ opacity: stickyHeaderOpacity }}
                className="mb-8 lg:hidden hidden md:block"
              >
                <div className="inline-flex items-center gap-4 border-l-2 border-[#49bee4] pl-4 py-1">
                  <motion.span className="text-3xl font-display font-bold text-[#49bee4]">{currentStepNum}</motion.span>
                  <div className="flex flex-col">
                    <motion.span className="text-[10px] font-bold text-white uppercase tracking-widest">{currentStepTitle}</motion.span>
                    <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">{journey === 'share' ? 'CO-SHARE' : 'CO-OWN'}</span>
                  </div>
                </div>
              </motion.div>

              {/* Phone mockup */}
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mx-auto">
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 inset-x-0 h-6 bg-black/40 backdrop-blur-md rounded-full w-28 mx-auto z-20 border border-white/5" />
                <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative">
                  <motion.div className="absolute inset-0" style={{ opacity: img1Opacity }}><Visual1 /></motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img2Opacity }}><Visual2 /></motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img3Opacity }}><Visual3 /></motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img4Opacity }}><Visual4 /></motion.div>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Steps */}
            <div className="w-full md:w-1/2 relative pb-16 md:pb-[5vh] md:pt-[5vh]">
              {/* Progress Line Background */}
              <div className="absolute left-[27px] rtl:left-auto rtl:right-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-white/10 hidden md:block" />
              {/* Animated Gradient Progress Rail */}
              <motion.div
                className="absolute left-[27px] rtl:left-auto rtl:right-[27px] top-[5vh] bottom-[5vh] w-[4px] bg-gradient-to-b from-[#49bee4] via-[#256ab1] to-[#49bee4] origin-top hidden md:block rounded-full shadow-[0_0_15px_rgba(73,190,228,0.3)]"
                style={{ scaleY: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : howScrollY }}
              />

              <div className="flex flex-col gap-24 md:gap-0">
                <AnimatePresence>
                  <motion.div
                    key={`content-${journey}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col"
                  >
                    {currentSteps.map((step, index) => (
                      <motion.div
                        key={`${journey}-${index}`}
                        initial={{ opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0.3 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, margin: "-20% 0px" }}
                        transition={{ duration: 0.4 }}
                        className="md:min-h-[60vh] flex flex-col justify-center relative pl-0 md:pl-20 rtl:pl-0 rtl:pr-20 group"
                      >
                        {/* Scroll-Animated Desktop Node (F) */}
                        <motion.div
                          style={{
                            borderColor: nodeBorders[index],
                            scale: nodeScales[index],
                            boxShadow: nodeShadows[index]
                          }}
                          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0b1b34] border-2 rounded-full items-center justify-center z-10"
                        >
                          <motion.div style={{ color: iconColors[index] }}>
                            <step.icon className="w-6 h-6" />
                          </motion.div>
                          {/* Pulsing Ring */}
                          <motion.div
                            style={{ opacity: pulseOpacities[index] }}
                            className="absolute inset-0 rounded-full border-4 border-[#49bee4] animate-pulse"
                          />
                        </motion.div>

                        {/* Mobile Number */}
                        <div className="text-6xl font-display font-bold text-white/5 mb-4 md:hidden -mt-4">
                          {step.num}
                        </div>

                        <div className="relative">
                          {/* Desktop Number Background */}
                          <div className="hidden md:block absolute -left-12 -top-16 text-9xl font-display font-bold text-white/5 select-none pointer-events-none z-0 transition-colors duration-500 group-hover:text-white/10">
                            {step.num}
                          </div>

                          <div className="relative z-10">
                            {/* Mobile Phone per Step */}
                            <div className="w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mb-12 md:hidden relative mx-auto">
                              {/* Dynamic Island Notch */}
                              <div className="absolute top-1.5 inset-x-0 h-5 bg-black/40 backdrop-blur-md rounded-full w-24 mx-auto z-20 border border-white/5" />
                              <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative rounded-[2.5rem] overflow-hidden">
                                <step.Visual />
                              </div>
                            </div>

                            {/* Mobile Icon Badge */}
                            <div className="w-16 h-16 bg-[#1a2b4c] rounded-2xl flex items-center justify-center mb-4 border border-white/10 md:hidden">
                              <step.icon className="w-8 h-8 text-[#49bee4]" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white md:pt-8">{step.title}</h3>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6">{step.description}</p>

                            {/* CheckCircle2 Bullet Points (G) */}
                            <ul className="space-y-3 list-none pl-0">
                              {step.points.map((point, i) => (
                                <li key={i} className="text-sm md:text-base text-gray-300 flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-[#49bee4] mt-1 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Financial Advantage Section */}
      <section className="py-24 bg-[#1a2b4c] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{t('how.math.title')}</h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light">{t('how.math.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#0b1b34] rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('how.math.traditional')}</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-400">{t('how.math.purchase')}</span>
                  <span className="text-white font-bold">{t('how.math.100')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-400">{t('how.math.depreciation')}</span>
                  <span className="text-red-400 font-bold">{t('how.math.100')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-400">{t('how.math.maintenance')}</span>
                  <span className="text-red-400 font-bold">{t('how.math.high')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t('how.math.utilization')}</span>
                  <span className="text-gray-500 font-bold">{t('how.math.low')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#05A7E8]/20 to-[#49bee4]/10 rounded-3xl p-8 border border-[#49bee4]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#49bee4]/20 blur-3xl rounded-full" />
              <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('how.math.coshare')}</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300">{t('how.math.purchase')}</span>
                  <span className="text-[#49bee4] font-bold">{t('how.math.12')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300">{t('how.math.depreciation')}</span>
                  <span className="text-[#49bee4] font-bold">{t('how.math.12')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300">{t('how.math.maintenance')}</span>
                  <span className="text-[#49bee4] font-bold">{t('how.math.split')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('how.math.utilization')}</span>
                  <span className="text-[#49bee4] font-bold">{t('how.math.optimized')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red-Carpet Concierge Section (I) */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0b1b34] mb-6">
                {t('how.concierge.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('how.concierge.subtitle')}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <Wrench className="w-8 h-8 text-[#05A7E8] mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">{t('how.concierge.maintenance')}</h4>
                  <p className="text-sm text-gray-500">{t('how.concierge.maintenanceDesc')}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <ShieldCheck className="w-8 h-8 text-[#05A7E8] mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">{t('how.concierge.legal')}</h4>
                  <p className="text-sm text-gray-500">{t('how.concierge.legalDesc')}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <FileText className="w-8 h-8 text-[#05A7E8] mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">{t('how.concierge.insurance')}</h4>
                  <p className="text-sm text-gray-500">{t('how.concierge.insuranceDesc')}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <Sparkles className="w-8 h-8 text-[#05A7E8] mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">{t('how.concierge.storage')}</h4>
                  <p className="text-sm text-gray-500">{t('how.concierge.storageDesc')}</p>
                </div>
              </div>
            </div>

            <div>
              {/* Image with floating cards (desktop) */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#49bee4]/10 rounded-full blur-[80px]" />
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800"
                  alt="Concierge Service"
                  className="relative z-10 w-full h-[400px] sm:h-[500px] object-cover rounded-[2.5rem] shadow-2xl"
                  loading="lazy"
                />

                {/* Floating Card 1 — desktop only */}
                <div className="absolute -start-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl z-20 border border-gray-100 hidden sm:flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Valet Check-in</div>
                    <div className="font-bold text-gray-900">Completed</div>
                  </div>
                </div>

                {/* Floating Card 2 — desktop only */}
                <div className="absolute -end-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl z-20 border border-gray-100 hidden sm:flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#49bee4]/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#49bee4]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Insurance</div>
                    <div className="font-bold text-gray-900">Active & Covered</div>
                  </div>
                </div>
              </div>

              {/* Floating Cards — mobile, side-by-side below image */}
              <div className="sm:hidden flex gap-3 mt-4">
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Valet Check-in</div>
                    <div className="text-sm font-bold text-gray-900">Completed</div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#49bee4]/10 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#49bee4]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Insurance</div>
                    <div className="text-sm font-bold text-gray-900">Active & Covered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#1a2b4c] to-[#0b1b34]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{t('how.cta.title')}</h2>
          <p className="text-base md:text-lg text-gray-400 mb-10 font-light">{t('how.cta.desc')}</p>
          <a
            href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#05A7E8] text-white rounded-full font-bold hover:bg-[#49bee4] transition-all hover:scale-105 active:scale-95 group"
          >
            {t('banner.cta')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};
