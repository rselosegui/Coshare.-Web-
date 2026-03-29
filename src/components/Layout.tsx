import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useLanguage } from '../store/language';
import { Globe, User, LogOut, Settings, LayoutDashboard, Calendar, ChevronDown, Instagram, Linkedin, Twitter, Apple, HelpCircle, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Dock } from './Dock';
import { motion, AnimatePresence } from 'motion/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Layout = () => {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowNavLinks(window.scrollY > window.innerHeight * 0.35);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const getPageTitle = () => {
    if (location.pathname.startsWith('/dashboard')) return t('nav.vault');
    if (location.pathname.startsWith('/assets')) return t('nav.assets');
    if (location.pathname.startsWith('/booking')) return t('nav.booking');
    if (location.pathname.startsWith('/list-onboarding')) return t('nav.listAsset');
    if (location.pathname.startsWith('/profile')) return t('nav.profile');
    if (location.pathname.startsWith('/settings')) return t('nav.settings');
    return '';
  };

  const userMenuItems = [
    { name: t('nav.profile'), path: '/profile', icon: User },
    { name: t('nav.vault'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.booking'), path: '/booking', icon: Calendar },
    { name: t('nav.settings'), path: '/settings', icon: Settings },
    { name: t('nav.helpFaq'), path: '/faq', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      {/* Sticky Header Container */}
      <div className="sticky top-0 z-50 flex flex-col">
        {/* Announcement Banner */}
        <div className={cn(
          "relative overflow-hidden bg-[#0b1b34] text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center space-x-4 group transition-all duration-500",
          isScrolled ? "shadow-[0_4px_15px_rgba(0,0,0,0.15)] z-20" : "z-20"
        )}>
          {/* Enhanced shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg] w-1/2"
            animate={{ x: ['-200%', '300%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          />
          <span className="relative z-10">{t('banner.text')}</span>
          <a 
            href="https://apps.apple.com/us/app/coshare-own-more-together/id6760332791" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center text-[#49bee4] group-hover:text-white transition-colors font-bold"
          >
            {t('banner.cta')} <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

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
              <Link to={user ? "/assets" : "/"} className="font-display font-bold text-2xl tracking-tighter text-primary">
                <span dir="ltr">coshare<span className="text-[#05A7E8]">.</span></span>
              </Link>
              {user && (
                <div className="hidden sm:block h-6 w-px bg-gray-200/50" />
              )}
              {user && (
                <h2 className={cn(
                  "hidden sm:block text-xs font-bold text-primary uppercase tracking-[0.2em] transition-opacity duration-500",
                  isScrolled ? "opacity-100" : "opacity-50"
                )}>
                  {getPageTitle()}
                </h2>
              )}
            </div>

            {/* Centered Navigation Links (Desktop) */}
            {(location.pathname === '/' || location.pathname === '/how-it-works' || location.pathname === '/faq') && (
              <div className={cn(
                "hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 transition-all duration-500",
                (showNavLinks || location.pathname !== '/') ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
              )}>
                <Link to="/assets" className="text-sm font-bold text-[#05A7E8] hover:text-[#49bee4] transition-colors">{t('nav.marketplace')}</Link>
                <Link to="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors">{t('nav.howItWorks')}</Link>
                <Link to="/#use-cases" className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors">{t('nav.useCases')}</Link>
                <Link to="/faq" className="text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors">{t('nav.faq')}</Link>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleLang}
                className="flex items-center space-x-1 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'EN' ? 'AR' : 'EN'}</span>
              </button>
              
              {!user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-widest text-on-primary bg-primary rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
                  >
                    {t('nav.signin')}
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold">
                      {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                    </div>
                    <span className="hidden md:block text-xs font-bold text-primary truncate max-w-[120px]">
                      {user.displayName || user.email}
                    </span>
                    <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", isUserMenuOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-[60]"
                      >
                        <div className="p-2 space-y-1">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary transition-colors"
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                          <div className="h-px bg-gray-100 dark:bg-white/10 my-1" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>{t('nav.signout')}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
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

      {/* Floating Dock (Post-login) */}
      {user && <Dock />}

      {/* Footer */}
      <footer className="bg-surface border-t border-white/10 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Brand & Tagline */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-display font-bold text-2xl text-primary mb-2">
                <span dir="ltr">coshare<span className="text-[#05A7E8]">.</span></span>
              </h3>
              <p className="text-sm text-gray-500 text-center md:text-left max-w-xs">{t('footer.tagline')}</p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">{t('footer.follow')}</h4>
              <div className="flex space-x-6">
                <a 
                  href="https://www.instagram.com/coshare.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://x.com/CoshareAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/coshareai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
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
                className="flex items-center bg-black text-white px-5 py-2.5 rounded-full border border-white/10 hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 mb-8 group"
              >
                <Apple className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase leading-none tracking-wider opacity-60">{t('footer.download')}</p>
                  <p className="text-base font-bold leading-tight">{t('footer.appStore')}</p>
                </div>
              </a>
              <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <Link to="/how-it-works" className="hover:text-primary transition-colors">How it works</Link>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
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
