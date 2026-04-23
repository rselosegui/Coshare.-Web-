import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../store/language';
import { Globe, Apple, X, Menu } from 'lucide-react';
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
          const headerOffset = 100;
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
              className="relative z-50 w-full bg-[#0b1b34] overflow-hidden shadow-lg border-b border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-20 sm:h-24 flex items-center justify-between gap-2">

                {/* Left: Text */}
                <div className="flex items-center z-20 w-1/3 pr-2">
                  <span className="text-[10px] sm:text-sm font-bold text-white tracking-wide leading-tight line-clamp-2">
                    {t('banner.text')}
                  </span>
                </div>

                {/* Middle: The Peeking Phone (Always Centered) */}
                <div className="absolute left-[40%] sm:left-1/2 -translate-x-1/2 bottom-0 w-28 sm:w-36 md:w-40 z-10 pointer-events-none">
                  <motion.div
                    className="w-full aspect-[9/18] bg-black rounded-t-[1rem] sm:rounded-t-[2rem] border-[2px] sm:border-[6px] border-gray-800 shadow-2xl origin-bottom"
                    initial={{ y: -10, rotate: 15 }}
                    animate={{ y: [0, -15, 0], rotate: [12, 10, 12] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginBottom: '-110%' }}
                  >
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-1.5 sm:h-4 bg-black rounded-b-md sm:rounded-b-xl w-6 sm:w-16 mx-auto z-20" />

                    <div className="w-full h-full rounded-t-[0.8rem] sm:rounded-t-[1.5rem] overflow-hidden">
                      <img
                        src="/assets/step-1.png"
                        alt="App Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Right: CTA + Close */}
                <div className="flex items-center justify-end gap-2 sm:gap-4 z-20 w-1/3">
                  <a
                    href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden bg-[#49bee4] text-[#0b1b34] text-[9px] sm:text-sm font-bold px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full active:scale-95 whitespace-nowrap"
                  >
                    <span className="relative z-10">{t('banner.cta')}</span>
                  </a>

                  <button
                    onClick={() => setIsBannerVisible(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contextual Header — height is always h-14, never changes */}
        <header className={cn(
          "transition-[background-color,border-color,box-shadow] duration-300 relative z-0",
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_16px_rgba(0,0,0,0.05)]"
            : "bg-surface"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-14 flex items-center justify-between relative">

              {/* LEFT: Logo */}
              <Link to="/" className="font-display font-bold text-2xl tracking-tighter text-primary shrink-0">
                <span dir="ltr">Coshare<span className="text-[#05A7E8]">.</span></span>
              </Link>

              {/* MIDDLE: Links — desktop only, absolutely centered in the row */}
              <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
                <Link
                  to="/how-it-works"
                  className={cn(
                    "text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-150 whitespace-nowrap",
                    location.pathname === '/how-it-works'
                      ? "text-[#0b1b34] bg-black/[0.06]"
                      : "text-gray-500 hover:text-[#0b1b34] hover:bg-black/[0.04]"
                  )}
                >{t('nav.howItWorks')}</Link>
                <Link
                  to="/#use-cases"
                  className="text-sm font-medium px-3.5 py-1.5 rounded-full text-gray-500 hover:text-[#0b1b34] hover:bg-black/[0.04] transition-colors duration-150 whitespace-nowrap"
                >{t('nav.useCases')}</Link>
                <Link
                  to="/faq"
                  className={cn(
                    "text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-150 whitespace-nowrap",
                    location.pathname === '/faq'
                      ? "text-[#0b1b34] bg-black/[0.06]"
                      : "text-gray-500 hover:text-[#0b1b34] hover:bg-black/[0.04]"
                  )}
                >{t('nav.faq')}</Link>
                <Link
                  to="/list-asset"
                  className={cn(
                    "text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-150 whitespace-nowrap",
                    location.pathname === '/list-asset'
                      ? "text-[#0b1b34] bg-black/[0.06]"
                      : "text-gray-500 hover:text-[#0b1b34] hover:bg-black/[0.04]"
                  )}
                >{t('nav.listAsset')}</Link>
              </div>

              {/* RIGHT: Language + Mobile Menu */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-[#0b1b34] transition-colors uppercase tracking-wider px-2.5 py-1.5 rounded-full hover:bg-black/[0.04]"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang === 'EN' ? 'AR' : 'EN'}</span>
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-black/[0.04]"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-surface border-t border-gray-100 absolute top-full left-0 w-full shadow-lg z-50"
            >
              <div className="px-4 py-6 flex flex-col space-y-4 bg-white/95 backdrop-blur-md">
                <Link
                  to="/how-it-works"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold text-primary"
                >{t('nav.howItWorks')}</Link>
                <Link
                  to="/#use-cases"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold text-primary"
                >{t('nav.useCases')}</Link>
                <Link
                  to="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold text-primary"
                >{t('nav.faq')}</Link>
                <Link
                  to="/list-asset"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold text-primary"
                >{t('nav.listAsset')}</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 pt-4 sm:pt-8">
          <AnimatePresence>
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
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
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
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
              <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                <Link to="/#how-it-works" className="hover:text-white transition-colors">{t('nav.howItWorks')}</Link>
                <Link to="/faq" className="hover:text-white transition-colors">{t('nav.faq')}</Link>
                <Link to="/list-asset" className="hover:text-white transition-colors">{t('nav.listAsset')}</Link>
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
