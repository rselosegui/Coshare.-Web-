import React, { useRef, useState } from 'react';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { ArrowLeftRight, CalendarCheck, Sparkles, ShieldCheck, FileText, Wrench, ArrowRight, CheckCircle2, Search, Users, PieChart, Key, BatteryCharging, Truck, ShoppingBag, ClipboardCheck } from 'lucide-react';
import { VisualShare1, VisualShare2, VisualShare3, VisualShare4, VisualOwn1, VisualOwn2, VisualOwn3, VisualOwn4 } from '../components/HowItWorksVisuals';

export const HowItWorks = () => {
  const { t, lang } = useLanguage();
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

  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const formatStepNum = (n: number) => {
    const raw = `0${n + 1}`;
    return lang === 'AR' ? raw.replace(/[0-9]/g, d => arabicDigits[parseInt(d)]) : raw;
  };

  const shareStepLabels = [t('how.steps.share.label1'), t('how.steps.share.label2'), t('how.steps.share.label3'), t('how.steps.share.label4')];
  const ownStepLabels = [t('how.steps.own.label1'), t('how.steps.own.label2'), t('how.steps.own.label3'), t('how.steps.own.label4')];

  const currentStepNum = useTransform(stepIndex, v => formatStepNum(Math.floor(v)));
  const currentStepTitle = useTransform(stepIndex, v => {
    const idx = Math.floor(v);
    const labels = journey === 'share' ? shareStepLabels : ownStepLabels;
    return labels[idx] || labels[0];
  });
  const stickyHeaderOpacity = useTransform(howScrollY, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  useMotionValueEvent(stepIndex, 'change', v => setActiveStepIdx(Math.floor(v)));

  const shareSteps = [
    { icon: Key, title: t('how.share.step1.title'), description: t('how.share.step1.desc'), points: [t('how.share.step1.point1'), t('how.share.step1.point2'), t('how.share.step1.point3')], num: '01', Visual: VisualShare1 },
    { icon: Sparkles, title: t('how.share.step2.title'), description: t('how.share.step2.desc'), points: [t('how.share.step2.point1'), t('how.share.step2.point2'), t('how.share.step2.point3')], num: '02', Visual: VisualShare2 },
    { icon: Search, title: t('how.share.step3.title'), description: t('how.share.step3.desc'), points: [t('how.share.step3.point1'), t('how.share.step3.point2'), t('how.share.step3.point3')], num: '03', Visual: VisualShare3 },
    { icon: CalendarCheck, title: t('how.share.step4.title'), description: t('how.share.step4.desc'), points: [t('how.share.step4.point1'), t('how.share.step4.point2'), t('how.share.step4.point3')], num: '04', Visual: VisualShare4 }
  ];

  const ownSteps = [
    { icon: PieChart, title: t('how.own.step1.title'), description: t('how.own.step1.desc'), points: [t('how.own.step1.point1'), t('how.own.step1.point2'), t('how.own.step1.point3')], num: '01', Visual: VisualOwn1 },
    { icon: Users, title: t('how.own.step2.title'), description: t('how.own.step2.desc'), points: [t('how.own.step2.point1'), t('how.own.step2.point2'), t('how.own.step2.point3')], num: '02', Visual: VisualOwn2 },
    { icon: ShieldCheck, title: t('how.own.step3.title'), description: t('how.own.step3.desc'), points: [t('how.own.step3.point1'), t('how.own.step3.point2'), t('how.own.step3.point3')], num: '03', Visual: VisualOwn3 },
    { icon: Key, title: t('how.own.step4.title'), description: t('how.own.step4.desc'), points: [t('how.own.step4.point1'), t('how.own.step4.point2'), t('how.own.step4.point3')], num: '04', Visual: VisualOwn4 }
  ];

  const currentSteps = journey === 'share' ? shareSteps : ownSteps;

  return (
    <div className="min-h-screen bg-[#0b1b34]">
      <SEO
        title="How Coshare Works | Co-ownership, Sharing & Asset Management"
        description="Learn how Coshare lets you co-own and share high-value assets like cars, boats, and property. AI manages scheduling, usage, payments, and agreements automatically."
        canonical="https://coshare.ai/how-it-works"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Share Your Asset on Coshare",
            "description": "List your idle car, boat, or property on Coshare and earn income or Swap Credits while AI manages the entire process.",
            "url": "https://coshare.ai/how-it-works",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "List Your Asset",
                "text": "Got a car, boat, or property sitting idle? Set your availability, define custom rules, and let AI smoothly create the perfect listing for you in minutes."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Rest Easy",
                "text": "Never worry about who is using your asset. Every single user undergoes strict identity checks and continuous behavioral scoring before they can book."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Seamless Handovers",
                "text": "Sit back while our platform manages the entire process. From digital key handovers to automated condition reports before and after every trip."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Earn & Swap",
                "text": "Turn idle time into real value. Offset your ownership costs through direct earnings, or collect Swap Credits to spend on other assets in the network."
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Co-own an Asset on Coshare",
            "description": "Buy a verified fractional share of a car, boat, or property and enjoy smart AI-managed co-ownership without the full cost or hassle.",
            "url": "https://coshare.ai/how-it-works",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Buy a Share",
                "text": "Why pay 100% for something you only use 10% of the time? Browse verified real estate, boats, and cars, and buy exactly the slice you need (like 1/8th)."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Team Up Safely",
                "text": "Connect with verified co-owners in a secure environment. We handle the legal paperwork, secure payments, and insurance automatically so you don't have to."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Smart Management",
                "text": "Enjoy the asset without the stress. AI takes the friction out of ownership by fairly sharing the calendar, tracking maintenance, and automatically splitting bills."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Swap or Sell",
                "text": "You're never locked in. Release your unused days to the network for global Swap Credits, or easily list your share on our marketplace if you're ready to move on."
              }
            ]
          }
        ])}</script>
      </Helmet>

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
            <div className="flex items-center gap-1.5 mb-1">
              {(() => { const Icon = currentSteps[activeStepIdx]?.icon; return Icon ? <Icon className="w-3 h-3 text-[#49bee4] shrink-0" /> : null; })()}
              <motion.span className="text-[10px] font-bold text-[#49bee4] uppercase tracking-widest leading-none">
                {currentStepTitle}
              </motion.span>
            </div>
            <span className="text-[9px] font-medium text-white/40 uppercase tracking-[0.2em] leading-none">
              {t(journey === 'share' ? 'how.steps.journey.share' : 'how.steps.journey.own')}
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
                      {t(journey === 'share' ? 'how.steps.mode.share' : 'how.steps.mode.own')}
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
                    <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">{t(journey === 'share' ? 'how.steps.journey.share' : 'how.steps.journey.own')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Phone mockup */}
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mx-auto">
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 inset-x-0 h-6 bg-black/40 backdrop-blur-md rounded-full w-28 mx-auto z-20 border border-white/5" />
                <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative">
                  <motion.div className="absolute inset-0" style={{ opacity: img1Opacity }}>{journey === 'share' ? <VisualShare1 /> : <VisualOwn1 />}</motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img2Opacity }}>{journey === 'share' ? <VisualShare2 /> : <VisualOwn2 />}</motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img3Opacity }}>{journey === 'share' ? <VisualShare3 /> : <VisualOwn3 />}</motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img4Opacity }}>{journey === 'share' ? <VisualShare4 /> : <VisualOwn4 />}</motion.div>
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
                        className="md:min-h-[60vh] flex flex-col justify-center relative pl-0 md:pl-20 rtl:pl-0 md:rtl:pr-20 group"
                      >
                        {/* Scroll-Animated Desktop Node (F) */}
                        <motion.div
                          style={{
                            borderColor: nodeBorders[index],
                            scale: nodeScales[index],
                            boxShadow: nodeShadows[index]
                          }}
                          className="hidden md:flex absolute left-0 rtl:left-auto rtl:right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0b1b34] border-2 rounded-full items-center justify-center z-10"
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
                          {formatStepNum(index)}
                        </div>

                        <div className="relative">
                          {/* Desktop Number Background */}
                          <div className="hidden md:block absolute -left-12 -top-16 text-9xl font-display font-bold text-white/5 select-none pointer-events-none z-0 transition-colors duration-500 group-hover:text-white/10">
                            {formatStepNum(index)}
                          </div>

                          <div className="relative z-10">
                            {/* Mobile Phone per Step */}
                            <div className="flex justify-center mb-12 md:hidden">
                              <div className="w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden relative">
                                {/* Dynamic Island Notch */}
                                <div className="absolute top-1.5 inset-x-0 h-5 bg-black/40 backdrop-blur-md rounded-full w-24 mx-auto z-20 border border-white/5" />
                                <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative rounded-[2.5rem] overflow-hidden">
                                  <step.Visual />
                                </div>
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
      <section className="py-24 bg-white text-gray-900 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0b1b34] mb-6">
              {t('how.math.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('how.math.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Old Way */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 end-0 p-6 opacity-10">
                <Sparkles className="w-24 h-24 text-gray-900" />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-6">
                  {t('how.math.old.badge')}
                </div>
                <h3 className="text-2xl font-bold mb-4">100% Cost, 10% Usage</h3>
                <ul className="space-y-4">
                  {[
                    'Pay full purchase price upfront',
                    'Shoulder 100% of maintenance & insurance',
                    'Asset sits idle 90% of the year',
                    'Suffer maximum depreciation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-red-400 rounded-full me-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The Coshare Way */}
            <div className="bg-[#0b1b34] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden md:-translate-y-4">
              <div className="absolute top-0 end-0 p-6 opacity-10">
                <ShieldCheck className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-[#49bee4]/20 text-[#49bee4] rounded-full text-sm font-bold mb-6">
                  {t('how.math.new.badge')}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Smart Ownership</h3>
                <ul className="space-y-4">
                  {[
                    'Pay only for what you use (1/8th cost)',
                    'Expenses split fairly among verified co-owners',
                    'Earn credits for unused days to travel the world',
                    'Retain equity allowing you to sell your fraction',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#49bee4] me-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0b1b34] mb-6">
                {t('how.concierge.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('how.concierge.subtitle')}
              </p>

              <div className="space-y-3">
                {[
                  { icon: FileText, key: 'legal' },
                  { icon: ShieldCheck, key: 'insurance' },
                  { icon: Wrench, key: 'maintenance' },
                  { icon: ClipboardCheck, key: 'handover' },
                  { icon: Sparkles, key: 'valet' },
                  { icon: BatteryCharging, key: 'refueling' },
                  { icon: Truck, key: 'relocation' },
                  { icon: ShoppingBag, key: 'provisioning' },
                  { icon: ArrowRight, key: 'resale' },
                ].map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-start gap-4 bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0b1b34] rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#49bee4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base mb-0.5">{t(`how.concierge.${key}`)}</h4>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{t(`how.concierge.${key}Desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative md:sticky md:top-24">
              <div className="absolute inset-0 bg-[#49bee4]/10 rounded-full blur-[80px]" />
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800"
                alt="Concierge Service"
                className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -start-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl z-20 border border-gray-100 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Valet Check-in</div>
                  <div className="font-bold text-gray-900">Completed</div>
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
            className="w-full max-w-[240px] sm:w-[240px] inline-flex items-center justify-center px-8 py-4 bg-[#05A7E8] text-white rounded-full font-bold hover:bg-[#49bee4] transition-all hover:scale-105 active:scale-95 group"
          >
            {t('banner.cta')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};
