import { motion } from 'motion/react';
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18nContext';
import { Link } from 'react-router-dom';
import { useInitData } from '../hooks/useProductQueries';
import BarGraph from '../components/Test';
import AreaChartExample from '../components/Test';

export const DashboardView = () => {
  const { t } = useI18n();
  const { data,isLoading, error } = useInitData()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">{t('dashboard.title')}</h2>
          <p className="text-slate-500 mt-1">MobilePulse Intelligent Store Hub</p>
        </div>
        
        {/* <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            {t('dashboard.last24Hours')}
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0f172a] to-[#1e293b] dark:from-[#0b0f19] dark:to-[#111827] rounded-[32px] p-8 relative overflow-hidden shadow-xl shadow-black/10 dark:shadow-black/40 flex flex-col justify-between min-h-[220px] border border-[#1e293b]">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#94a3b8] text-xs uppercase tracking-widest font-bold mb-1 font-mono">{t('dashboard.todayStoreRevenue')}</p>
                <h2 className="text-4xl font-black tracking-tight mb-6 font-sans text-[#ffffff]">
                  ${data?.profit?.currentMonth?.totalRevenue}
                </h2>
              </div>
              <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 font-mono">
                <TrendingUp className="w-3.5 h-3.5" /> { data?.profit?.revenueGap }
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                to={'/pos'}
                className="px-6 py-3 bg-[#ffffff] text-[#0f172a] text-xs font-black rounded-xl hover:bg-[#f1f5f9] transition-all cursor-pointer active:scale-95 shadow-md shadow-white/5"
              >
                {t('dashboard.createNewSale')}
              </Link>
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-[#1e293b] text-[#ffffff] text-xs font-black rounded-xl hover:bg-[#334155] border border-[#334155]/50 transition-all cursor-pointer active:scale-95"
              >
                {t('dashboard.exportPdfReport')}
              </button>
            </div>
          </div>
          
          {/* Subtle Clean Minimalism glowing nodes */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#1e293b] dark:bg-sky-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-[#0c4a6e] dark:bg-sky-500/5 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        </div>

        {/* Column 3 containing simple clean stacked lists */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Monthly Profit Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-slate-400 text-[10px] uppercase tracking-widest font-bold font-mono">{t('dashboard.monthlyProfit',{margin:data?.profit?.currentMonth?.actualMargin})}</h4>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold text-[10px]">
                 {data?.profit?.gap}
                </span>
              </div>
              <p className="font-sans text-2xl font-extrabold text-slate-900">
                { data?.profit?.currentMonth?.actualGrossProfit }
              </p>
            </div>
            <div className="h-1.5 w-full bg-slate-50 mt-4 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 w-[62%] rounded-full"></div>
            </div>
          </div>

          {/* Low Stock alerts */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-slate-400 text-[10px] uppercase tracking-widest font-bold font-mono">{t('dashboard.stockThresholds')}</h4>
                {data?.stock?.length > 0 ? (
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase font-mono">
                    {t('dashboard.needsAction')}
                  </span>
                ) : (
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase font-mono">
                    {t('dashboard.allHealthy')}
                  </span>
                )}
              </div>
              <p className="font-sans text-2xl font-extrabold text-slate-900">
                {data?.stock?.length} {t('dashboard.flagged')}
              </p>
            </div>
            <div className="h-1.5 w-full bg-slate-50 mt-4 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${data?.stock?.length > 0 ? 'bg-slate-900 w-[45%]' : 'bg-emerald-500 w-full'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Layout Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Trends Chart (SVG based & beautifully structured) */}
        <div className="lg:col-span-8 col-span-12 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="font-sans text-lg font-bold text-slate-900">{t('dashboard.hourlyRevenueVolume')}</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-3 h-3 rounded-full bg-primary inline-block"></span> {t('dashboard.revenue')}
              </span>
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span> {t('dashboard.salesCount')}
              </span>
            </div>
          </div>

          {/* High-quality responsive SVG Line Chart with gradient */}
          <AreaChartExample />
        </div>

        {/* Top Selling Products List */}
        <div className="lg:col-span-4 col-span-12 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans text-lg font-bold text-slate-900">{t('dashboard.bestSellers')}</h3>
              <Link 
                to={'/inventory'}
                className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-1 group"
              >
                {t('sidebar.inventory')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {data?.topSelling.map((item:any) => (
                <Link 
                  key={item.productId} 
                  to={'/inventory'}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{item.product.modelName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item._sum.quantity} {t('dashboard.unitsSold')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-sm">${item.product.sellingPrice.toLocaleString()}</p>
                    {item._sum.quantity > 20 && (
                      <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">High Demand</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to={'/inventory'}
            className="w-full mt-6 p-2.5 border border-primary/20 text-primary hover:bg-primary/5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            {t('dashboard.viewAll')}
          </Link>
        </div>

        {/* Recent Transactions Table */}
        <div className="col-span-12 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-sans text-lg font-bold text-slate-900">{t('dashboard.recentTransactions')}</h3>
            <Link 
             to={'/transactions'}
              className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-1 group"
            >
              {t('transactions.viewDetails')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">{t('transactions.txnId')}</th>
                  <th className="pb-3 font-semibold">{t('transactions.customer')}</th>
                  <th className="pb-3 font-semibold">{t('transactions.totalPurchased')}</th>
                  <th className="pb-3 font-semibold">{t('transactions.dateTime')}</th>
                  <th className="pb-3 font-semibold">{t('transactions.status')}</th>
                  <th className="pb-3 font-semibold text-right">{t('transactions.amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* {transactions.slice(0, 4).map(tx => (
                  <tr 
                    key={tx.id} 
                    // onClick={() => {
                    //   onSelectTransaction(tx);
                    //   onNavigate('transactions');
                    // }}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 font-mono font-medium text-primary group-hover:underline text-sm">
                      {tx.id}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                          {tx.customerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 text-sm block">{tx.customerName}</span>
                          <span className="text-xs text-slate-400 block">{tx.customerEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 text-sm max-w-[200px] truncate">
                      {tx.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="py-4 text-slate-500 font-mono text-xs">{tx.time}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        tx.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {tx.status === 'Completed' ? t('transactions.statusCompleted') :
                         tx.status === 'Refunded' ? t('transactions.statusRefunded') :
                         t('transactions.statusPending')}
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-slate-900 text-sm font-mono">
                      ${tx.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
