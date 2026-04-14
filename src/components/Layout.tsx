import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { Globe, Instagram, Linkedin, Apple, X, Menu } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'motion/react';



export const Layout = () => {

  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowNavLinks(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 100; // Adjust this value based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);





  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      {/* Sticky Header Container */}
      <div className="sticky top-0 z-50 flex flex-col">
        {/* Announcement Banner */}
        <AnimatePresence>
          {isBannerVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative z-50 w-full bg-[#000000] border-b border-white/10 overflow-hidden"
            >
              {/* Sweeping Light Ray Effect */}
              <motion.div
                className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center shadow-lg overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <svg
                        viewBox="0 0 24 24"
                        style={{ width: '20px', height: '20px' }}
                        className="text-white relative z-10 flex-shrink-0"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.002 1.459 2.196 3.1 3.775 3.046 1.522-.06 2.093-1.001 3.93-1.001 1.838 0 2.365.998 3.96.96 1.62-.027 2.667-1.48 3.662-2.928 1.147-1.676 1.612-3.3 1.638-3.385-.034-.015-3.149-1.205-3.184-4.81-.026-3.003 2.454-4.444 2.568-4.512-1.404-2.059-3.57-2.285-4.33-2.342-1.89-.161-3.112 1.003-3.608 1.003-.497 0-1.666-.889-3.01-.889h.01zm2.32-4.144c.854-1.034 1.43-2.473 1.272-3.911-1.235.05-2.732.823-3.618 1.853-.793.916-1.484 2.387-1.296 3.788 1.378.107 2.788-.696 3.642-1.73z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white tracking-wide">{t('banner.text')}</span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                        <span className="flex text-[#F5A623] text-xs">★★★★★</span>
                        <span>App Store</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden bg-white text-black text-xs font-bold px-6 py-2 rounded-full hover:scale-105 hover:bg-gray-100 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative z-10">{t('banner.cta')}</span>
                    </a>
                    <button onClick={() => setIsBannerVisible(false)} className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-gray-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex sm:hidden items-center justify-between py-3 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <button onClick={() => setIsBannerVisible(false)} className="p-1 rounded-full hover:bg-white/20 transition-colors text-gray-400 hover:text-white flex-shrink-0 -ml-1">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <svg
                        viewBox="0 0 24 24"
                        style={{ width: '16px', height: '16px' }}
                        className="text-white relative z-10 flex-shrink-0"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.002 1.459 2.196 3.1 3.775 3.046 1.522-.06 2.093-1.001 3.93-1.001 1.838 0 2.365.998 3.96.96 1.62-.027 2.667-1.48 3.662-2.928 1.147-1.676 1.612-3.3 1.638-3.385-.034-.015-3.149-1.205-3.184-4.81-.026-3.003 2.454-4.444 2.568-4.512-1.404-2.059-3.57-2.285-4.33-2.342-1.89-.161-3.112 1.003-3.608 1.003-.497 0-1.666-.889-3.01-.889h.01zm2.32-4.144c.854-1.034 1.43-2.473 1.272-3.911-1.235.05-2.732.823-3.618 1.853-.793.916-1.484 2.387-1.296 3.788 1.378.107 2.788-.696 3.642-1.73z" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-semibold text-white leading-tight line-clamp-2">{t('banner.text')}</span>
                      <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-0.5">
                        <span className="flex text-[#F5A623]">★★★★★</span>
                        <span>App Store</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden bg-white text-black text-[10px] font-bold px-4 py-1.5 rounded-full active:scale-95 transition-transform flex-shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10">{t('banner.cta')}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contextual Header */}
        <header className={cn(
          "transition-all duration-500 relative z-0",
          isScrolled
            ? "bg-surface/80 backdrop-blur-2xl border-b border-white/10 py-2"
            : "bg-surface py-4"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-12 relative">
              <div className="flex items-center space-x-6">
                <Link to="/" className="font-display font-bold text-2xl tracking-tighter text-primary">
                  <span dir="ltr">Coshare<span className="text-[#05A7E8]">.</span></span>
                </Link>

              </div>

              {/* Centered Navigation Links (Desktop) */}
              {(location.pathname === '/' || location.pathname === '/how-it-works' || location.pathname === '/faq') && (
                <div className={cn(
                  "hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 transition-all duration-500",
                  (showNavLinks || location.pathname !== '/') ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
                )}>
                  <Link to="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors">{t('nav.howItWorks')}</Link>
                  <Link to="/#use-cases" className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors">{t('nav.useCases')}</Link>
                  <Link to="/faq" className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors">{t('nav.faq')}</Link>
                </div>
              )}

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* 1. The Language Button */}
                <button
                  onClick={toggleLang}
                  className="flex items-center space-x-1 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-wider px-2 py-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang === 'EN' ? 'AR' : 'EN'}</span>
                </button>

                {/* 2. The Menu Button (Sits NEXT to language, not inside it) */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-500 hover:text-primary transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden bg-surface border-t border-gray-100 dark:border-white/10 absolute top-full left-0 w-full shadow-lg z-40"
              >
                <div className="px-4 py-4 flex flex-col space-y-4">
                  <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-primary">{t('nav.howItWorks')}</Link>
                  <Link to="/#use-cases" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-primary">{t('nav.useCases')}</Link>
                  <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-primary">{t('nav.faq')}</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 pb-40 lg:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>



      {/* Footer */}
      <footer className="bg-[#0b1b34] border-t border-white/10 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Brand & Tagline */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                <span dir="ltr">Coshare<span className="text-[#05A7E8]">.</span></span>
              </h3>
              <p className="text-sm text-gray-400 text-center md:text-left max-w-xs">{t('footer.tagline')}</p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">{t('footer.follow')}</h4>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/coshare.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/CoshareAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/coshareai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* App Store & Links */}
            <div className="flex flex-col items-center md:items-end">
              <a
                href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-[#0b1b34] px-5 py-2.5 rounded-full border border-white/10 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 mb-8 group"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: '24px', height: '24px' }}
                  className="mr-3 group-hover:scale-110 transition-transform flex-shrink-0"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.002 1.459 2.196 3.1 3.775 3.046 1.522-.06 2.093-1.001 3.93-1.001 1.838 0 2.365.998 3.96.96 1.62-.027 2.667-1.48 3.662-2.928 1.147-1.676 1.612-3.3 1.638-3.385-.034-.015-3.149-1.205-3.184-4.81-.026-3.003 2.454-4.444 2.568-4.512-1.404-2.059-3.57-2.285-4.33-2.342-1.89-.161-3.112 1.003-3.608 1.003-.497 0-1.666-.889-3.01-.889h.01zm2.32-4.144c.854-1.034 1.43-2.473 1.272-3.911-1.235.05-2.732.823-3.618 1.853-.793.916-1.484 2.387-1.296 3.788 1.378.107 2.788-.696 3.642-1.73z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase leading-none tracking-wider opacity-60">{t('footer.download')}</p>
                  <p className="text-base font-bold leading-tight">{t('footer.appStore')}</p>
                </div>
              </a>
              <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <Link to="/#how-it-works" className="hover:text-white transition-colors">{t('nav.howItWorks')}</Link>
                <Link to="/faq" className="hover:text-white transition-colors">{t('nav.faq')}</Link>
                <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
                <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Coshare. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};
