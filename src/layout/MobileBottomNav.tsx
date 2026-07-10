import { Calculator, History, LayoutDashboard, Smartphone } from "lucide-react";
import { useI18n } from "../i18nContext";
import { Link, NavLink } from "react-router-dom";

export const MobileBottomNav = () => {
    const { t } = useI18n()
  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-around md:hidden z-40 select-none px-4">
        <NavLink to={'/'}
          className={({isActive})=>`flex flex-col items-center justify-center gap-1 cursor-pointer ${isActive ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.dashboard')}</span>
        </NavLink>
        
        <NavLink 
          to={'/pos'}
          className={({isActive})=>`flex flex-col items-center justify-center gap-1 cursor-pointer ${isActive ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.pos')}</span>
        </NavLink>

        <NavLink 
          to={'/inventory'}
          className={({isActive})=>`flex flex-col items-center justify-center gap-1 cursor-pointer ${isActive ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.inventory')}</span>
        </NavLink>

        <NavLink 
          to={'/transactions'}
          className={({isActive})=>`flex flex-col items-center justify-center gap-1 cursor-pointer ${isActive ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.transactions')}</span>
        </NavLink>
      </nav>
  )
}
