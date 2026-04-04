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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-md px-6">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="flex items-center justify-around bg-surface/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-full px-2 py-2 pointer-events-auto"
      >
        <div className="flex items-center justify-between w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative flex flex-col items-center justify-center flex-1 h-16 rounded-full transition-all duration-300 group active:scale-90",
                  isActive ? "text-primary" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                )}
              >
                <div className={cn(
                  "p-2.5 rounded-full transition-all duration-300",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", isActive && "stroke-[2.5px]")} />
                </div>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest mt-0.5 transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(37,106,177,0.5)]"
                  />
                )}
              </Link>
            );
          })}
          
          <div className="w-px h-8 bg-gray-200/30 mx-1" />
          
          <Link
            to="/list-onboarding"
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 group bg-primary text-on-primary hover:scale-110 shadow-xl shadow-primary/30 active:scale-95",
              location.pathname === '/list-onboarding' ? "ring-4 ring-primary/20" : ""
            )}
          >
            <PlusCircle className="w-7 h-7" />
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};
