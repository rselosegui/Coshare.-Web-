import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Upload, ShieldCheck, FileText, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../store/language';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { ListVisual1, ListVisual2, ListVisual3, ListVisual4 } from '../components/ListAssetVisuals';

export const ListAsset = () => {
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
    <div className="min-h-screen bg-[#f8f9fa]">
      <SEO
        title="List Your Asset | Coshare — Fractional Co-Ownership"
        description="List your supercar, yacht, or property on Coshare. Sell fractional shares, unlock liquidity, and join a global network of co-owners."
        canonical="https://coshare.ai/list-asset"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "List Your Asset on Coshare",
          "url": "https://coshare.ai/list-asset",
          "provider": { "@type": "Organization", "name": "Coshare", "url": "https://coshare.ai" },
          "description": "List your supercar, yacht, or property on Coshare. Sell fractional shares, unlock liquidity, and join a global network of co-owners.",
          "serviceType": "Fractional Asset Co-Ownership"
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-[#0b1b34] rounded-b-[60px] md:rounded-b-[100px] z-10 shadow-2xl shadow-[#0b1b34]/20">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#49bee4]/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight text-balance"
          >
            {t('listAsset.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light text-balance"
          >
            {t('listAsset.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Value Prop Section - Floating Overlap */}
      <section className="relative z-30 -mt-20 md:-mt-32 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 text-center"
          >
            <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#256ab1] bg-[#49bee4]/10 px-3 py-1.5 rounded-full mb-6">
              {t('listAsset.globalKey.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0b1b34] mb-4">
              {t('listAsset.globalKey.title')}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t('listAsset.globalKey.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section id="tutorial" ref={howRef} className="bg-[#f8f9fa] text-gray-900 relative py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Left: Sticky Phone */}
            <div className="hidden md:flex w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex-col justify-center z-10">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl shadow-black/20 overflow-hidden mx-auto">
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 inset-x-0 h-6 bg-black/40 backdrop-blur-md rounded-full w-28 mx-auto z-20 border border-white/5" />
                <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative">
                  <motion.div className="absolute inset-0" style={{ opacity: img1Opacity }}>
                    <ListVisual1 />
                  </motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img2Opacity }}>
                    <ListVisual2 />
                  </motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img3Opacity }}>
                    <ListVisual3 />
                  </motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: img4Opacity }}>
                    <ListVisual4 />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Steps */}
            <div className="w-full md:w-1/2 relative pb-16 md:pb-[5vh] md:pt-[5vh]">
              {/* Progress Line Background */}
              <div className="absolute left-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-gray-200 hidden md:block" />
              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-[#49bee4] origin-top hidden md:block"
                style={{ scaleY: howScrollY }}
              />

              <div className="flex flex-col gap-24 md:gap-0">
                {[
                  { icon: Upload,     title: t('listAsset.step1.title'), description: t('listAsset.step1.desc'), num: '01', Visual: ListVisual1 },
                  { icon: ShieldCheck, title: t('listAsset.step2.title'), description: t('listAsset.step2.desc'), num: '02', Visual: ListVisual2 },
                  { icon: FileText,   title: t('listAsset.step3.title'), description: t('listAsset.step3.desc'), num: '03', Visual: ListVisual3 },
                  { icon: Rocket,     title: t('listAsset.step4.title'), description: t('listAsset.step4.desc'), num: '04', Visual: ListVisual4 }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, margin: "-20% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="md:min-h-[60vh] flex flex-col justify-center relative pl-0 md:pl-20 group"
                  >
                    {/* Mobile Number */}
                    <div className="text-6xl font-display font-bold text-gray-100 mb-4 md:hidden -mt-4">
                      {step.num}
                    </div>

                    {/* Desktop Node */}
                    <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#f8f9fa] border-2 border-gray-200 group-hover:border-[#49bee4] rounded-full items-center justify-center z-10 transition-colors duration-500">
                      <step.icon className="w-6 h-6 text-gray-400 group-hover:text-[#49bee4] transition-colors duration-500" />
                    </div>

                    <div className="relative">
                      {/* Desktop Number Background */}
                      <div className="hidden md:block absolute -left-12 -top-16 text-9xl font-display font-bold text-gray-100 select-none pointer-events-none z-0 transition-colors duration-500 group-hover:text-gray-200">
                        {step.num}
                      </div>

                      <div className="relative z-10">
                        {/* Mobile Image */}
                        <div className="w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl shadow-black/20 overflow-hidden mb-8 md:hidden relative mx-auto">
                          {/* Dynamic Island Notch */}
                          <div className="absolute top-1.5 inset-x-0 h-5 bg-black/40 backdrop-blur-md rounded-full w-24 mx-auto z-20 border border-white/5" />
                          <div className="w-full h-full bg-[#f8f9fa] flex flex-col relative">
                            <step.Visual />
                          </div>
                        </div>

                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 md:hidden">
                          <step.icon className="w-8 h-8 text-[#49bee4]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900 md:pt-8">{step.title}</h3>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why List With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">{t('listAsset.why.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('listAsset.why.1.title'), desc: t('listAsset.why.1.desc') },
              { title: t('listAsset.why.2.title'), desc: t('listAsset.why.2.desc') },
              { title: t('listAsset.why.3.title'), desc: t('listAsset.why.3.desc') },
              { title: t('listAsset.why.4.title'), desc: t('listAsset.why.4.desc') }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#49bee4]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
