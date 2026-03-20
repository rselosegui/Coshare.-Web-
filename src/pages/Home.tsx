import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ASSETS } from '../data/assets';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PieChart, Coffee, CalendarCheck, Search, CreditCard, Sparkles, Plus, Minus, ShieldCheck, Users, Zap, ChevronRight } from 'lucide-react';

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
  const { t } = useLanguage();
  const navigate = useNavigate();
  const featuredAssets = ASSETS.slice(0, 3);
  
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
  const yTransforms = [y1, y2, y3, y4, y5];

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
        title="Coshare | Fractional Ownership of Luxury Assets in UAE"
        description="Join the future of ownership. Co-own luxury supercars and yachts in the UAE with Coshare's AI-powered fractional ownership marketplace."
        canonical="https://coshare.ae"
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/aistudio-user-uploads/6117622839446220/1742461144186_image.png"
            alt="Luxury Car"
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
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b1b34] font-medium rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center group"
              >
                {t('home.hero.start')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/list-onboarding"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                {t('home.hero.list')}
              </Link>
            </div>
            <a 
              href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center group"
            >
              Try new <span className="text-[#05A7E8] ml-1">App</span>
              <ChevronRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content: Why coshare. - Bento Grid Redesign */}
      <section ref={whyRef} className="py-16 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">Why <span dir="ltr">coshare<span className="text-[#05A7E8]">.</span></span></h2>
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
                badge: "85% Cost Saving"
              },
              {
                icon: ShieldCheck,
                title: t('home.why.2.title'),
                description: t('home.why.2.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[238px]",
                image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
                badge: "RTA Compliant"
              },
              {
                icon: Coffee,
                title: t('home.why.3.title'),
                description: t('home.why.3.desc'),
                className: "md:col-span-4 min-h-[200px] md:min-h-[238px]",
                image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
                badge: "Fully Managed"
              },
              {
                icon: Zap,
                title: t('home.why.4.title'),
                description: t('home.why.4.desc'),
                className: "md:col-span-6 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000",
                badge: "Instant Liquidity"
              },
              {
                icon: Users,
                title: t('home.why.5.title'),
                description: t('home.why.5.desc'),
                className: "md:col-span-6 min-h-[200px] md:min-h-[250px]",
                image: "https://images.unsplash.com/photo-1522158634235-47a056cc0662?auto=format&fit=crop&q=80&w=1000",
                badge: "Verified Elite"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,106,177,0.15)] transition-all duration-500 group border border-gray-100 hover:border-[#256ab1]/30 flex flex-col justify-between ${feature.className}`}
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

      {/* Featured Assets */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-2">{t('home.featured.title')}</h2>
              <p className="text-gray-600">Discover exclusive opportunities.</p>
            </div>
            <Link
              to="/assets"
              className="hidden md:flex items-center text-[#256ab1] font-medium hover:text-[#0b1b34] transition-colors"
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
                className="flex-shrink-0 w-[300px] sm:w-auto bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-pointer"
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
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-[#0b1b34] bg-white hover:bg-gray-50 transition-colors"
            >
              {t('home.featured.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works - Editorial Redesign */}
      <section ref={howRef} className="bg-[#0b1b34] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Left: Sticky Content */}
            <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex flex-col justify-center pt-24 md:pt-0 z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">{t('home.how.title')}</h2>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a2b4c] hidden md:block">
                <motion.img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000" 
                  alt="List & Invite"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: img1Opacity }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Stake & Settle"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: img2Opacity }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000" 
                  alt="Smart Scheduling"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: img3Opacity }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                  alt="AI Governance"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: img4Opacity }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b34]/60 to-transparent mix-blend-overlay" />
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
                    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000"
                  },
                  {
                    icon: PieChart,
                    title: t('home.how.2.title'),
                    description: t('home.how.2.desc'),
                    num: '02',
                    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000"
                  },
                  {
                    icon: CalendarCheck,
                    title: t('home.how.3.title'),
                    description: t('home.how.3.desc'),
                    num: '03',
                    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000"
                  },
                  {
                    icon: ShieldCheck,
                    title: t('home.how.4.title'),
                    description: t('home.how.4.desc'),
                    num: '04',
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
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
                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 md:hidden border border-white/10">
                          <img 
                            src={step.image || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000"} 
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
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
      <section className="py-20 bg-white">
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
    </div>
  );
};
