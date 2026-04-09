import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PieChart, Coffee, CalendarCheck, Search, CreditCard, Sparkles, Plus, Minus, ShieldCheck, Users, Zap, ChevronRight, Apple, LayoutDashboard, Scale, Store, Landmark, Briefcase, Car, Plane, Home as HomeIcon, Wallet, FileText, CheckCircle2 } from 'lucide-react';
import { Visual1, Visual2, Visual3, Visual4 } from '../components/HowItWorksVisuals';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h4 className="text-lg font-bold text-[#0b1b34] group-hover:text-[#256ab1] transition-colors">{question}</h4>
        {isOpen ? <Minus className="w-5 h-5 text-[#256ab1]" /> : <Plus className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-gray-600 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const FAQItemDark = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h4 className="text-lg font-bold text-white group-hover:text-[#49bee4] transition-colors">{question}</h4>
        {isOpen ? <Minus className="w-5 h-5 text-[#49bee4]" /> : <Plus className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-gray-400 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

export const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [isHoveringUseCases, setIsHoveringUseCases] = useState(false);

  useEffect(() => {
    if (isHoveringUseCases) return;
    const interval = setInterval(() => {
      setActiveUseCase((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHoveringUseCases]);

  const whyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: whyScrollY } = useScroll({
    target: whyRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(whyScrollY, [0, 1], [40, -40]);
  const y2 = useTransform(whyScrollY, [0, 1], [80, -80]);
  const y3 = useTransform(whyScrollY, [0, 1], [120, -120]);
  const y4 = useTransform(whyScrollY, [0, 1], [60, -60]);
  const y5 = useTransform(whyScrollY, [0, 1], [100, -100]);
  const y6 = useTransform(whyScrollY, [0, 1], [70, -70]);
  const yTransforms = [y1, y2, y3, y4, y5, y6];

  const howRef = useRef<HTMLElement>(null);
  const { scrollYProgress: howScrollY } = useScroll({
    target: howRef,
    offset: ["start start", "end end"]
  });
  const img1Opacity = useTransform(howScrollY, [0, 0.2, 0.25], [1, 1, 0]);
  const img2Opacity = useTransform(howScrollY, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const img3Opacity = useTransform(howScrollY, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const img4Opacity = useTransform(howScrollY, [0.7, 0.75, 1], [0, 1, 1]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        canonical="https://coshare.ai"
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#0b1b34]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#49bee4]/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/coshare-hero-banner.png"
            alt="Asset Image"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34]/90 via-[#0b1b34]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight text-balance"
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light text-balance"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b1b34] font-bold rounded-full hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(0,0,0,0.1),inset_0_-3px_0_rgba(0,0,0,0.1)] flex items-center justify-center group"
              >
                {t('home.hero.start')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                {t('nav.howItWorks')}
              </Link>
            </div>
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

            {/* Left: Sticky Content */}
            <div className="hidden md:flex w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex-col justify-center pt-24 md:pt-0 z-10">
              <div className="relative w-full hidden md:flex items-center justify-center" style={{ height: '75vh', overflow: 'hidden' }}>
                <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: img1Opacity }}>
                  <Visual1 />
                </motion.div>
                <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: img2Opacity }}>
                  <Visual2 />
                </motion.div>
                <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: img3Opacity }}>
                  <Visual3 />
                </motion.div>
                <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: img4Opacity }}>
                  <Visual4 />
                </motion.div>

              </div>
            </div>

            {/* Right: Scrolling Steps */}
            <div className="w-full md:w-1/2 relative pb-16 md:pb-[5vh] md:pt-[5vh]">
              {/* Progress Line Background */}
              <div className="absolute left-[27px] rtl:left-auto rtl:right-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-white/10 hidden md:block" />
              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-[27px] rtl:left-auto rtl:right-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-[#49bee4] origin-top hidden md:block"
                style={{ scaleY: howScrollY }}
              />

              <div className="flex flex-col gap-24 md:gap-0">
                {[
                  {
                    icon: Search,
                    title: t('how.step1.title'),
                    description: t('how.step1.desc'),
                    points: [t('how.step1.point1'), t('how.step1.point2'), t('how.step1.point3')],
                    num: '01',
                    Visual: Visual1
                  },
                  {
                    icon: FileText,
                    title: t('how.step2.title'),
                    description: t('how.step2.desc'),
                    points: [t('how.step2.point1'), t('how.step2.point2'), t('how.step2.point3')],
                    num: '02',
                    Visual: Visual2
                  },
                  {
                    icon: CalendarCheck,
                    title: t('how.step3.title'),
                    description: t('how.step3.desc'),
                    points: [t('how.step3.point1'), t('how.step3.point2'), t('how.step3.point3')],
                    num: '03',
                    Visual: Visual3
                  },
                  {
                    icon: Sparkles,
                    title: t('how.step4.title'),
                    description: t('how.step4.desc'),
                    points: [t('how.step4.point1'), t('how.step4.point2'), t('how.step4.point3')],
                    num: '04',
                    Visual: Visual4
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.5 }}
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
                        {/* Mobile Image */}
                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 md:hidden border border-white/10 relative [&_img]:!object-cover [&_img]:!w-full [&_img]:!h-full [&_img]:!transform-none">
                          <step.Visual />
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
      <section id="use-cases" className="py-16 md:py-24 bg-[#f8f9fa] text-[#0b1b34] relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A7E8]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">{t('home.useCases.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl text-balance">
              {t('home.useCases.subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Tabs */}
            <div
              className="w-full lg:w-1/3 flex flex-col gap-4"
              onMouseEnter={() => setIsHoveringUseCases(true)}
              onMouseLeave={() => setIsHoveringUseCases(false)}
            >
              {[
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
              ].map((useCase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveUseCase(index)}
                  className={`relative overflow-hidden text-left p-6 rounded-2xl transition-all duration-300 border ${activeUseCase === index
                    ? 'bg-white border-[#256ab1]/20 shadow-lg'
                    : 'bg-transparent border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeUseCase === index ? 'bg-[#256ab1] text-white' : 'bg-gray-100 text-[#256ab1]'
                      }`}>
                      <useCase.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${activeUseCase === index ? 'text-[#0b1b34]' : 'text-gray-500'
                      }`}>
                      {useCase.title}
                    </h3>
                  </div>

                  {/* Progress Bar */}
                  {activeUseCase === index && !isHoveringUseCases && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[#256ab1] rounded-b-2xl"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-xl">
              {[
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
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: activeUseCase === index ? 1 : 0,
                    scale: activeUseCase === index ? 1 : 1.05,
                    zIndex: activeUseCase === index ? 10 : 0
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-[#0b1b34]/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeUseCase === index ? 1 : 0,
                        y: activeUseCase === index ? 0 : 20
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="max-w-2xl"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#49bee4]/20 border border-[#49bee4]/30 text-[#49bee4] text-sm font-bold mb-4 backdrop-blur-md">
                        <useCase.icon className="w-4 h-4" />
                        {useCase.title}
                      </div>
                      <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                        {useCase.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO/GEO */}
      <section id="faq" className="py-16 md:py-24 bg-[#0b1b34] scroll-mt-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#49bee4]/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3 pointer-events-none" />
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
              {/* Floating Elements behind phone */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -left-4 md:-left-12 bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow-xl z-0 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{t('home.cta.assetInsured')}</div>
                    <div className="text-sm font-bold text-[#0b1b34]">{t('home.cta.fullyCovered')}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 -right-4 md:-right-8 bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#256ab1]/20 rounded-full flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-[#256ab1]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{t('home.cta.nextBooking')}</div>
                    <div className="text-sm font-bold text-[#0b1b34]">{t('home.cta.tomorrow10am')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Phone Frame */}
              <div className="relative w-[240px] md:w-[280px] h-[500px] md:h-[580px] bg-black rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden z-10 mx-auto">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-5 md:h-6 bg-black rounded-b-2xl md:rounded-b-3xl w-32 md:w-40 mx-auto z-20" />

                {/* Screen Content (Simulated App) */}
                <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative scale-[0.85] md:scale-100 origin-top">
                  {/* App Header */}
                  <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t('home.cta.portfolioValue')}</p>
                        <h3 className="text-2xl font-display font-bold text-[#0b1b34]">{t('home.how.totalPrice')}</h3>
                      </div>
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* App Body */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar pb-20">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <div className="w-full h-32 rounded-xl overflow-hidden mb-3 relative">
                        <img src="https://images.unsplash.com/photo-1592853625511-85c19280742d?auto=format&fit=crop&q=80&w=600" alt="Ferrari" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold text-[#0b1b34] uppercase tracking-widest">
                          {t('home.cta.shares28')}
                        </div>
                      </div>
                      <h4 className="font-bold text-[#0b1b34] text-sm">{t('home.how.ferrariStradale')}</h4>
                      <p className="text-[10px] text-gray-500 mb-2">{t('home.cta.location1')}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                        <span className="text-[10px] font-bold text-[#256ab1]">{t('home.cta.bookTime')}</span>
                        <span className="text-[10px] font-bold text-gray-400">{t('home.cta.tradeShares')}</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <div className="w-full h-32 rounded-xl overflow-hidden mb-3 relative">
                        <img src="https://images.unsplash.com/photo-1669023030485-573b6a75ab64?auto=format&fit=crop&q=80&w=600" alt="Lambo" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold text-[#0b1b34] uppercase tracking-widest">
                          {t('home.cta.shares18')}
                        </div>
                      </div>
                      <h4 className="font-bold text-[#0b1b34] text-sm">{t('home.how.lamborghini')}</h4>
                      <p className="text-[10px] text-gray-500 mb-2">{t('home.cta.location2')}</p>
                    </div>
                  </div>

                  {/* App Bottom Nav */}
                  <div className="h-16 bg-white border-t border-gray-100 flex justify-around items-center px-6 absolute bottom-0 w-full z-20">
                    <div className="flex flex-col items-center gap-1">
                      <PieChart className="w-5 h-5 text-[#0b1b34]" />
                      <div className="w-1 h-1 rounded-full bg-[#0b1b34]" />
                    </div>
                    <Search className="w-5 h-5 text-gray-300" />
                    <CalendarCheck className="w-5 h-5 text-gray-300" />
                    <Users className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
