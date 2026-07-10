import React from 'react';
import { motion } from 'motion/react';
import { 
  RefreshCw, 
  Sliders, 
  Building2,
  HelpCircle,
  Database,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import type{ Product, Transaction } from '../types';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS } from '../data';
import { useI18n } from '../i18nContext';

interface AdminPanelViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  products,
  setProducts,
  setTransactions,
}) => {
  const { t } = useI18n();
  const handleResetData = () => {
    if (window.confirm(t('admin.resetWarning'))) {
      setProducts(INITIAL_PRODUCTS);
      setTransactions(INITIAL_TRANSACTIONS);
      alert(t('admin.resetSuccess'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">{t('admin.title')}</h2>
        <p className="text-slate-500 mt-1">{t('admin.storeSettings')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Database control */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" /> {t('admin.systemMaintenance')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('admin.resetWarning')}
          </p>
          
          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={handleResetData}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> {t('admin.resetBtn')}
            </button>
            
            <button 
              onClick={() => alert('Offline sync is already completed. All records are currently saved locally!')}
              className="px-4 py-2.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Sync Local Database
            </button>
          </div>
        </div>

        {/* System parameters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" /> {t('admin.storeSettings')}
          </h3>
          <p className="text-xs text-slate-500">
            Control the sales behavior parameters for all POS Terminals globally.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-800 block">{t('admin.taxRate')}</span>
                <span className="text-slate-400 block mt-0.5">Applied on checkouts globally</span>
              </div>
              <span className="font-mono bg-slate-50 px-3 py-1.5 rounded-lg font-bold text-slate-700">5% (Configured)</span>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
              <div>
                <span className="font-bold text-slate-800 block">Enterprise Discount Rate</span>
                <span className="text-slate-400 block mt-0.5">Flat discount on orders &gt; $1000</span>
              </div>
              <span className="font-mono bg-slate-50 px-3 py-1.5 rounded-lg font-bold text-slate-700">$50.00 Fixed</span>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
              <div>
                <span className="font-bold text-slate-800 block">{t('admin.managerName')}</span>
                <span className="text-slate-400 block mt-0.5">Alex Rivera (Store Manager)</span>
              </div>
              <span className="font-mono bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Shift Active
              </span>
            </div>
          </div>
        </div>

        {/* Store Profile details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> {t('admin.storeName')}
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Hub Branch:</span>
              <span className="font-bold text-slate-800">TechRetail Pro Premium Mobile Hub</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Terminal ID:</span>
              <span className="font-bold text-slate-800">#TRP-T1-ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Address:</span>
              <span className="font-bold text-slate-800">32 Retailer Blvd, Suite 400</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Registered Devices Count:</span>
              <span className="font-bold text-slate-800 font-mono">{products.length} types</span>
            </div>
          </div>
        </div>

        {/* Help & Documentation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> System Documentation
          </h3>
          <p className="text-xs text-slate-500">
            Need assist with TechRetail Pro Operations? Review our core manual guides.
          </p>

          <div className="space-y-2 pt-2">
            <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer flex justify-between items-center">
              <span>How to void an invoice correctly</span>
              <span className="text-[10px] text-slate-400">3 mins read</span>
            </div>
            <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer flex justify-between items-center">
              <span>Handling missing/incorrect IMEI errors</span>
              <span className="text-[10px] text-slate-400">5 mins read</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
