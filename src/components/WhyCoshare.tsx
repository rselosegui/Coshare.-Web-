import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Scale, Sparkles, Briefcase, Landmark, ShieldCheck, Key, ChevronDown, ConciergeBell, Users } from 'lucide-react';
import { useLanguage } from '../store/language';

export const WhyCoshare = () => {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
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
  const yTransforms = [y1, y2, y3, y4, y5, y6, y1, y2];

  const bottomFeatures = [
    {
      icon: Scale,
      title: t('home.why.2.title'),
      description: t('home.why.2.desc'),
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
      badge: t('home.why.2.badge')
    },
    {
      icon: Sparkles,
      title: t('home.why.3.title'),
      description: t('home.why.3.desc'),
      image: "https://images.unsplash.com/photo-1582672060624-cdac1654672b?auto=format&fit=crop&q=80&w=1000",
      badge: t('home.why.3.badge')
    },
    {
      icon: Briefcase,
      title: t('home.why.4.title'),
      description: t('home.why.4.desc'),
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
      badge: t('home.why.4.badge')
    },
    {
      icon: Landmark,
      title: t('home.why.5.title'),
      description: t('home.why.5.desc'),
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1000",
      badge: t('home.why.5.badge')
    },
    {
      icon: ConciergeBell,
      title: t('home.why.8.title'),
      description: t('home.why.8.desc'),
      image: "https://images.unsplash.com/photo-1560067174-c5a3a8f37060?auto=format&fit=crop&q=80&w=1000",
      badge: t('home.why.8.badge')
    },
    {
      icon: ShieldCheck,
      title: t('home.why.7.title'),
      description: t('home.why.7.desc'),
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
      badge: t('home.why.7.badge')
    }
  ];

  return (
    <section id="why-coshare" ref={whyRef} className="relative py-12 md:py-16 bg-[#f8f9fa] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4 text-balance">
            {t('home.why.title').split('Coshare.')[0]}
            <span dir="ltr" className="inline-block">Coshare<span className="text-[#05A7E8]">.</span></span>
            {t('home.why.title').split('Coshare.')[1]}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl text-balance">
            {t('home.why.subtitle')}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          {/* Top Row: Smart Ownership and Share & Swap Network */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Key,
                title: t('home.why.6.title'),
                description: t('home.why.6.desc'),
                image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.6.badge')
              },
              {
                icon: Users,
                title: t('home.why.1.title'),
                description: t('home.why.1.desc'),
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
                badge: t('home.why.1.badge')
              }
            ].map((feature, index) => (
              <motion.div
                key={`top-${index}`}
                initial={isMobile ? false : { opacity: 0, y: 40 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: "-100px" }}
                transition={isMobile ? undefined : { duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className="col-span-1 relative overflow-hidden rounded-3xl bg-[#256ab1] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group border border-white/5 hover:border-white/20 flex flex-col justify-between min-h-[350px] md:min-h-[420px]"
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
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                      <feature.icon className="w-7 h-7 text-white group-hover:text-[#256ab1] transition-colors duration-500" />
                    </div>
                    {feature.badge && (
                      <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20 group-hover:bg-white group-hover:text-[#256ab1] transition-all duration-500">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display font-bold text-white mb-2 text-2xl md:text-3xl tracking-tight leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-500 text-base md:text-lg max-w-xl">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: Progressive Disclosure on Mobile, Grid on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bottomFeatures.map((feature, index) => {
              const isOpen = expandedIndex === index;

              return (
                <motion.div
                  key={`bottom-${index}`}
                  initial={isMobile ? false : { opacity: 0, y: 40 }}
                  whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                  viewport={isMobile ? undefined : { once: true, margin: "-100px" }}
                  transition={isMobile ? undefined : { duration: 0.7, delay: (index + 2) * 0.1, ease: "easeOut" }}
                  className={`col-span-1 relative overflow-hidden rounded-3xl transition-all duration-500 group flex flex-col
                    ${isOpen ? 'bg-[#256ab1]/5 shadow-lg border-[#256ab1]/30' : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-gray-100'}
                    border hover:shadow-xl hover:-translate-y-1 sm:min-h-[220px]`}
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setExpandedIndex(isOpen ? null : index);
                    }
                  }}
                >
                  {/* Parallax Background Image */}
                  <div className={`absolute inset-0 z-0 transition-opacity duration-700 overflow-hidden bg-[#0b1b34]
                    ${isOpen ? 'opacity-10 md:opacity-0' : 'opacity-0 md:group-hover:opacity-20'}`}>
                    <motion.img
                      src={feature.image}
                      alt=""
                      className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-125 group-hover:scale-110 transition-transform duration-1000"
                      style={{ y: yTransforms[index + 2] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b34] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-4 md:p-6">
                    {/* Header Row */}
                    <div className="flex justify-between items-center md:items-start md:mb-6">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm
                        ${isOpen ? 'bg-[#256ab1] scale-110' : 'bg-[#f8f9fa] md:group-hover:bg-[#256ab1] md:group-hover:scale-110 md:group-hover:rotate-3'}`}>
                        <feature.icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500
                          ${isOpen ? 'text-white' : 'text-[#256ab1] md:group-hover:text-white'}`} />
                      </div>

                      {/* Mobile Title */}
                      <div className="flex-1 px-4 sm:hidden">
                        <h3 className={`font-display font-bold transition-colors duration-500 text-sm
                          ${isOpen ? 'text-[#256ab1]' : 'text-[#0b1b34]'}`}>
                          {feature.title}
                        </h3>
                      </div>

                      {/* Mobile Chevron */}
                      <div className="sm:hidden">
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-[#256ab1]' : 'text-gray-400'}`} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable Body */}
                    <AnimatePresence initial={false}>
                      {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 640)) && (
                        <motion.div
                          initial={window.innerWidth < 640 ? { height: 0, opacity: 0 } : false}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            marginTop: window.innerWidth < 640 ? 12 : 32
                          }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden sm:block"
                        >
                          {feature.badge && (
                            <span className={`inline-block mb-2 md:mb-3 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border transition-all duration-500
                              ${isOpen ? 'bg-[#256ab1] text-white border-transparent' : 'bg-[#256ab1]/5 text-[#256ab1] border-[#256ab1]/10 md:group-hover:bg-[#256ab1] md:group-hover:text-white md:group-hover:border-transparent'}`}>
                              {feature.badge}
                            </span>
                          )}
                          <h3 className="hidden sm:block font-display font-bold text-[#0b1b34] mb-1 md:mb-2 md:group-hover:text-[#256ab1] transition-colors duration-500 text-lg md:text-xl">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed md:group-hover:text-gray-900 transition-colors duration-500 text-sm md:text-base">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
