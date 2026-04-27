import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import {
  ArrowRight, CalendarCheck, Search, Sparkles,
  Plus, Minus, ShieldCheck,
  Car, Plane, Home as HomeIcon, Wallet,
  ChevronDown, Key, Users, PieChart, ArrowLeftRight, CheckCircle2
} from 'lucide-react';
import { Visual1, Visual2, Visual3, Visual4 } from '../components/HowItWorksVisuals';
import { WhyCoshare } from '../components/WhyCoshare';
import { cn } from '../utils/cn';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false); // Cleaned up namespace

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h4 className="text-lg font-bold text-[#0b1b34] group-hover:text-[#256ab1] transition-colors">
          {question}
        </h4>
        {isOpen ? <Minus className="w-5 h-5 text-[#256ab1]" /> : <Plus className="w-5 h-5 text-gray-400" />}
      </button>

      {/* Required for the slide-up animation to work */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} // Added exit animation
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden" // Prevents lag by clipping render area
          >
            <div className="mt-2 text-gray-600 leading-relaxed pb-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQItemDark = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left py-2"
      >
        <h4 className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#49bee4]' : 'text-white'}`}>
          {question}
        </h4>
        <span className="text-2xl text-[#49bee4] ml-4 w-6 text-center">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-2 pb-2' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="text-gray-400 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  // Use useMemo to prevent the array from being re-created on every scroll/render
  const useCasesData = useMemo(() => [
    {
      icon: Car,
      title: t('home.useCases.1.title'),
      description: t('home.useCases.1.desc'),
      image: "/assets/the-smart-sharer.jpeg"
    },
    {
      icon: Wallet,
      title: t('home.useCases.2.title'),
      description: t('home.useCases.2.desc'),
      image: "/assets/the-swap-explorer.jpeg"
    },
    {
      icon: Plane,
      title: t('home.useCases.3.title'),
      description: t('home.useCases.3.desc'),
      image: "/assets/the-fractional-owner.jpeg"
    },
    {
      icon: HomeIcon,
      title: t('home.useCases.4.title'),
      description: t('home.useCases.4.desc'),
      image: "/assets/the-everday-optimizer.jpeg"
    }
  ], [t]); // Only recalculate if translations change

  // Preload all use case images on mount so accordion/desktop switch is instant
  useEffect(() => {
    useCasesData.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUseCaseClick = (index: number) => {
    setActiveUseCase(index);
    setMobileExpanded(mobileExpanded === index ? null : index);
  };

  const [activeTab, setActiveTab] = useState<'share' | 'own'>('share');

  const [heroSlide, setHeroSlide] = useState(0);
  const prevHeroSlideRef = useRef(-1);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const heroSlides = useMemo(() => [
    { image: '/assets/yacht-slide1.jpeg',       text: t('home.hero.owner1.text'),   type: 'owner'   as const, pos: '65% 35%'  },
    { image: '/assets/4x4-slide2.jpeg',         text: t('home.hero.dreamer1.text'), type: 'dreamer' as const, pos: '65% 50%'  },
    { image: '/assets/gt3-slide3.jpeg',         text: t('home.hero.owner2.text'),   type: 'owner'   as const, pos: '70% 35%'  },
    { image: '/assets/efoil-slide4.jpeg',       text: t('home.hero.dreamer2.text'), type: 'dreamer' as const, pos: '35% 50%'  },
    { image: '/assets/harley-slide5.jpeg',      text: t('home.hero.owner3.text'),   type: 'owner'   as const, pos: '50% 35%'  },
    { image: '/assets/convertible-slide6.jpeg', text: t('home.hero.dreamer3.text'), type: 'dreamer' as const, pos: '40% 50%'  },
    { image: '/assets/beach-house-slide7.jpeg', text: t('home.hero.owner4.text'),   type: 'owner'   as const, pos: '45% 50%'  },
    { image: '/assets/speedBoat-slide8.jpeg',   text: t('home.hero.dreamer4.text'), type: 'dreamer' as const, pos: '65% 50%'  },
  ], [t]);

  // Preload remaining slides into browser cache without DOM preload hints
  useEffect(() => {
    heroSlides.slice(1).forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Restartable auto-advance — called on mount and on every manual dot click
  const startSlideTimer = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      setHeroSlide(prev => {
        prevHeroSlideRef.current = prev;
        return (prev + 1) % heroSlides.length;
      });
    }, 6000);
  }, [heroSlides.length]);

  useEffect(() => {
    startSlideTimer();
    return () => { if (slideTimerRef.current) clearInterval(slideTimerRef.current); };
  }, [startSlideTimer]);

  // HOW IT WORKS (Sticky Phone Logic)
  const howRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: howScrollY } = useScroll({
    target: howRef,
    offset: ["start start", "end end"]
  });

  const img1Opacity = useTransform(howScrollY, [0, 0.22, 0.25], [1, 1, 0]);
  const img2Opacity = useTransform(howScrollY, [0.22, 0.25, 0.47, 0.5], [0, 1, 1, 0]);
  const img3Opacity = useTransform(howScrollY, [0.47, 0.5, 0.72, 0.75], [0, 1, 1, 0]);
  const img4Opacity = useTransform(howScrollY, [0.72, 0.75, 1], [0, 1, 1]);

  const step1Active = useTransform(howScrollY, [0, 0.10, 0.22, 0.25], [0.5, 1, 1, 0.5]);
  const step2Active = useTransform(howScrollY, [0.10, 0.25, 0.47, 0.50], [0.5, 1, 1, 0.5]);
  const step3Active = useTransform(howScrollY, [0.25, 0.50, 0.72, 0.75], [0.5, 1, 1, 0.5]);
  const step4Active = useTransform(howScrollY, [0.50, 0.75, 1], [0.5, 1, 1]);

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

  const homeStepIndex = useTransform(howScrollY, [0, 0.10, 0.25, 0.50, 0.75, 1], [0, 0, 1, 2, 3, 3]);

  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const formatStepNum = (n: number) => {
    const raw = `0${n + 1}`;
    return lang === 'AR' ? raw.replace(/[0-9]/g, d => arabicDigits[parseInt(d)]) : raw;
  };

  const shareStepLabels = [t('how.steps.share.label1'), t('how.steps.share.label2'), t('how.steps.share.label3'), t('how.steps.share.label4')];
  const ownStepLabels = [t('how.steps.own.label1'), t('how.steps.own.label2'), t('how.steps.own.label3'), t('how.steps.own.label4')];

  const currentStepNum = useTransform(homeStepIndex, v => formatStepNum(Math.floor(v)));
  const currentStepTitle = useTransform(homeStepIndex, v => {
    const idx = Math.floor(v);
    const labels = activeTab === 'share' ? shareStepLabels : ownStepLabels;
    return labels[idx] || labels[0];
  });
  const stickyHeaderOpacity = useTransform(howScrollY, [0, 0.10, 0.90, 1], [0, 1, 1, 0]);

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  useMotionValueEvent(homeStepIndex, 'change', v => setActiveStepIdx(Math.floor(v)));

  const scrollToStep = (index: number) => {
    const element = document.getElementById(`step-${activeTab}-${index}`);
    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - (window.innerHeight / 2) + (element.clientHeight / 2);
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

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

  const currentSteps = activeTab === 'share' ? shareSteps : ownSteps;

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Coshare: My Hub | Share, Swap & Co-own Cars, Boats, Property & More"
        description="Coshare is the platform to share, swap, and co-own assets — cars, boats, properties and more. List what you own. Access what you want. AI manages everything."
        canonical="https://coshare.ai"
      />
      {/* Hero Section */}
      <section
        className="relative h-[100svh] overflow-hidden"
        onTouchStart={e => { touchStartXRef.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchStartXRef.current === null) return;
          const diff = touchStartXRef.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) < 50) return;
          const next = diff > 0
            ? (heroSlide + 1) % heroSlides.length
            : (heroSlide - 1 + heroSlides.length) % heroSlides.length;
          prevHeroSlideRef.current = heroSlide;
          setHeroSlide(next);
          startSlideTimer();
          touchStartXRef.current = null;
        }}
      >
        <style>{`@keyframes heroIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

        {/* Previous slide */}
        {prevHeroSlideRef.current >= 0 && (
          <div key={`prev-${heroSlide}`} className="absolute inset-0 z-0">
            <img src={heroSlides[prevHeroSlideRef.current].image} alt="" className="w-full h-full object-cover" style={{ objectPosition: heroSlides[prevHeroSlideRef.current].pos }} loading="lazy" decoding="async" />
          </div>
        )}

        {/* Current slide */}
        <div
          key={`curr-${heroSlide}`}
          className="absolute inset-0 z-10"
          style={{ animation: prevHeroSlideRef.current < 0 ? 'none' : 'heroIn 1.2s ease-in-out forwards' }}
        >
          <img
            src={heroSlides[heroSlide].image}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: heroSlides[heroSlide].pos }}
            loading="eager"
            fetchPriority={heroSlide === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        </div>

        {/* Dark gradient overlay — improves text contrast on bright slides */}
        <div className="absolute inset-0 z-[15] bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-52 md:pb-44 flex flex-col items-center text-center">
          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${heroSlide}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mb-5"
            >
              <p
                className="text-3xl md:text-3xl lg:text-5xl font-display font-semibold text-white leading-snug max-w-3xl"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
              >
                "{heroSlides[heroSlide].text}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex gap-1.5 mb-5" dir="ltr">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { prevHeroSlideRef.current = heroSlide; setHeroSlide(i); startSlideTimer(); }}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === heroSlide ? 'w-8 bg-[#49bee4]' : 'w-3 bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Resolution */}
          <div className="mb-8">
            <p
              className="text-xs font-bold tracking-[0.4em] text-white/70 uppercase mb-2"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
            >
              {t('home.hero.resolution.row1')}
            </p>
            <h1
              className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-none"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
            >
              {t('home.hero.resolution.row2')}
            </h1>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <a
              href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:px-7 sm:py-3.5 bg-[#256ab1] text-white text-sm sm:text-base font-bold rounded-full hover:bg-[#1a4b82] active:scale-95 transition-all shadow-lg"
            >
              {t('home.hero.start')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 sm:px-7 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm sm:text-base font-bold rounded-full hover:bg-white/30 active:scale-95 transition-all"
            >
              {t('nav.howItWorks')}
            </button>
          </div>
        </div>
      </section>

      {/* Why Coshare — title floats at hero / why-coshare boundary */}
      <div className="relative z-30 -mt-20 md:-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4 text-balance">
              {t('home.why.title').split('Coshare.')[0]}
              <span dir="ltr" className="inline-block">Coshare<span className="text-[#05A7E8]">.</span></span>
              {t('home.why.title').split('Coshare.')[1]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl text-balance mx-auto">
              {t('home.why.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <WhyCoshare />

      {/* Sticky Mobile Step Header */}
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
              {t(activeTab === 'share' ? 'how.steps.journey.share' : 'how.steps.journey.own')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* How it works - Scrolling Version */}
      <section id="how-it-works" ref={howRef} className="bg-[#0b1b34] text-white relative pt-10 md:pt-24 pb-28 md:pb-40">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.05}
          dragMomentum={false}
          style={{ touchAction: 'pan-y' }}
          onDragEnd={(_, info) => {
            const dist = Math.abs(info.offset.x);
            const vel = Math.abs(info.velocity.x);
            if (dist < 60 && vel < 300) return;
            if (info.offset.x > 0 && activeTab === 'own') setActiveTab('share');
            else if (info.offset.x < 0 && activeTab === 'share') setActiveTab('own');
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 touch-pan-y"
        >
          {/* Swipe Hint Badge (Mobile) */}
          <div className="md:hidden flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#49bee4]/10 border border-[#49bee4]/20 rounded-full">
              <ArrowLeftRight className="w-3 h-3 text-[#49bee4]" />
              <span className="text-[10px] font-bold text-[#49bee4] uppercase tracking-widest">Swipe to switch journey</span>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="mb-8 md:mb-16 text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">{t('home.how.title')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl text-balance mb-8">{t('home.how.subtitle')}</p>
            <div className="inline-flex bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full relative z-20">
              <button
                onClick={() => setActiveTab('share')}
                className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'share' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
              >
                {activeTab === 'share' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#256ab1] rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{t('how.toggle.share')}</span>
              </button>
              <button
                onClick={() => setActiveTab('own')}
                className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'own' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
              >
                {activeTab === 'own' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#256ab1] rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{t('how.toggle.own')}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Left: Sticky Content (DESKTOP ONLY) */}
            <div className="hidden md:flex w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex-col justify-center z-10">

              {/* Vertical Blueprint Label — large desktops */}
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
                      {t(activeTab === 'share' ? 'how.steps.mode.share' : 'how.steps.mode.own')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Vertical Blueprint Label — medium desktops */}
              <motion.div
                style={{ opacity: stickyHeaderOpacity }}
                className="mb-8 lg:hidden hidden md:block"
              >
                <div className="inline-flex items-center gap-4 border-l-2 border-[#49bee4] pl-4 py-1">
                  <motion.span className="text-3xl font-display font-bold text-[#49bee4]">{currentStepNum}</motion.span>
                  <div className="flex flex-col">
                    <motion.span className="text-[10px] font-bold text-white uppercase tracking-widest">{currentStepTitle}</motion.span>
                    <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">{t(activeTab === 'share' ? 'how.steps.journey.share' : 'how.steps.journey.own')}</span>
                  </div>
                </div>
              </motion.div>

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

              <div className="flex flex-col gap-10 md:gap-0">
                <AnimatePresence>
                  <motion.div
                    key={`content-${activeTab}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {currentSteps.map((step, index) => (
                      <motion.div
                        key={`${activeTab}-${index}`}
                        id={`step-${activeTab}-${index}`}
                        initial={{ opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0.3 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, margin: "-20% 0px" }}
                        transition={{ duration: 0.4 }}
                        className="md:min-h-[60vh] flex flex-col justify-center relative pl-0 md:pl-20 rtl:pl-0 rtl:pr-20 group"
                      >
                        {/* Mobile Number */}
                        <div className="text-6xl font-display font-bold text-white/5 mb-4 md:hidden -mt-4">
                          {formatStepNum(index)}
                        </div>

                        {/* Scroll-Animated Desktop Node */}
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
                          <motion.div
                            style={{ opacity: pulseOpacities[index] }}
                            className="absolute inset-0 rounded-full border-4 border-[#49bee4] animate-pulse"
                          />
                        </motion.div>

                        <div className="relative">
                          {/* Desktop Number Background */}
                          <div className="hidden md:block absolute -left-12 -top-16 text-9xl font-display font-bold text-white/5 select-none pointer-events-none z-0 transition-colors duration-500 group-hover:text-white/10">
                            {formatStepNum(index)}
                          </div>

                          <div className="relative z-10">
                            {/* Mobile Image */}
                            <div className="w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mb-12 md:hidden relative mx-auto">
                              {/* Dynamic Island Notch */}
                              <div className="absolute top-1.5 inset-x-0 h-5 bg-black/40 backdrop-blur-md rounded-full w-24 mx-auto z-20 border border-white/5" />
                              <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative rounded-[2.5rem] overflow-hidden">
                                <step.Visual />
                              </div>
                            </div>

                            <div className="w-16 h-16 bg-[#1a2b4c] rounded-2xl flex items-center justify-center mb-6 border border-white/10 md:hidden">
                              <step.icon className="w-8 h-8 text-[#49bee4]" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-white md:pt-8">{step.title}</h3>
                            <p className="text-xl text-gray-400 leading-relaxed mb-6">{step.description}</p>

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

              <div className="mt-12 text-left pl-0 md:pl-20">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center text-[#49bee4] font-bold hover:text-white transition-colors"
                >
                  {t('home.how.learnMore')}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Use Cases — title floats at how-it-works / use-cases boundary */}
      <div className="relative z-30 -mt-20 md:-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-[#0b1b34]">{t('home.useCases.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('home.useCases.subtitle')}</p>
          </motion.div>
        </div>
      </div>

      {/* Use Cases */}
      <section id="use-cases" className="pt-8 md:pt-16 pb-12 md:pb-16 bg-[#f8f9fa] text-[#0b1b34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Fast Buttons */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {useCasesData.map((useCase, index) => {
                const isActive = activeUseCase === index;
                return (
                  <div key={index} className="flex flex-col">
                    <button
                      onClick={() => {
                        // Wrapping in startTransition kills the 296ms INP lag
                        React.startTransition(() => {
                          handleUseCaseClick(index);
                        });
                      }}
                      className={`p-5 rounded-2xl border transition-colors duration-150 flex items-center justify-between ${isActive ? 'bg-white border-[#256ab1]/30 shadow-sm' : 'bg-gray-50/50 border-gray-200'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#256ab1] text-white' : 'bg-gray-200 text-[#256ab1]'
                          }`}>
                          <useCase.icon className="w-5 h-5" />
                        </div>
                        <span className={`font-bold ${isActive ? 'text-[#0b1b34]' : 'text-gray-400'}`}>
                          {useCase.title}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 lg:hidden transition-transform ${mobileExpanded === index ? 'rotate-180' : ''}`} />
                    </button>

                    {/* MOBILE ACCORDION: Pure React rendering (No Framer Motion) */}
                    {mobileExpanded === index && (
                      <div className="lg:hidden mt-2 bg-white rounded-2xl border border-gray-100 shadow-inner overflow-hidden">
                        <div className="w-full h-48 relative bg-gray-200 overflow-hidden">
                          <img
                            src={useCase.image}
                            className="w-full h-full object-cover"
                            alt=""
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                        <div className="p-4 bg-[#0b1b34] text-white">
                          <p className="text-sm leading-relaxed text-gray-200">{useCase.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: DESKTOP ONLY */}
            <div className="hidden lg:block w-full lg:w-2/3 rounded-3xl overflow-hidden border border-gray-200">
              {/* Fixed aspect ratio prevents layout shift while images load */}
              <div className="relative w-full aspect-[16/10] bg-gray-200">
                {useCasesData.map((uc, i) => (
                  <img
                    key={i}
                    src={uc.image}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === activeUseCase ? 'opacity-100' : 'opacity-0'}`}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                ))}
              </div>
              <div className="px-8 py-6 bg-[#0b1b34]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#49bee4] mb-2 transition-all duration-300">
                  {useCasesData[activeUseCase].title}
                </p>
                <p className="text-base md:text-lg text-white font-medium leading-relaxed transition-all duration-300">
                  {useCasesData[activeUseCase].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO/GEO */}
      <section
        id="faq"
        className="pt-8 md:pt-16 pb-16 md:pb-24 bg-[#0b1b34] relative overflow-hidden"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '500px'
        }}
      >
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none translate-y-1/2 translate-x-1/3 opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(73,190,228,0.2) 0%, rgba(73,190,228,0) 70%)'
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">{t('home.faq.title')}</h2>
            <p className="text-gray-400 text-balance">{t('home.faq.subtitle')}</p>
          </div>
          <div className="space-y-2">
            <FAQItemDark
              question={t('home.faq.1.q')}
              answer={t('home.faq.1.a')}
            />
            <FAQItemDark
              question={t('home.faq.2.q')}
              answer={t('home.faq.2.a')}
            />
            <FAQItemDark
              question={t('home.faq.3.q')}
              answer={t('home.faq.3.a')}
            />
            <FAQItemDark
              question={t('home.faq.4.q')}
              answer={t('home.faq.4.a')}
            />
            <FAQItemDark
              question={t('home.faq.7.q')}
              answer={t('home.faq.7.a')}
            />
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center px-8 py-4 bg-[#256ab1] border border-transparent text-white font-bold rounded-full hover:bg-[#1a4b82] transition-all hover:scale-105 active:scale-95 shadow-sm group"
            >
              {t('home.faq.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* App Launch CTA Section */}
      <section className="py-16 md:py-24 bg-[#f8f9fa] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#05A7E8]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#49bee4]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-6 leading-tight text-balance">
                {t('home.cta.title1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A7E8] to-[#49bee4]">{t('home.cta.title2')}</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-10 max-w-lg font-light leading-relaxed text-balance">
                {t('home.cta.desc')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-[#0b1b34] text-white rounded-full font-bold hover:bg-[#1a2b4c] transition-all hover:scale-105 active:scale-95 group shadow-xl shadow-[#0b1b34]/10 animate-pulse"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mr-3 flex-shrink-0"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.002 1.459 2.196 3.1 3.775 3.046 1.522-.06 2.093-1.001 3.93-1.001 1.838 0 2.365.998 3.96.96 1.62-.027 2.667-1.48 3.662-2.928 1.147-1.676 1.612-3.3 1.638-3.385-.034-.015-3.149-1.205-3.184-4.81-.026-3.003 2.454-4.444 2.568-4.512-1.404-2.059-3.57-2.285-4.33-2.342-1.89-.161-3.112 1.003-3.608 1.003-.497 0-1.666-.889-3.01-.889h.01zm2.32-4.144c.854-1.034 1.43-2.473 1.272-3.911-1.235.05-2.732.823-3.618 1.853-.793.916-1.484 2.387-1.296 3.788 1.378.107 2.788-.696 3.642-1.73z" />
                  </svg>

                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-gray-300 font-medium leading-none">
                      {t('home.cta.downloadOn')}
                    </div>
                    <div className="text-sm font-bold leading-tight mt-1">
                      {t('home.cta.appStore')}
                    </div>
                  </div>
                </a>

                <div
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gray-100 border border-gray-200 text-gray-400 rounded-full font-bold cursor-not-allowed group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.22-.28.15-.4.54-.22.85L6.4 9.48C2.84 11.58.52 15.41.05 19.81h23.9c-.47-4.4-2.79-8.23-6.35-10.33zm-10.4 7.14c-.65 0-1.17-.51-1.17-1.15 0-.65.52-1.16 1.17-1.16.64 0 1.17.51 1.17 1.16 0 .64-.53 1.15-1.17 1.15zm9.6 0c-.65 0-1.17-.51-1.17-1.15 0-.65.52-1.16 1.17-1.16.64 0 1.17.51 1.17 1.16 0 .64-.53 1.15-1.17 1.15z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-bold leading-none">{t('home.cta.getItOn')}</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-[#256ab1] flex items-center justify-center text-white text-xs font-bold z-10">
                    +50
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-[#0b1b34] font-bold">{t('home.cta.earlyAdopters')}</span><br />
                  {t('home.cta.alreadyCoOwning')}
                </div>
              </div>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* 1. TOP RIGHT on Mobile / TOP LEFT on Desktop */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "absolute bg-white/80 backdrop-blur-xl border border-gray-200 p-2 sm:p-4 rounded-2xl shadow-xl z-20 transition-all",
                  // MOBILE: Pin to top edge, stick to the RIGHT outside edge
                  "top-5 left-[75%] scale-[0.6] origin-left",
                  // DESKTOP: Revert to your "Perfect" Left position
                  "md:top-20 md:left-auto md:-left-12 md:scale-100 md:origin-center"
                )}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-[10px] sm:text-xs text-gray-500">{t('home.cta.assetInsured')}</div>
                    <div className="text-[11px] sm:text-sm font-bold text-[#0b1b34]">{t('home.cta.fullyCovered')}</div>
                  </div>
                </div>
              </motion.div>

              {/* 2. BOTTOM LEFT on Mobile / BOTTOM RIGHT on Desktop */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className={cn(
                  "absolute bg-white/80 backdrop-blur-xl border border-gray-200 p-2 sm:p-4 rounded-2xl shadow-xl z-20 transition-all",
                  // MOBILE: Pin to bottom edge, stick to the LEFT outside edge
                  "bottom-10 right-[70%] scale-[0.6] origin-right",
                  // DESKTOP: Revert to your "Perfect" Right position
                  "md:bottom-10 md:right-auto md:-right-8 md:scale-100 md:origin-center"
                )}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#256ab1]/20 rounded-full flex items-center justify-center">
                    <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#256ab1]" />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-[10px] sm:text-xs text-gray-500">{t('home.cta.nextBooking')}</div>
                    <div className="text-[11px] sm:text-sm font-bold text-[#0b1b34]">{t('home.cta.tomorrow10am')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Phone Frame */}
              <div className="relative w-[240px] md:w-[280px] h-[500px] md:h-[580px] bg-black rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden z-10 mx-auto">
                <div className="absolute top-0 inset-x-0 h-5 md:h-6 bg-black rounded-b-2xl md:rounded-b-3xl w-32 md:w-40 mx-auto z-20" />
                <div className="w-full h-full bg-white relative">
                  <img
                    src="/assets/footer-modified.jpg"
                    alt="Coshare App Preview"
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
