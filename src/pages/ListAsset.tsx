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
    <div className="min-h-screen bg-[#0b1b34] pt-24 pb-20">
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

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A7E8]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            {t('listAsset.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('listAsset.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Network Effect */}
      <section className="py-20 bg-[#1a2b4c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#49bee4] bg-[#49bee4]/10 px-3 py-1.5 rounded-full mb-4">
            {t('listAsset.globalKey.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {t('listAsset.globalKey.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {t('listAsset.globalKey.desc')}
          </p>
        </div>
      </section>

      {/* Scrolling Steps */}
      <section id="tutorial" ref={howRef} className="bg-[#0b1b34] text-white relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Left: Sticky Phone */}
            <div className="hidden md:flex w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex-col items-center justify-center z-10">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl w-36 mx-auto z-50" />
                <div className="w-full h-full bg-white relative">
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
                <div className="absolute -left-[10px] top-24 w-[2px] h-10 bg-gray-800 rounded-l-lg" />
                <div className="absolute -left-[10px] top-36 w-[2px] h-16 bg-gray-800 rounded-l-lg" />
                <div className="absolute -right-[10px] top-32 w-[2px] h-20 bg-gray-800 rounded-r-lg" />
              </div>
            </div>

            {/* Right: Scrolling Steps */}
            <div className="w-full md:w-1/2 relative pb-16 md:pb-[5vh] md:pt-[5vh]">
              <div className="absolute left-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-white/10 hidden md:block" />
              <motion.div
                className="absolute left-[27px] top-[5vh] bottom-[5vh] w-0.5 bg-[#49bee4] origin-top hidden md:block"
                style={{ scaleY: howScrollY }}
              />

              <div className="flex flex-col gap-16 md:gap-0">
                {[
                  { icon: Upload,     title: t('listAsset.step1.title'), description: t('listAsset.step1.desc'), num: '01', Visual: ListVisual1 },
                  { icon: ShieldCheck, title: t('listAsset.step2.title'), description: t('listAsset.step2.desc'), num: '02', Visual: ListVisual2 },
                  { icon: FileText,   title: t('listAsset.step3.title'), description: t('listAsset.step3.desc'), num: '03', Visual: ListVisual3 },
                  { icon: Rocket,     title: t('listAsset.step4.title'), description: t('listAsset.step4.desc'), num: '04', Visual: ListVisual4 },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.5 }}
                    className="md:min-h-[60vh] flex flex-col justify-center relative pl-0 md:pl-20 group"
                  >
                    <div className="text-6xl font-display font-bold text-white/5 mb-4 md:hidden">
                      {step.num}
                    </div>

                    <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#0b1b34] border-2 border-white/20 group-hover:border-[#49bee4] rounded-full items-center justify-center z-10 transition-colors duration-500">
                      <step.icon className="w-6 h-6 text-white/50 group-hover:text-[#49bee4] transition-colors duration-500" />
                    </div>

                    <div className="relative">
                      <div className="hidden md:block absolute -left-12 -top-16 text-9xl font-display font-bold text-white/5 select-none pointer-events-none z-0 group-hover:text-white/10 transition-colors duration-500">
                        {step.num}
                      </div>

                      <div className="relative z-10">
                        <div className="w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl shadow-black/50 overflow-hidden mb-8 md:hidden relative mx-auto">
                          <div className="absolute top-0 inset-x-0 h-5 bg-black rounded-b-2xl w-32 mx-auto z-20" />
                          <div className="w-full h-full bg-[#f8f9fa] relative"><step.Visual /></div>
                        </div>

                        <div className="w-16 h-16 bg-[#1a2b4c] rounded-2xl flex items-center justify-center mb-6 border border-white/10 md:hidden">
                          <step.icon className="w-8 h-8 text-[#49bee4]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{step.title}</h3>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why List */}
      <section className="py-24 bg-[#0b1b34] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{t('listAsset.why.title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('listAsset.why.1.title'), desc: t('listAsset.why.1.desc') },
              { title: t('listAsset.why.2.title'), desc: t('listAsset.why.2.desc') },
              { title: t('listAsset.why.3.title'), desc: t('listAsset.why.3.desc') },
              { title: t('listAsset.why.4.title'), desc: t('listAsset.why.4.desc') },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a2b4c] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#05A7E8]/10 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-[#49bee4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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
