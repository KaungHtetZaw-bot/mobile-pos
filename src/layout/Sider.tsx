import { Calculator, ChevronLeft, ChevronRight, History, LayoutDashboard, LogOut, Plus, Settings, Smartphone } from "lucide-react";
import { useI18n } from "../i18nContext";
import { MANAGER_PROFILE } from "../data";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Sider = () => {
    const { t } = useI18n()
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  return (
    <aside className={`relative bg-white border-r border-slate-150 flex flex-col h-screen sticky top-0 left-0 transition-all duration-300 ease-in-out z-40 hidden md:flex p-4 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        
        {/* Toggle Collapse Button (Absolute at the border line) */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-6 -right-3 w-6 h-6 bg-white border border-slate-200 hover:border-slate-300 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm active:scale-95 transition-all cursor-pointer z-50"
          title={isSidebarCollapsed ? t('sidebar.expandSidebar') : t('sidebar.collapseSidebar')}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 stroke-2" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 stroke-2" />
          )}
        </button>

        {/* Brand & Logo */}
        <div className="mb-8 select-none flex items-center px-1.5 h-10">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 flex-shrink-0">
            <Calculator className="w-5 h-5 stroke-2" />
          </div>
          <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
            isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
          }`}>
            <h1 className="text-sm font-black tracking-tight text-slate-900 font-sans leading-none">MobilePulse</h1>
            {/* <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-0.5">Premium Hub</p> */}
          </div>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="flex-1 space-y-1.5">
          <NavLink
            to={'/'}
            className={({isActive})=>`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
               isActive
                ? 'bg-primary text-white shadow-md shadow-primary/15' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title={t('sidebar.dashboard')}
          >
            <LayoutDashboard className="w-5 h-5 stroke-2 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.dashboard')}
            </span>
          </NavLink>

          <NavLink
            to={'/pos'}
            className={({isActive})=>`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/15' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title={t('sidebar.pos')}
          >
            <Calculator className="w-5 h-5 stroke-2 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.pos')}
            </span>
          </NavLink>

          <NavLink
            to={'/inventory'}
            className={({isActive})=>`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/15' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title={t('sidebar.inventory')}
          >
            <Smartphone className="w-5 h-5 stroke-2 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.inventory')}
            </span>
          </NavLink>

          <NavLink
            to={'/transactions'}
            className={({isActive})=>`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/15' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title={t('sidebar.transactions')}
          >
            <History className="w-5 h-5 stroke-2 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.transactions')}
            </span>
          </NavLink>
        </nav>

        {/* Bottom section with action */}
        <div className="mt-auto space-y-4 pt-4 border-t border-slate-100">
          <NavLink 
            to={'/pos?new-sale'}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center px-3.5"
            title={t('sidebar.newSale')}
          >
            <Plus className="w-4.5 h-4.5 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.newSale')}
            </span>
          </NavLink>

          <NavLink
            to={'/admin'}
            className={({isActive})=>`w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              isActive
                ? 'bg-slate-100 text-slate-800' 
                : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'
            }`}
            title={t('sidebar.admin')}
          >
            <Settings className="w-4.5 h-4.5 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.admin')}
            </span>
          </NavLink>

          <button
            id="sidebar_logout_btn"
            onClick={() => {
              localStorage.removeItem('trp_is_authenticated');
              window.location.reload();
            }}
            className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0 text-rose-500" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              Log Out
            </span>
          </button>

          <div className="flex items-center p-1.5 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden" title={MANAGER_PROFILE.name}>
            <img 
              className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0" 
              src={MANAGER_PROFILE.image} 
              alt={MANAGER_PROFILE.name} 
              referrerPolicy="no-referrer"
            />
            <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              <p className="text-xs font-bold text-slate-800 truncate">{MANAGER_PROFILE.name}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase truncate">{t('sidebar.manager')}</p>
            </div>
          </div>
        </div>

      </aside>
  )
}
