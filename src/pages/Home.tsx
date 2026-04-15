import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  ArrowRight, PieChart, Coffee, CalendarCheck, Search, CreditCard, Sparkles,
  Plus, Minus, ShieldCheck, Users, Zap, ChevronRight, Apple, LayoutDashboard,
  Scale, Store, Landmark, Briefcase, Car, Plane, Home as HomeIcon, Wallet,
  FileText, CheckCircle2, ChevronDown
} from 'lucide-react';
import { Visual1, Visual2, Visual3, Visual4 } from '../components/HowItWorksVisuals';
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
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Wallet,
      title: t('home.useCases.2.title'),
      description: t('home.useCases.2.desc'),
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Plane,
      title: t('home.useCases.3.title'),
      description: t('home.useCases.3.desc'),
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: HomeIcon,
      title: t('home.useCases.4.title'),
      description: t('home.useCases.4.desc'),
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000"
    }
  ], [t]); // Only recalculate if translations change

  const handleUseCaseClick = (index: number) => {
    setActiveUseCase(index);
    setMobileExpanded(mobileExpanded === index ? null : index);
  };

  // 1. WHY SECTION (Bento Grid Parallax)
  const whyRef = useRef<HTMLDivElement>(null); // Use HTMLDivElement for better compatibility
  const { scrollYProgress: whyScrollY } = useScroll({
    target: whyRef,
    offset: ["start end", "end start"]
  });

  // Parallax shifts: Higher numbers = more "floaty" feel
  const y1 = useTransform(whyScrollY, [0, 1], [40, -40]);
  const y2 = useTransform(whyScrollY, [0, 1], [80, -80]);
  const y3 = useTransform(whyScrollY, [0, 1], [120, -120]);
  const y4 = useTransform(whyScrollY, [0, 1], [60, -60]);
  const y5 = useTransform(whyScrollY, [0, 1], [100, -100]);
  const y6 = useTransform(whyScrollY, [0, 1], [70, -70]);
  const yTransforms = [y1, y2, y3, y4, y5, y6];

  // 2. HOW IT WORKS (Sticky Phone Logic)
  const howRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: howScrollY } = useScroll({
    target: howRef,
    offset: ["start start", "end end"] // Key for sticky behavior
  });

  // Opacity transforms for the 4 visuals
  // Optimized to ensure seamless cross-fading
  const img1Opacity = useTransform(howScrollY, [0, 0.22, 0.25], [1, 1, 0]);
  const img2Opacity = useTransform(howScrollY, [0.22, 0.25, 0.47, 0.5], [0, 1, 1, 0]);
  const img3Opacity = useTransform(howScrollY, [0.47, 0.5, 0.72, 0.75], [0, 1, 1, 0]);
  const img4Opacity = useTransform(howScrollY, [0.72, 0.75, 1], [0, 1, 1]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        canonical="https://coshare.ai"
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#0b1b34]">
        {/* Glow Effect - GPU Optimized */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#49bee4]/20 rounded-full blur-[120px] pointer-events-none z-0"
          style={{ transform: 'translateX(-50%)', willChange: 'transform' }}
        />

        <div className="absolute inset-0 z-0">
          <img
            src="/assets/coshare-hero-banner.jpeg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34]/90 via-[#0b1b34]/40 to-[#0b1b34]/20" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight text-balance"
          >
            {t('home.hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light text-balance"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* PRIMARY CTA: Get Started / Download */}
            <a
              href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#256ab1] text-white font-bold rounded-full transition-all hover:bg-[#1a4b82] active:scale-95 shadow-lg w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                {t('home.hero.start')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            {/* SECONDARY CTA: How It Works */}
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all hover:bg-white/20 active:scale-95 w-full sm:w-auto"
            >
              {t('nav.howItWorks')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content: Why coshare. - Bento Grid Redesign */}
      <section id="why-coshare" ref={whyRef} className="py-12 md:py-16 bg-[#f8f9fa] overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4 text-balance">
              {t('home.why.title').split('coshare.')[0]}
              <span dir="ltr" className="inline-block">Coshare<span className="text-[#05A7E8]">.</span></span>
              {t('home.why.title').split('coshare.')[1]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl text-balance">
              {t('home.why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: PieChart,
                title: t('home.why.1.title'),
                description: t('home.why.1.desc'),
                className: "lg:col-span-2 sm:col-span-2 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.1.badge')
              },
              {
                icon: Scale,
                title: t('home.why.2.title'),
                description: t('home.why.2.desc'),
                className: "lg:col-span-1 sm:col-span-1 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.2.badge')
              },
              {
                icon: Sparkles,
                title: t('home.why.3.title'),
                description: t('home.why.3.desc'),
                className: "lg:col-span-1 sm:col-span-1 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1582672060624-cdac1654672b?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.3.badge')
              },
              {
                icon: Briefcase,
                title: t('home.why.4.title'),
                description: t('home.why.4.desc'),
                className: "lg:col-span-1 sm:col-span-1 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.4.badge')
              },
              {
                icon: Landmark,
                title: t('home.why.5.title'),
                description: t('home.why.5.desc'),
                className: "lg:col-span-1 sm:col-span-1 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.5.badge')
              },
              {
                icon: Users,
                title: t('home.why.6.title'),
                description: t('home.why.6.desc'),
                className: "lg:col-span-1 sm:col-span-1 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.6.badge')
              },
              {
                icon: ShieldCheck,
                title: t('home.why.7.title'),
                description: t('home.why.7.desc'),
                className: "lg:col-span-1 sm:col-span-1 min-h-[220px]",
                image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.7.badge')
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group border border-gray-100 hover:border-[#256ab1]/30 flex flex-col justify-between ${feature.className}`}
              >
                {/* Parallax Background Image */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 overflow-hidden bg-[#0b1b34]">
                  <motion.img
                    src={feature.image}
                    alt=""
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-125 group-hover:scale-110 transition-transform duration-1000"
                    style={{ y: yTransforms[index] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-[#f8f9fa] rounded-2xl flex items-center justify-center group-hover:bg-[#256ab1] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                      <feature.icon className="w-7 h-7 text-[#256ab1] group-hover:text-white transition-colors duration-500" />
                    </div>
                    {feature.badge && (
                      <span className="px-4 py-1.5 bg-[#256ab1]/5 text-[#256ab1] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#256ab1]/10 group-hover:bg-[#256ab1] group-hover:text-white group-hover:border-transparent transition-all duration-500">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <h3 className={`font-display font-bold text-[#0b1b34] mb-2 group-hover:text-[#256ab1] transition-colors duration-500 ${index === 0 ? 'text-xl md:text-2xl tracking-tight' : 'text-lg md:text-xl'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-500 ${index === 0 ? 'text-sm md:text-base max-w-xl' : 'text-xs md:text-sm'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Scrolling Version */}
      <section id="how-it-works" ref={howRef} className="bg-[#0b1b34] text-white relative py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">{t('home.how.title')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl text-balance">
              {t('home.how.subtitle')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Left: Sticky Content (DESKTOP ONLY) */}
            <div className="hidden md:flex w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex-col justify-center z-10">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mx-auto">
                <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl w-40 mx-auto z-20" />
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

              {/* Animated Progress Line - ONLY calculates if MD or larger */}
              <motion.div
                className="absolute left-[27px] rtl:left-auto rtl:right-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-[#49bee4] origin-top hidden md:block"
                style={{ scaleY: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : howScrollY }}
              />

              <div className="flex flex-col gap-24 md:gap-0">
                {[
                  { icon: Search, title: t('how.step1.title'), description: t('how.step1.desc'), points: [t('how.step1.point1'), t('how.step1.point2'), t('how.step1.point3')], num: '01', Visual: Visual1 },
                  { icon: FileText, title: t('how.step2.title'), description: t('how.step2.desc'), points: [t('how.step2.point1'), t('how.step2.point2'), t('how.step2.point3')], num: '02', Visual: Visual2 },
                  { icon: CalendarCheck, title: t('how.step3.title'), description: t('how.step3.desc'), points: [t('how.step3.point1'), t('how.step3.point2'), t('how.step3.point3')], num: '03', Visual: Visual3 },
                  { icon: Sparkles, title: t('how.step4.title'), description: t('how.step4.desc'), points: [t('how.step4.point1'), t('how.step4.point2'), t('how.step4.point3')], num: '04', Visual: Visual4 }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    // No opacity/transform math on mobile for performance
                    initial={{ opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="md:min-h-[60vh] flex flex-col justify-center relative pl-0 md:pl-20 rtl:pl-0 rtl:pr-20 group"
                  >
                    {/* Mobile Number */}
                    <div className="text-6xl font-display font-bold text-white/5 mb-4 md:hidden -mt-4">
                      {step.num}
                    </div>

                    {/* Desktop Node */}
                    <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0b1b34] border-2 border-white/20 group-hover:border-[#49bee4] rounded-full items-center justify-center z-10 transition-colors duration-500">
                      <step.icon className="w-6 h-6 text-white/50 group-hover:text-[#49bee4] transition-colors duration-500" />
                    </div>

                    <div className="relative">
                      {/* Desktop Number Background */}
                      <div className="hidden md:block absolute -left-12 -top-16 text-9xl font-display font-bold text-white/5 select-none pointer-events-none z-0 transition-colors duration-500 group-hover:text-white/10">
                        {step.num}
                      </div>

                      <div className="relative z-10">
                        {/* Mobile Image: Static & Fast */}
                        <div className="w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mb-8 md:hidden relative mx-auto">
                          <div className="absolute top-0 inset-x-0 h-5 bg-black rounded-b-2xl w-32 mx-auto z-20" />
                          <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative">
                            <step.Visual />
                          </div>
                        </div>

                        <div className="w-16 h-16 bg-[#1a2b4c] rounded-2xl flex items-center justify-center mb-6 border border-white/10 md:hidden">
                          <step.icon className="w-8 h-8 text-[#49bee4]" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
                        <p className="text-xl text-gray-400 leading-relaxed mb-6">{step.description}</p>

                        <ul className="space-y-3 list-disc pl-4 marker:text-[#49bee4]">
                          {step.points.map((point, i) => (
                            <li key={i} className="text-gray-300 pl-1">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-12 md:py-24 bg-[#f8f9fa] text-[#0b1b34] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('home.useCases.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl">{t('home.useCases.subtitle')}</p>
          </div>

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
                        <div className="bg-gray-200 w-full h-48 relative">
                          <img
                            src={`${useCase.image}&w=600&q=65`} // Force mobile optimization
                            className="w-full h-full object-cover"
                            alt=""
                            loading="eager"
                            decoding="async" // Critical: prevents main-thread lockup
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

            {/* RIGHT COLUMN: DESKTOP ONLY (Static) */}
            <div className="hidden lg:block w-full lg:w-2/3 relative h-[500px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                key={activeUseCase}
                src={`${useCasesData[activeUseCase].image}&w=1200&q=80`}
                className="w-full h-full object-cover"
                alt=""
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end">
                <p className="text-2xl text-white font-medium max-w-xl">
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
        className="py-16 md:py-24 bg-[#0b1b34] relative overflow-hidden"
        style={{
          contentVisibility: 'auto', // This is the most important line
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
          <div className="mb-12">
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
                    src="/assets/footer.png"
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
