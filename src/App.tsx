import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { 
  LayoutDashboard, 
  Smartphone, 
  Package, 
  History, 
  Settings, 
  HelpCircle, 
  Bell, 
  Plus, 
  LogOut,
  Calculator,
  Search,
  UserCheck,
  ShieldCheck,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types and static data
import type{ Product, Transaction, ViewTab } from './types';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS, MANAGER_PROFILE } from './data';

// Custom subcomponents
import { DashboardView } from './components/DashboardView';
import { POSTerminalView } from './components/POSTerminalView';
import { InventoryView } from './components/InventoryView';
import { TransactionsView } from './components/TransactionsView';
import { AdminPanelView } from './components/AdminPanelView';

// React Router & Auth Pages
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';

// i18n Support
import { I18nProvider, useI18n } from './i18nContext';
import { LanguageSelector } from './components/LanguageSelector';

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const isAuthenticated = localStorage.getItem('trp_is_authenticated') === 'true';
//   // if (!isAuthenticated) {
//   //   return <Navigate to="/login" replace />;
//   // }
//   return <>{children}</>;
// }

export default function App() {
  return (
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView/>} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/*" element={
              <AppContent />
            // <ProtectedRoute>
            // </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </I18nProvider>
  );
}

function AppContent() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  // Dark/Night mode state and transition engine
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('trp_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('trp_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = !darkMode;

    // Fallback for browsers that don't support modern startViewTransition
    if (
      !document.startViewTransition || 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      isThemeAnimating
    ) {
      setDarkMode(isDark);
      return;
    }

    setIsThemeAnimating(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || (rect.left + rect.width / 2);
    const y = event.clientY || (rect.top + rect.height / 2);
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(isDark);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      
      const animation = document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      animation.onfinish = () => {
        setIsThemeAnimating(false);
      };
    }).catch(() => {
      setIsThemeAnimating(false);
    });
  };

  // Core state synced to local storage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('trp_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('trp_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Track currently selected transaction for preview
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('trp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('trp_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handle quick select for transaction detail preview
  const handleSelectTxForPreview = (tx: Transaction) => {
    setSelectedTx(tx);
    setActiveTab('transactions');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans flex flex-col md:flex-row antialiased">
      
      {/* SIDE NAVIGATION - Desktop (md and above) */}
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
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-0.5">Premium Hub</p>
          </div>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="flex-1 space-y-1.5">
          <button
            onClick={() => { setActiveTab('dashboard'); setSelectedTx(null); }}
            className={`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'dashboard' 
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
          </button>

          <button
            onClick={() => { setActiveTab('pos'); setSelectedTx(null); }}
            className={`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'pos' 
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
          </button>

          <button
            onClick={() => { setActiveTab('inventory'); setSelectedTx(null); }}
            className={`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'inventory' 
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
          </button>

          <button
            onClick={() => { setActiveTab('transactions'); }}
            className={`w-full flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'transactions' 
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
          </button>
        </nav>

        {/* Bottom section with action */}
        <div className="mt-auto space-y-4 pt-4 border-t border-slate-100">
          <button 
            onClick={() => { setActiveTab('pos'); setSelectedTx(null); }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center px-3.5"
            title={t('sidebar.newSale')}
          >
            <Plus className="w-4.5 h-4.5 flex-shrink-0" />
            <span className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
            }`}>
              {t('sidebar.newSale')}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('admin'); setSelectedTx(null); }}
            className={`w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'admin' 
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
          </button>

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

      {/* MOBILE HEADER - persistent at the top */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-slate-150 h-16 flex items-center justify-between px-6 md:hidden select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
            <Calculator className="w-4 h-4 stroke-2" />
          </div>
          <span className="font-sans font-black text-slate-900 text-sm tracking-tight">MobilePulse</span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector align="right" />
          <button 
            onClick={toggleTheme}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-50 transition-all cursor-pointer relative flex items-center justify-center active:scale-90"
            title={darkMode ? t('theme.lightMode') : t('theme.darkMode')}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500 fill-slate-100" />
            )}
          </button>
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

      {/* MOBILE MENU overlay drawer */}
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
              <button
                onClick={() => { setActiveTab('dashboard'); setSelectedTx(null); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                {t('sidebar.dashboard')}
              </button>

              <button
                onClick={() => { setActiveTab('pos'); setSelectedTx(null); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  activeTab === 'pos' ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <Calculator className="w-5 h-5" />
                {t('sidebar.pos')}
              </button>

              <button
                onClick={() => { setActiveTab('inventory'); setSelectedTx(null); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  activeTab === 'inventory' ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                {t('sidebar.inventory')}
              </button>

              <button
                onClick={() => { setActiveTab('transactions'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  activeTab === 'transactions' ? 'bg-primary text-white' : 'text-slate-600'
                }`}
              >
                <History className="w-5 h-5" />
                {t('sidebar.transactions')}
              </button>
              
              <button
                onClick={() => { setActiveTab('admin'); setSelectedTx(null); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                  activeTab === 'admin' ? 'bg-slate-100 text-slate-800' : 'text-slate-500'
                }`}
              >
                <Settings className="w-5 h-5" />
                {t('sidebar.admin')}
              </button>
            </div>

            <button 
              id="mobile_logout_btn"
              onClick={() => {
                localStorage.removeItem('trp_is_authenticated');
                window.location.reload();
              }}
              className="w-full py-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>

            <button 
              onClick={() => { setActiveTab('pos'); setSelectedTx(null); setMobileMenuOpen(false); }}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md text-center"
            >
              {t('sidebar.newSale')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN VIEW CANVAS PORT */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        
        {/* Top Header navbar for Desktop (md and above) */}
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
            <button 
              onClick={toggleTheme}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-50 transition-all cursor-pointer relative flex items-center justify-center active:scale-90"
              title={darkMode ? t('theme.lightMode') : t('theme.darkMode')}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-500 fill-slate-100" />
              )}
            </button>
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

        {/* Tab Canvas Content viewport */}
        <div className="p-6 pb-24 md:p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <DashboardView 
                key="dashboard"
                products={products}
                transactions={transactions}
                onNavigate={setActiveTab}
                onSelectTransaction={handleSelectTxForPreview}
              />
            )}
            
            {activeTab === 'pos' && (
              <POSTerminalView 
                key="pos"
                products={products}
                setProducts={setProducts}
                transactions={transactions}
                setTransactions={setTransactions}
              />
            )}

            {activeTab === 'inventory' && (
              <InventoryView 
                key="inventory"
                products={products}
                setProducts={setProducts}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionsView 
                key="transactions"
                transactions={transactions}
                setTransactions={setTransactions}
                products={products}
                setProducts={setProducts}
                selectedTx={selectedTx}
                setSelectedTx={setSelectedTx}
              />
            )}

            {activeTab === 'admin' && (
              <AdminPanelView 
                key="admin"
                products={products}
                setProducts={setProducts}
                transactions={transactions}
                setTransactions={setTransactions}
              />
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* MOBILE Bottom Persistent Menu Bar */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-around md:hidden z-40 select-none px-4">
        <button 
          onClick={() => { setActiveTab('dashboard'); setSelectedTx(null); }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${activeTab === 'dashboard' ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.dashboard')}</span>
        </button>
        
        <button 
          onClick={() => { setActiveTab('pos'); setSelectedTx(null); }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${activeTab === 'pos' ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.pos')}</span>
        </button>

        <button 
          onClick={() => { setActiveTab('inventory'); setSelectedTx(null); }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${activeTab === 'inventory' ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.inventory')}</span>
        </button>

        <button 
          onClick={() => setActiveTab('transactions')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${activeTab === 'transactions' ? 'text-primary font-bold' : 'text-slate-400'}`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] tracking-tight font-bold font-sans uppercase">{t('sidebar.transactions')}</span>
        </button>
      </nav>

    </div>
  );
}
