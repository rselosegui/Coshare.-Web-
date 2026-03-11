import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useLanguage } from '../store/language';
import { Menu, X, Globe, User, LayoutDashboard, Car, Calendar, PlusCircle, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Layout = () => {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t('nav.vault'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.assets'), path: '/assets', icon: Car },
    { name: t('nav.booking'), path: '/booking', icon: Calendar },
    { name: 'List Asset', path: '/list-onboarding', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-display font-bold text-2xl tracking-tight text-[#0b1b34]">
                coshare.
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleLang}
                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-[#0b1b34] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'EN' ? 'AR' : 'EN'}</span>
              </button>
              
              {!user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/assets"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-md text-[#0b1b34] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b1b34] transition-colors"
                  >
                    {t('nav.assets')}
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0b1b34] hover:bg-[#0b1b34]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b1b34] transition-colors"
                  >
                    {t('nav.signin')}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Desktop Sidebar (Post-login) */}
        {user && (
          <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 pt-8 px-4">
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-[#0b1b34] text-white" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#0b1b34]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pb-8 px-4">
              <div className="flex items-center space-x-2 text-xs font-medium text-[#256ab1]">
                <span className="w-2 h-2 rounded-full bg-[#49bee4] animate-pulse"></span>
                <span>OPERATIONAL</span>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Bar (Post-login) */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100 pb-safe">
          <div className="flex justify-around items-center h-16 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                    isActive ? "text-[#0b1b34]" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "fill-current opacity-20")} />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-display font-bold text-xl text-[#0b1b34]">coshare.</h3>
              <p className="text-sm text-gray-500 mt-1">{t('footer.tagline')}</p>
            </div>
            <div className="flex space-x-6 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-[#0b1b34] transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-[#0b1b34] transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-[#0b1b34] transition-colors">{t('footer.contact')}</a>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Coshare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
