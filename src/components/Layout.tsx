import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useLanguage } from '../store/language';
import { Globe, User, LogOut, Settings, LayoutDashboard, Calendar, ChevronDown } from 'lucide-react';
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const getPageTitle = () => {
    if (location.pathname.startsWith('/dashboard')) return 'The Vault';
    if (location.pathname.startsWith('/assets')) return 'Assets';
    if (location.pathname.startsWith('/booking')) return 'Booking';
    if (location.pathname.startsWith('/list-onboarding')) return 'List Asset';
    if (location.pathname.startsWith('/profile')) return 'Profile';
    if (location.pathname.startsWith('/settings')) return 'Settings';
    return '';
  };

  const userMenuItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: t('nav.vault'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.booking'), path: '/booking', icon: Calendar },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      {/* Contextual Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-surface/80 backdrop-blur-2xl border-b border-white/10 py-2" 
          : "bg-transparent py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center space-x-6">
              <Link to={user ? "/assets" : "/"} className="font-display font-bold text-2xl tracking-tighter text-primary">
                <span dir="ltr">coshare.</span>
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
                    className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-widest text-on-primary bg-primary rounded-full hover:bg-primary/90 transition-all hover:scale-105"
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
                            <span>Sign Out</span>
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

      {/* Minimal Footer */}
      {!user && (
        <footer className="bg-surface border-t border-white/10 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="font-display font-bold text-xl text-primary"><span dir="ltr">coshare.</span></h3>
                <p className="text-sm text-gray-500 mt-1">{t('footer.tagline')}</p>
              </div>
              <div className="flex space-x-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('footer.contact')}</a>
              </div>
            </div>
            <div className="mt-8 text-[10px] font-bold uppercase tracking-widest text-gray-300 text-center md:text-left">
              &copy; {new Date().getFullYear()} Coshare. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
