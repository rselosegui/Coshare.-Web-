import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PieChart, Coffee, CalendarCheck, Search, CreditCard, Sparkles, Plus, Minus, ShieldCheck, Users, Zap, ChevronRight, Apple, LayoutDashboard, Scale, Store, Landmark, Briefcase, Car, Plane, Home as HomeIcon, Wallet } from 'lucide-react';
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
        title="Coshare | Fractional Ownership of Assets in UAE"
        description="Join the future of ownership. Co-own cars, yachts, real estate and more in the UAE with Coshare's AI-powered fractional ownership marketplace."
        canonical="https://coshare.ai"
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src='/assets/Coshare Hero Banner Homepage1.png' 
            alt="Hero"
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
            <a 
              href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-white/80 hover:text-white transition-all duration-500 uppercase tracking-[0.2em] flex items-center group"
            >
              {lang === 'EN' ? (
                <>
                  {t('home.hero.tryApp').split('App')[0]}
                  <span className="relative inline-flex items-center justify-center px-6 py-2 mx-3 rounded-full bg-[#0b1b34]/40 backdrop-blur-xl border border-white/10 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {/* Spinning border spotlight */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#05A7E8_360deg)] opacity-80"
                    />
                    {/* Inner dark pill to mask the center of the conic gradient */}
                    <div className="absolute inset-[2px] bg-[#0b1b34] rounded-full" />
                    
                    {/* The text itself with a subtle pulse */}
                    <motion.span 
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 font-black tracking-[0.2em] text-sm text-white drop-shadow-[0_0_8px_rgba(5,167,232,0.8)]"
                    >
                      APP
                    </motion.span>
                  </span>
                  {t('home.hero.tryApp').split('App')[1]}
                </>
              ) : (
                <>
                  {t('home.hero.tryApp').split('التطبيق')[0]}
                  <span className="relative inline-flex items-center justify-center px-6 py-2 mx-3 rounded-full bg-[#0b1b34]/40 backdrop-blur-xl border border-white/10 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {/* Spinning border spotlight */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#05A7E8_360deg)] opacity-80"
                    />
                    {/* Inner dark pill to mask the center of the conic gradient */}
                    <div className="absolute inset-[2px] bg-[#0b1b34] rounded-full" />
                    
                    {/* The text itself with a subtle pulse */}
                    <motion.span 
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 font-black tracking-[0.2em] text-sm text-white drop-shadow-[0_0_8px_rgba(5,167,232,0.8)]"
                    >
                      التطبيق
                    </motion.span>
                  </span>
                  {t('home.hero.tryApp').split('التطبيق')[1]}
                </>
              )}
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-[#05A7E8] group-hover:text-[#49bee4]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content: Why coshare. - Bento Grid Redesign */}
      <section id="why-coshare" ref={whyRef} className="py-16 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">
              {t('home.why.title').split('coshare.')[0]}
              <span dir="ltr" className="inline-block">coshare<span className="text-[#05A7E8]">.</span></span>
              {t('home.why.title').split('coshare.')[1]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.1.badge')
              },
              {
                icon: Scale,
                title: t('home.why.2.title'),
                description: t('home.why.2.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[238px]",
                image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.2.badge')
              },
              {
                icon: Sparkles,
                title: t('home.why.3.title'),
                description: t('home.why.3.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[238px]",
                image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.3.badge')
              },
              {
                icon: Briefcase,
                title: t('home.why.4.title'),
                description: t('home.why.4.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.4.badge')
              },
              {
                icon: Landmark,
                title: t('home.why.5.title'),
                description: t('home.why.5.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1522158634235-47a056cc0662?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.5.badge')
              },
              {
                icon: Users,
                title: t('home.why.6.title'),
                description: t('home.why.6.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
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

      {/* Use Cases */}
      <section id="use-cases" className="py-24 bg-[#0b1b34] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A7E8]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Who is Coshare For?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Whether you're looking for lifestyle upgrades or smart diversification, there's a place for you.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Tabs */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              {[
                {
                  icon: Car,
                  title: "The Experience Seeker",
                  description: "You want the thrill of driving a Porsche this weekend and a G-Wagon the next, without the burden of full ownership, depreciation, or maintenance.",
                  image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  icon: Wallet,
                  title: "The Smart Diversifier",
                  description: "You understand that tying up 100% capital in a single depreciating asset is inefficient. You prefer to spread your investment across multiple premium assets.",
                  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  icon: Plane,
                  title: "The Seasonal Resident",
                  description: "You're only in Dubai for a few months a year. Why pay for a luxury car that sits in a garage for 9 months when you can own just the fraction you use?",
                  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  icon: HomeIcon,
                  title: "The Aspirational Buyer",
                  description: "You want access to the luxury lifestyle now. Coshare lowers the barrier to entry, letting you enjoy premium assets at a fraction of the upfront cost.",
                  image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000"
                }
              ].map((useCase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveUseCase(index)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                    activeUseCase === index 
                      ? 'bg-white/10 border-[#49bee4] shadow-[0_0_30px_rgba(73,190,228,0.15)]' 
                      : 'bg-transparent border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeUseCase === index ? 'bg-[#49bee4] text-[#0b1b34]' : 'bg-[#1a2b4c] text-[#49bee4]'
                    }`}>
                      <useCase.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${
                      activeUseCase === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {useCase.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#1a2b4c]">
              {[
                {
                  icon: Car,
                  title: "The Experience Seeker",
                  description: "You want the thrill of driving a Porsche this weekend and a G-Wagon the next, without the burden of full ownership, depreciation, or maintenance.",
                  image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  icon: Wallet,
                  title: "The Smart Diversifier",
                  description: "You understand that tying up 100% capital in a single depreciating asset is inefficient. You prefer to spread your investment across multiple premium assets.",
                  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  icon: Plane,
                  title: "The Seasonal Resident",
                  description: "You're only in Dubai for a few months a year. Why pay for a luxury car that sits in a garage for 9 months when you can own just the fraction you use?",
                  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  icon: HomeIcon,
                  title: "The Aspirational Buyer",
                  description: "You want access to the luxury lifestyle now. Coshare lowers the barrier to entry, letting you enjoy premium assets at a fraction of the upfront cost.",
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

      {/* Featured Assets */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-2">{t('home.featured.title')}</h2>
              <p className="text-gray-600">{t('home.featured.subtitle')}</p>
            </div>
            <Link
              to="/assets"
              className="hidden md:flex items-center text-[#256ab1] font-bold hover:text-[#0b1b34] transition-colors"
            >
              {t('home.featured.viewAll')}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 gap-6 sm:gap-8">
            {featuredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/assets/${asset.id}`)}
                className="flex-shrink-0 w-[300px] sm:w-auto bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10" />
                  <img
                    src={asset.imageUrl}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-5 left-5 z-20 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                    {asset.subcategory}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0b1b34] mb-2">{asset.name}</h3>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('asset.pricePerShare')}</p>
                      <p className="text-lg font-bold text-[#256ab1]">AED {asset.pricePerShare.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('asset.available')}</p>
                      <p className="text-sm font-medium text-[#0b1b34]">{asset.availableShares} / {asset.totalShares}</p>
                    </div>
                  </div>
                  
                  {/* Scarcity Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden">
                      <div 
                        className="bg-[#256ab1] h-1.5 rounded-full" 
                        style={{ width: `${((asset.totalShares - asset.availableShares) / asset.totalShares) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-gray-400 text-right uppercase tracking-wider">
                      {Math.round(((asset.totalShares - asset.availableShares) / asset.totalShares) * 100)}% Sold
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/assets"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-sm font-bold text-[#0b1b34] bg-white hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              {t('home.featured.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works - Editorial Redesign */}
      <section id="how-it-works" ref={howRef} className="bg-[#0b1b34] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Left: Sticky Content */}
            <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex flex-col justify-center pt-24 md:pt-0 z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">{t('home.how.title')}</h2>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a2b4c] hidden md:block">
                <motion.div className="absolute inset-0" style={{ opacity: img1Opacity }}>
                  <Visual1 />
                </motion.div>
                <motion.div className="absolute inset-0" style={{ opacity: img2Opacity }}>
                  <Visual2 />
                </motion.div>
                <motion.div className="absolute inset-0" style={{ opacity: img3Opacity }}>
                  <Visual3 />
                </motion.div>
                <motion.div className="absolute inset-0" style={{ opacity: img4Opacity }}>
                  <Visual4 />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b34]/60 to-transparent mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            {/* Right: Scrolling Steps */}
            <div className="w-full md:w-1/2 relative pb-16 md:pb-[5vh] md:pt-[5vh]">
              {/* Progress Line Background */}
              <div className="absolute left-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-white/10 hidden md:block" />
              {/* Animated Progress Line */}
              <motion.div 
                className="absolute left-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-[#49bee4] origin-top hidden md:block" 
                style={{ scaleY: howScrollY }} 
              />

              <div className="flex flex-col gap-12 md:gap-0">
                {[
                  {
                    icon: Plus,
                    title: t('home.how.1.title'),
                    description: t('home.how.1.desc'),
                    num: '01',
                    Visual: Visual1
                  },
                  {
                    icon: PieChart,
                    title: t('home.how.2.title'),
                    description: t('home.how.2.desc'),
                    num: '02',
                    Visual: Visual2
                  },
                  {
                    icon: CalendarCheck,
                    title: t('home.how.3.title'),
                    description: t('home.how.3.desc'),
                    num: '03',
                    Visual: Visual3
                  },
                  {
                    icon: ShieldCheck,
                    title: t('home.how.4.title'),
                    description: t('home.how.4.desc'),
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
                    className="md:min-h-[40vh] flex flex-col justify-center relative pl-0 md:pl-20 group"
                  >
                    {/* Mobile Number */}
                    <div className="text-6xl font-display font-bold text-white/5 mb-4 md:hidden">
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
                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 md:hidden border border-white/10 relative">
                          <step.Visual />
                        </div>

                        <div className="w-16 h-16 bg-[#1a2b4c] rounded-2xl flex items-center justify-center mb-6 border border-white/10 md:hidden">
                          <step.icon className="w-8 h-8 text-[#49bee4]" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-md">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section for SEO/GEO */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">{t('home.faq.title')}</h2>
            <p className="text-gray-600">{t('home.faq.subtitle')}</p>
          </div>
          <div className="space-y-2">
            <FAQItem 
              question={t('home.faq.1.q')} 
              answer={t('home.faq.1.a')} 
            />
            <FAQItem 
              question={t('home.faq.2.q')} 
              answer={t('home.faq.2.a')} 
            />
            <FAQItem 
              question={t('home.faq.3.q')} 
              answer={t('home.faq.3.a')} 
            />
            <FAQItem 
              question={t('home.faq.4.q')} 
              answer={t('home.faq.4.a')} 
            />
          </div>
        </div>
      </section>

      {/* App Launch CTA Section */}
      <section className="py-24 bg-[#0b1b34] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#05A7E8]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#49bee4]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Start Co-Owning <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A7E8] to-[#49bee4]">Today.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg font-light leading-relaxed">
                Join early co-owners in Dubai sharing Porsches, Mercedes, Land Rovers, and more. Download the Coshare app to browse assets, purchase shares, and book your time instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-[#0b1b34] rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 group shadow-xl shadow-white/10"
                >
                  <Apple className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Download on the</div>
                    <div className="text-sm leading-none mt-0.5">App Store</div>
                  </div>
                </a>
                
                <div className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white/50 rounded-full font-medium cursor-not-allowed">
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Android</div>
                    <div className="text-sm leading-none mt-0.5">Coming Soon</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-[#0b1b34] object-cover" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-[#0b1b34] object-cover" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-[#0b1b34] object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0b1b34] bg-[#256ab1] flex items-center justify-center text-white text-xs font-bold z-10">
                    +50
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <span className="text-white font-bold">Early Adopters</span><br/>
                  already co-owning
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
                className="absolute top-20 -left-4 md:-left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-0 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300">Asset Insured</div>
                    <div className="text-sm font-bold text-white">Fully Covered</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 -right-4 md:-right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#05A7E8]/20 rounded-full flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-[#05A7E8]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300">Next Booking</div>
                    <div className="text-sm font-bold text-white">Tomorrow, 10 AM</div>
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
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Portfolio Value</p>
                        <h3 className="text-2xl font-display font-bold text-[#0b1b34]">AED 250,000</h3>
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
                          2/8 Shares
                        </div>
                      </div>
                      <h4 className="font-bold text-[#0b1b34] text-sm">Ferrari SF90 Stradale</h4>
                      <p className="text-[10px] text-gray-500 mb-2">Dubai, UAE</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                        <span className="text-[10px] font-bold text-[#256ab1]">Book Time</span>
                        <span className="text-[10px] font-bold text-gray-400">Trade Shares</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <div className="w-full h-32 rounded-xl overflow-hidden mb-3 relative">
                        <img src="https://images.unsplash.com/photo-1669023030485-573b6a75ab64?auto=format&fit=crop&q=80&w=600" alt="Lambo" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold text-[#0b1b34] uppercase tracking-widest">
                          1/8 Shares
                        </div>
                      </div>
                      <h4 className="font-bold text-[#0b1b34] text-sm">Lamborghini Revuelto</h4>
                      <p className="text-[10px] text-gray-500 mb-2">Abu Dhabi, UAE</p>
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
