import { Bell, HelpCircle, LogOut, Search } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggler } from '../components/ThemeToggler';
import { MANAGER_PROFILE } from '../data';
import { useI18n } from '../i18nContext';

export const MainHeader = () => {
    const { t } = useI18n()
  return (
    <header className="h-16 px-8 bg-white border-b border-slate-150 items-center justify-between z-30 sticky top-0 left-0 hidden md:flex select-none">
        <div className="flex items-center gap-3">
        <div className="relative w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
            </span>
            <input 
            type="text" 
            placeholder="Search global workspace indexes..." 
            className="w-full bg-slate-50 border-none rounded-lg py-1.5 pl-9 pr-4 text-xs font-medium focus:ring-1 focus:ring-primary/20 placeholder-slate-400"
            />
        </div>
        </div>

        <div className="flex items-center gap-5">
        <LanguageSelector align="right" />
        <ThemeToggler />
        <button className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-50 transition-colors">
            <HelpCircle className="w-5 h-5" />
        </button>
        <button className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-50 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
        </button>
        
        <button 
            id="header_logout_btn"
            onClick={() => {
            localStorage.removeItem('trp_is_authenticated');
            window.location.reload();
            }}
            className="text-slate-400 hover:text-rose-500 p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer relative flex items-center justify-center active:scale-90"
            title="Log Out"
        >
            <LogOut className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-5">
            <div className="text-right">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 block">{MANAGER_PROFILE.name}</p>
            <p className="text-[10px] text-slate-400 font-bold block">{t('sidebar.manager')}</p>
            </div>
            <img 
            className="w-9 h-9 rounded-full object-cover border border-slate-200" 
            src={MANAGER_PROFILE.image} 
            alt={MANAGER_PROFILE.name} 
            referrerPolicy="no-referrer"
            />
        </div>
        </div>
    </header>
  )
}
