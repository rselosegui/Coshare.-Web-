import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, Car, Calendar, PlusCircle } from 'lucide-react';
import { useLanguage } from '../store/language';
import { cn } from './Layout';

export const Dock = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { name: t('nav.vault'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.assets'), path: '/assets', icon: Car },
    { name: t('nav.booking'), path: '/booking', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="flex items-center bg-surface/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full px-4 py-2 pointer-events-auto"
      >
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group",
                  isActive ? "text-primary" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "stroke-[2.5px]")} />
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                  />
                )}
                
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider">
                  {item.name}
                </span>
              </Link>
            );
          })}
          
          <div className="w-px h-6 bg-gray-200/50 mx-2" />
          
          <Link
            to="/list-onboarding"
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group bg-primary text-on-primary hover:scale-110 shadow-lg shadow-primary/20",
              location.pathname === '/list-onboarding' ? "ring-2 ring-offset-2 ring-primary" : ""
            )}
          >
            <PlusCircle className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-wider">
              List Asset
            </span>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};
