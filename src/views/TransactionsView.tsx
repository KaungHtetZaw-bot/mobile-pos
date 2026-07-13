import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  X, 
  Printer, 
  Send, 
  ArrowRight, 
  History, 
  ChevronLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  FileSpreadsheet,
  Trash2,
  ListFilter
} from 'lucide-react';
import type{ Transaction } from '../types';
import { useI18n } from '../i18nContext';
import { dateTimeFormater } from '../utils/dateTimeFormater';
import { useOrders } from '../hooks/useOrderQueries';

export const TransactionsView = () => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  // const { data: transactions= [], isLoading } = useTransations()
  const { data: transactions, isLoading } = useOrders({})
  // Compute stats based on current list
  const stats = useMemo(() => {
    const completed = transactions?.data?.filter((t:Transaction) => t.status === 'Completed');
    const refunds = transactions?.data?.filter((t:Transaction) => t.status === 'Refunded');
    
    const revenue = completed?.reduce((sum:number, t:Transaction) => sum + t.total, 0);
    const count = completed?.length;
    const avgVal = count > 0 ? (revenue / count) : 0;
    
    return {
      revenue,
      count,
      avgVal,
      refundCount: refunds?.length
    };
  }, [transactions]);

  // Filters based on search query
  const filteredTransactions = useMemo(() => {
  const newTransactions = transactions?.data ?? [];
  return newTransactions.filter((t: Transaction) => {
    // Convert t.id to a string safely before calling string methods
    const transactionId = String(t.id).toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = 
      transactionId.includes(query) || 
      t.customerName.toLowerCase().includes(query) || 
      t.customerEmail.toLowerCase().includes(query);
      
    return matchesSearch;
  });
}, [transactions, searchQuery]);

  // Void/Refund transaction
  const handleVoidTransaction = (id: string) => {
    const targetTx = transactions.find((t:Transaction) => t.id === id);
    if (!targetTx) return;

    if (window.confirm(`Are you sure you want to VOID transaction ${id}? This will restore its stock in the inventory.`)) {
      // Restore product stock
      // setProducts(prevProducts => {
      //   return prevProducts.map(p => {
      //     const itemInTx = targetTx.items.find((i:Transaction) => i..id === p.id);
      //     if (itemInTx) {
      //       return { ...p, stock: p.stockQty + itemInTx.quantity };
      //     }
      //     return p;
      //   });
      // });

      // Update transaction status to Refunded
      // setTransactions(prev => 
      //   prev.map(t => t.id === id ? { ...t, status: 'Refunded' } : t)
      // );

      // Re-set selected preview state
      const updatedTx = { ...targetTx, status: 'Refunded' as const };
      // setSelectedTx(updatedTx);
    }
  };

  if(isLoading) return "loading"

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-140px)] h-auto lg:overflow-hidden overflow-visible"
    >
      
      {/* Table Section */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-slate-100 rounded-2xl p-6 lg:overflow-hidden overflow-visible">
        
        {/* Header line filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" /> {t('transactions.title')}
            </h3>
            <p className="text-slate-500 text-xs mt-1">Review, export, and void registered client invoices.</p>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('transactions.searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs placeholder-slate-400 font-semibold focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-xs">
                <Calendar className="w-4 h-4 text-slate-400" />
                {t('dashboard.last24Hours')}
              </button>
            </div>
            <button 
              onClick={() => window.print()}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> {t('transactions.printReceipt')}
            </button>
          </div>
        </div>

        {/* Mini stats tracker inside history */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('dashboard.revenue')}</span>
            <span className="text-lg font-bold text-primary font-mono block mt-1">${stats.revenue.toLocaleString()}</span>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('dashboard.salesCount')}</span>
            <span className="text-lg font-bold text-slate-800 font-mono block mt-1">{stats.count} bills</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Ticket Value</span>
            <span className="text-lg font-bold text-slate-800 font-mono block mt-1">${stats.avgVal.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Refunds / Voided</span>
            <span className="text-lg font-bold text-slate-800 font-mono block mt-1">{stats.refundCount} cases</span>
          </div>
        </div>

        {/* Table list */}
        <div className="lg:flex-1 lg:overflow-y-auto overflow-x-auto select-none">
          {filteredTransactions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-slate-400">
              <FileSpreadsheet className="w-12 h-12 stroke-1 mb-2 text-slate-300" />
              <p className="font-semibold text-sm">{t('transactions.noTxns')}</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-mono text-[11px] uppercase tracking-wider sticky top-0 z-10">
                  <th className="px-6 py-3 font-semibold">{t('transactions.txnId')}</th>
                  <th className="px-6 py-3 font-semibold">{t('transactions.dateTime')}</th>
                  <th className="px-6 py-3 font-semibold">{t('transactions.customer')}</th>
                  <th className="px-6 py-3 font-semibold">{t('transactions.amount')}</th>
                  <th className="px-6 py-3 font-semibold">{t('transactions.payment')}</th>
                  <th className="px-6 py-3 font-semibold text-right">{t('transactions.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx:Transaction) => (
                  <tr
                    key={tx.id}
                    // onClick={() => setSelectedTx(tx)}
                    // className={`hover:bg-primary/5 cursor-pointer transition-colors group 
                    //   ${
                    //   selectedTx?.id === tx.id ? 'bg-primary/5 border-l-2 border-primary' : ''
                    // }`}
                    className={`hover:bg-primary/5 cursor-pointer transition-colors group `}
                  >
                    <td className="px-6 py-4 font-mono font-bold text-primary text-sm">#{tx.invoiceNo}</td>
                    
                    <td className="px-6 py-4">
                      <p className="text-slate-800 text-xs font-semibold">
                        { dateTimeFormater(tx?.createdAt, 'date') }
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                        { dateTimeFormater(tx?.createdAt, 'time') }
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[10px] font-bold text-slate-600 uppercase">
                          {tx.customerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold text-xs">{tx.customerName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 block max-w-[120px] truncate">{tx.customerEmail}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-800 font-mono text-xs">
                      ${tx.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold font-mono">
                        {tx.paymentMethod}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        tx.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {tx.status === 'Completed' ? t('transactions.statusCompleted') :
                         tx.status === 'Refunded' ? t('transactions.statusRefunded') :
                         t('transactions.statusPending')}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Dynamic footer pagination */}
        <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-[11px] font-medium text-slate-500 font-mono">
          <span>Showing 1-{filteredTransactions.length} of {transactions.length} receipts</span>
          <div className="flex gap-2">
            <button disabled className="p-1 rounded-lg border border-slate-200 bg-white disabled:opacity-40">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-primary text-white font-bold">1</span>
          </div>
        </div>

      </div>

      {/* Invoice Preview Side Panel (Sleek right hand preview drawer / overlay modal) */}
      <AnimatePresence>
        {/* {selectedTx && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:relative lg:inset-auto lg:bg-transparent lg:backdrop-blur-none lg:z-auto lg:p-0">
            <div className="absolute inset-0 lg:hidden" 
            onClick={() => setSelectedTx(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-100 rounded-3xl flex flex-col overflow-hidden shadow-2xl lg:shadow-none w-full max-w-md lg:w-96 h-[85vh] lg:h-full z-10"
            >
              <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              <header className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('transactions.receiptTitle')}</h2>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">Order tracker workspace</p>
                </div>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-primary text-base font-bold">{selectedTx.id}</p>
                    <p className="text-xs text-slate-400 mt-1">{selectedTx?.createdAt ? new Date(selectedTx.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : "N/A"} • {selectedTx?.createdAt ? new Date(selectedTx.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        }): "N/A"}</p>
                  </div>
                  
                  <span className={`px-2.5 py-1 font-bold rounded-lg text-xs font-mono uppercase tracking-wider ${
                    selectedTx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                    selectedTx.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                    'bg-rose-50 text-rose-700'
                  }`}>
                    {selectedTx.status === 'Completed' ? t('transactions.statusCompleted') :
                     selectedTx.status === 'Refunded' ? t('transactions.statusRefunded') :
                     t('transactions.statusPending')}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t('transactions.customer')}</span>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-sm">
                      {selectedTx.customerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{selectedTx.customerName}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{selectedTx.customerEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">{t('transactions.totalPurchased')}</span>
                  
                  <div className="divide-y divide-slate-100">
                    {selectedTx.items.map(i => (
                      <div key={i.product.id} className="py-2.5 flex justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{i.product.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                            Qty: {i.quantity} x ${i.product.price.toLocaleString()}
                          </p>
                          {i.selectedImei && (
                            <span className="text-[9px] font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                              {i.selectedImei}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-slate-900 font-mono">${(i.product.price * i.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

s                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{t('pos.subtotal')}</span>
                    <span>${selectedTx.subtotal.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{t('pos.tax')}</span>
                    <span>${selectedTx.tax.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {selectedTx.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>{t('pos.discount')}</span>
                      <span>-${selectedTx.discount.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-slate-700/60 pt-2 text-sm text-white font-bold">
                    <span>{t('pos.total')}</span>
                    <span className="text-primary font-black text-base">${selectedTx.total.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

              </div>

              <footer className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> {t('transactions.printReceipt')}
                  </button>
                  <button 
                    onClick={() => alert(`Receipt successfully dispatched to ${selectedTx.customerEmail}!`)}
                    className="flex-1 py-2.5 bg-primary hover:bg-primary-container text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" /> Email
                  </button>
                </div>

                {selectedTx.status === 'Completed' && (
                  <button
                    onClick={() => handleVoidTransaction(selectedTx.id)}
                    className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    {t('transactions.refundTransaction')}
                  </button>
                )}
              </footer>

              </div>
            </motion.div>
          </div>
        )} */}
      </AnimatePresence>

    </motion.div>
  );
};
