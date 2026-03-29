import React, { useRef } from 'react';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'motion/react';
import { Plus, PieChart, CalendarCheck, ShieldCheck } from 'lucide-react';
import { Visual1, Visual2, Visual3, Visual4 } from '../components/HowItWorksVisuals';

export const HowItWorks = () => {
  const { t } = useLanguage();
  
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
    <div className="min-h-screen bg-[#0b1b34] pt-24 pb-20">
      <SEO 
        title="How It Works | Coshare"
        description="Learn how fractional ownership works with Coshare."
      />
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
    </div>
  );
};
