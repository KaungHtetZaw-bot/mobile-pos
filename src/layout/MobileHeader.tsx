import { Calculator, LayoutDashboard, Menu, Smartphone, X, History, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { LanguageSelector } from '../components/LanguageSelector'
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18nContext';
import { MANAGER_PROFILE } from '../data';
import { ThemeToggler } from '../components/ThemeToggler';
import { NavLink } from 'react-router-dom';

export const MobileHeader = () => {
    const { t } = useI18n()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-slate-150 h-16 flex items-center justify-between px-6 md:hidden select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
            <Calculator className="w-4 h-4 stroke-2" />
          </div>
          <span className="font-sans font-black text-slate-900 text-sm tracking-tight">MobilePulse</span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector align="right" />
          <ThemeToggler />
          <img 
            className="w-8 h-8 rounded-full object-cover" 
            src={MANAGER_PROFILE.image} 
            alt={MANAGER_PROFILE.name} 
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-white z-40 p-6 flex flex-col md:hidden space-y-6"
          >
            <div className="space-y-2">
              <NavLink
                to={'/'}
                className={({isActive})=>`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  isActive ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                {t('sidebar.dashboard')}
              </NavLink>

              <NavLink
                to={'/pos'}
                className={({isActive})=>`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  isActive ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <Calculator className="w-5 h-5" />
                {t('sidebar.pos')}
              </NavLink>

              <NavLink
                to={'/inventory'}
                className={({isActive})=>`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  isActive ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                {t('sidebar.inventory')}
              </NavLink>

              <NavLink
                to={'/transactions'}
                className={({isActive})=>`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  isActive ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <History className="w-5 h-5" />
                {t('sidebar.transactions')}
              </NavLink>
              
              <NavLink
                to={'/admin'}
                className={({isActive})=>`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  isActive ? 'bg-slate-100 text-slate-800' : 'text-slate-500'
                }`}
              >
                <Settings className="w-5 h-5" />
                {t('sidebar.admin')}
              </NavLink>
            </div>

            <button 
              id="mobile_logout_btn"
              className="w-full py-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>

            <button 
              
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md text-center"
            >
              {t('sidebar.newSale')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
