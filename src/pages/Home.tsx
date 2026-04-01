import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PieChart, Coffee, CalendarCheck, Search, CreditCard, Sparkles, Plus, Minus, ShieldCheck, Users, Zap, ChevronRight, Apple, LayoutDashboard, Scale, Store, Landmark, Briefcase, Car, Plane, Home as HomeIcon, Wallet, FileText } from 'lucide-react';
import { useAssets } from '../hooks/useAssets';
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
  const { assets } = useAssets();
  const featuredAssets = assets.filter(asset => asset.category === 'Cars').slice(0, 3);
  const [activeUseCase, setActiveUseCase] = React.useState(0);
  
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
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/aistudio-user-uploads/6117622839446220/1742461144186_image.png"
            alt="Premium Car"
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
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight"
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
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
              <Link
                to="/assets"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b1b34] font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5 flex items-center justify-center group"
              >
                {t('home.hero.start')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/list-onboarding"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                {t('home.hero.list')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content: Why coshare. - Bento Grid Redesign */}
      <section id="why-coshare" ref={whyRef} className="py-16 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">
              {t('home.why.title').split('coshare.')[0]}
              <span dir="ltr" className="inline-block">coshare<span className="text-[#05A7E8]">.</span></span>
              {t('home.why.title').split('coshare.')[1]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t('home.why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr">
            {[
              {
                icon: PieChart,
                title: t('home.why.1.title'),
                description: t('home.why.1.desc'),
                className: "md:col-span-8 md:row-span-2 min-h-[350px] md:min-h-[500px]",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.1.badge')
              },
              {
                icon: Scale,
                title: t('home.why.2.title'),
                description: t('home.why.2.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[238px]",
                image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.2.badge')
              },
              {
                icon: Sparkles,
                title: t('home.why.3.title'),
                description: t('home.why.3.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[238px]",
                image: "https://images.unsplash.com/photo-1582672060624-cdac1654672b?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.3.badge')
              },
              {
                icon: Briefcase,
                title: t('home.why.4.title'),
                description: t('home.why.4.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.4.badge')
              },
              {
                icon: Landmark,
                title: t('home.why.5.title'),
                description: t('home.why.5.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.5.badge')
              },
              {
                icon: Users,
                title: t('home.why.6.title'),
                description: t('home.why.6.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.6.badge')
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-3xl bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group border border-gray-100 hover:border-[#256ab1]/30 flex flex-col justify-between ${feature.className}`}
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
                    <h3 className={`font-display font-bold text-[#0b1b34] mb-4 group-hover:text-[#256ab1] transition-colors duration-500 ${index === 0 ? 'text-4xl md:text-6xl tracking-tight' : 'text-2xl md:text-3xl'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-500 ${index === 0 ? 'text-lg md:text-xl max-w-xl' : 'text-base'}`}>
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
      <section id="how-it-works" ref={howRef} className="py-24 bg-[#0b1b34] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t('home.how.title')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              {t('home.how.subtitle')}
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {/* Steps */}
            {[
                  {
                    icon: Search,
                    title: t('how.step1.title'),
                    description: t('how.step1.desc'),
                    num: '01',
                    Mockup: () => (
                      <div className="w-full h-full bg-[#f8f9fa] flex flex-col pt-12 px-4">
                        <div className="text-xl font-bold text-[#0b1b34] mb-4">{t('home.how.browse')}</div>
                        <div className="bg-white rounded-2xl p-3 shadow-sm mb-4">
                          <img src="https://images.unsplash.com/photo-1592853625511-85c19280742d?auto=format&fit=crop&q=80&w=600" className="w-full h-32 object-cover rounded-xl mb-3" alt="Ferrari" />
                          <div className="font-bold text-sm text-[#0b1b34]">{t('home.how.ferrari')}</div>
                          <div className="text-xs text-gray-500">{t('home.how.price250')}</div>
                        </div>
                        <div className="bg-white rounded-2xl p-3 shadow-sm">
                          <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600" className="w-full h-32 object-cover rounded-xl mb-3" alt="Porsche" />
                          <div className="font-bold text-sm text-[#0b1b34]">{t('home.how.porsche')}</div>
                          <div className="text-xs text-gray-500">{t('home.how.price150')}</div>
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: FileText,
                    title: t('how.step2.title'),
                    description: t('how.step2.desc'),
                    num: '02',
                    Mockup: () => (
                      <div className="w-full h-full bg-[#f8f9fa] flex flex-col pt-12 px-4">
                        <div className="text-xl font-bold text-[#0b1b34] mb-4">{t('home.how.checkout')}</div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                          <div className="flex justify-between mb-3"><span className="text-sm text-gray-500">{t('home.how.asset')}</span><span className="text-sm font-bold text-[#0b1b34]">{t('home.how.ferrari')}</span></div>
                          <div className="flex justify-between mb-3"><span className="text-sm text-gray-500">{t('home.how.shares')}</span><span className="text-sm font-bold text-[#0b1b34]">{t('home.how.sharesRange')}</span></div>
                          <div className="flex justify-between pt-3 border-t border-gray-100"><span className="text-sm text-gray-500">{t('home.how.total')}</span><span className="text-sm font-bold text-[#256ab1]">{t('home.how.totalPrice')}</span></div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#256ab1]" />
                            <div className="text-sm font-bold text-[#0b1b34]">{t('home.how.contract')}</div>
                          </div>
                        </div>
                        <div className="bg-[#256ab1] text-white text-center py-3 rounded-xl font-bold text-sm mt-auto mb-8">{t('home.how.sign')}</div>
                      </div>
                    )
                  },
                  {
                    icon: CalendarCheck,
                    title: t('how.step3.title'),
                    description: t('how.step3.desc'),
                    num: '03',
                    Mockup: () => (
                      <div className="w-full h-full bg-[#f8f9fa] flex flex-col pt-12 px-4">
                        <div className="text-xl font-bold text-[#0b1b34] mb-4">{t('home.how.selectDates')}</div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                          <div className="text-sm font-bold text-[#0b1b34] mb-4">March 2026</div>
                          <div className="grid grid-cols-7 gap-2 text-center mb-2">
                            <div className="text-xs text-gray-400">M</div><div className="text-xs text-gray-400">T</div><div className="text-xs text-gray-400">W</div><div className="text-xs text-gray-400">T</div><div className="text-xs text-gray-400">F</div><div className="text-xs text-gray-400">S</div><div className="text-xs text-gray-400">S</div>
                            {Array.from({length: 28}).map((_, i) => (
                              <div key={i} className={`aspect-square flex items-center justify-center text-xs rounded-full ${i === 14 || i === 15 ? 'bg-[#256ab1] text-white font-bold' : i > 10 && i < 14 ? 'bg-gray-100 text-gray-400 line-through' : 'text-[#0b1b34]'}`}>{i + 1}</div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-[#256ab1] text-white text-center py-3 rounded-xl font-bold text-sm mt-auto mb-8">{t('home.how.confirmBooking')}</div>
                      </div>
                    )
                  },
                  {
                    icon: Sparkles,
                    title: t('how.step4.title'),
                    description: t('how.step4.desc'),
                    num: '04',
                    Mockup: () => (
                      <div className="w-full h-full bg-[#f8f9fa] flex flex-col pt-12 px-4">
                        <div className="text-xl font-bold text-[#0b1b34] mb-4">{t('home.how.digitalKey')}</div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex flex-col items-center justify-center py-8">
                          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-4 border-[#256ab1]/20">
                            <Sparkles className="w-10 h-10 text-[#256ab1]" />
                          </div>
                          <div className="font-bold text-lg mb-1 text-[#0b1b34]">Ferrari SF90</div>
                          <div className="text-sm text-green-500 font-medium">{t('home.how.connected')}</div>
                        </div>
                        <div className="flex gap-4 mt-auto mb-8">
                          <div className="flex-1 bg-gray-100 text-[#0b1b34] text-center py-3 rounded-xl font-bold text-sm">{t('home.how.lock')}</div>
                          <div className="flex-1 bg-[#256ab1] text-white text-center py-3 rounded-xl font-bold text-sm">{t('home.how.unlock')}</div>
                        </div>
                      </div>
                    )
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0.3, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-20% 0px -20% 0px" }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Text Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-sm">
                          <step.icon className="w-8 h-8 text-[#256ab1]" />
                        </div>
                        <div className="text-6xl font-display font-bold text-white/10">
                          {step.num}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
                      <p className="text-xl text-gray-400 leading-relaxed mb-6">{step.description}</p>
                    </div>

                    {/* Mockup */}
                    <div className="flex-1 flex justify-center">
                      <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                        <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl w-40 mx-auto z-20" />
                        <div className="w-full h-full bg-white relative">
                          <step.Mockup />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            
              <div className="mt-12 text-left">
                <Link 
                  to="/how-it-works" 
                  className="inline-flex items-center text-[#256ab1] font-bold hover:text-white transition-colors"
                >
                  {t('home.how.learnMore')}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 bg-[#f8f9fa] text-[#0b1b34] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A7E8]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('home.useCases.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t('home.useCases.subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Tabs */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
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
                  className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                    activeUseCase === index 
                      ? 'bg-white border-[#256ab1]/20 shadow-lg' 
                      : 'bg-transparent border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeUseCase === index ? 'bg-[#256ab1] text-white' : 'bg-gray-100 text-[#256ab1]'
                    }`}>
                      <useCase.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${
                      activeUseCase === index ? 'text-[#0b1b34]' : 'text-gray-500'
                    }`}>
                      {useCase.title}
                    </h3>
                  </div>
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
      <section id="faq" className="py-20 bg-[#0b1b34]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t('home.faq.title')}</h2>
            <p className="text-gray-400">{t('home.faq.subtitle')}</p>
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
      <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#0b1b34] mb-6 leading-tight">
                {t('home.cta.title1')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A7E8] to-[#49bee4]">{t('home.cta.title2')}</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg font-light leading-relaxed">
                {t('home.cta.desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-[#0b1b34] text-white rounded-full font-bold hover:bg-[#1a2b4c] transition-all hover:scale-105 active:scale-95 group shadow-xl shadow-[#0b1b34]/10 animate-pulse"
                >
                  <Apple className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">{t('home.cta.downloadOn')}</div>
                    <div className="text-sm leading-none mt-0.5">{t('home.cta.appStore')}</div>
                  </div>
                </a>
                
                <a 
                  href="https://play.google.com/store/apps/details?id=com.coshare.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-[#0b1b34] rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.22-.28.15-.4.54-.22.85L6.4 9.48C2.84 11.58.52 15.41.05 19.81h23.9c-.47-4.4-2.79-8.23-6.35-10.33zm-10.4 7.14c-.65 0-1.17-.51-1.17-1.15 0-.65.52-1.16 1.17-1.16.64 0 1.17.51 1.17 1.16 0 .64-.53 1.15-1.17 1.15zm9.6 0c-.65 0-1.17-.51-1.17-1.15 0-.65.52-1.16 1.17-1.16.64 0 1.17.51 1.17 1.16 0 .64-.53 1.15-1.17 1.15z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{t('home.cta.getItOn')}</div>
                    <div className="text-sm leading-none mt-0.5">{t('home.cta.googlePlay')}</div>
                  </div>
                </a>
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
                  <span className="text-[#0b1b34] font-bold">{t('home.cta.earlyAdopters')}</span><br/>
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
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden z-10">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl w-40 mx-auto z-20" />
                
                {/* Screen Content (Simulated App) */}
                <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative">
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
                      <h4 className="font-bold text-[#0b1b34] text-sm">Ferrari SF90 Stradale</h4>
                      <p className="text-[10px] text-gray-500 mb-2">{t('home.cta.dubai')}</p>
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
                      <h4 className="font-bold text-[#0b1b34] text-sm">Lamborghini Revuelto</h4>
                      <p className="text-[10px] text-gray-500 mb-2">{t('home.cta.abuDhabi')}</p>
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
