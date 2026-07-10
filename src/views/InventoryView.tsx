import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  X, 
  Package,
  Trash2, 
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { useI18n } from '../i18nContext';
import { useGetProduct } from '../hooks/useProduct';
import type { Brand, Category, Product } from '../types';

export const InventoryView= () => {
  const { t } = useI18n();
  const {  data: { products:rawProducts, brands:rawBrands, categories:rawCategories } = {}, isLoading } = useGetProduct()
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'low' | 'out'>('all');
  const [selectedBrand, setSelectedBrand] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(0)

  const brands = useMemo(() => {
    const allBrands = { id: 0, name: "All Brands", status: "ACTIVE" }
    const list = rawBrands ?? []
    return [allBrands, ...list];
  }, [rawBrands]);

  const categories = useMemo(() => {
    const allCategories = { id: 0, name: "All Categories", status: "ACTIVE" };
    const list = rawCategories ?? [];
    return [allCategories, ...list];
  }, [rawCategories]);

  // Add Product Form states
  const [newProductName, setNewProductName] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('Apple');
  const [newProductCategory, setNewProductCategory] = useState('Smartphones');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductImage, setNewProductImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDfkg99JOnih0cbP-g_1K-hmJjHs-UEbcoEkv3n9sttcSFAjX-1Tq0PZeUlhEKtcfXU6vrswdzXDiYOL4nTOGlInlXigAyyV6y_yefedK1OD4i79gjJP3e62TEjlBIWnw2be_3eLdeQDl11YEm08eMSb7emjfwGsQ0rq6A8TymCVb0dV5E4nxb7UTfPE5Ywld8VyVWXyjjG8DI_4g6gX1xB-vMNDUqOA1xm2Klp8SC4ew3lzGXsqQghaw');
  const [newProductSpecs, setNewProductSpecs] = useState('');
  const [newProductColor, setNewProductColor] = useState('');
  const [newProductImei, setNewProductImei] = useState(true);

  // const [editProductId, setEditProductId] = useState<string | null>(null);

  // const handleRestock = (id: string) => {
  //   setProducts(prev => 
  //     prev.map(p => p.id === id ? { ...p, stock: p.stock + 10 } : p)
  //   );
  // };

  // const handleDelete = (id: string) => {
  //   if (window.confirm('Are you sure you want to delete this product from the inventory?')) {
  //     setProducts(prev => prev.filter(p => p.id !== id));
  //   }
  // };

  const filterProduct = useMemo(() => {
    const products = rawProducts ?? [];

    return products.filter((p: Product) => {
      const matchesBrand = Number(selectedBrand) === 0 || p.brandId === Number(selectedBrand);
      
      const matchesCategory = Number(selectedCategory) === 0 || p.categoryId === Number(selectedCategory);

      return matchesBrand && matchesCategory;
    });
  }, [selectedCategory, selectedBrand, rawProducts]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">{t('inventory.title')}</h2>
          <p className="text-slate-500 mt-1">MobilePulse Devices Stock Hub</p>
        </div>
        
        <button 
          onClick={() => {
            // resetForm();
            setShowAddModal(true);
          }}
          className="w-full sm:w-auto px-6 py-3 bg-primary text-white hover:bg-primary-container rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          {t('inventory.addNewProduct')}
        </button>
      </div>

      {/* Dashboard Stats / Filters Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Filters Panel inside bento box */}
        <div className="lg:col-span-3 flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-slate-500 font-semibold text-xs uppercase tracking-wider font-mono">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            {selectedCategory === 0 ? t('pos.allCategories') : selectedCategory}
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('inventory.searchPlaceholder')}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs placeholder-slate-400 font-semibold focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Select dropdowns */}
          <select 
            value={selectedBrand}
            onChange={e => setSelectedBrand(Number(e.target.value))}
            className="bg-slate-50 border-none rounded-lg text-xs font-semibold text-slate-600 px-3 py-2 cursor-pointer focus:ring-1 focus:ring-primary"
          >
            {brands.map((b:any) => (
              <option className='h-30' key={b.id} value={b.id}>{b.name === 'All Brands' ? t('pos.allBrands') : b.name}</option>
            ))}
          </select>

          <select 
            value={selectedCategory}
            onChange={e => setSelectedCategory(Number(e.target.value))}
            className="bg-slate-50 border-none rounded-lg text-xs font-semibold text-slate-600 px-3 py-2 cursor-pointer focus:ring-1 focus:ring-primary"
          >
            {categories.map((c:any) => (
              <option key={c.id} value={c.id}>{c.name === 'All Categories' ? t('pos.allCategories') : c.name}</option>
            ))}
          </select>

          <div className="h-8 w-px bg-slate-100 hidden md:block"></div>

          {/* Stock filters */}
          {/* <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg">
            <button 
              onClick={() => setStockFilter('all')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${stockFilter === 'all' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
            >
              All
            </button>
            <button 
              onClick={() => setStockFilter('instock')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${stockFilter === 'instock' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
            >
              {t('transactions.statusCompleted')}
            </button>
            <button 
              onClick={() => setStockFilter('low')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${stockFilter === 'low' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
            >
              Low
            </button>
            <button 
              onClick={() => setStockFilter('out')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${stockFilter === 'out' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
            >
              Out
            </button>
          </div> */}

        </div>

        {/* Quick Trend stats */}
        <div className="bg-primary/5 border border-primary/10 text-primary p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider font-mono text-primary/70">{t('inventory.stock').toUpperCase()}</p>
            {/* <p className="text-3xl font-black font-sans mt-1 text-slate-900">{totalItemsCount}</p> */}
          </div>
          <div className="text-right">
            <p className="text-xs text-primary font-bold font-mono">+12% vs LW</p>
            <div className="w-20 h-8 overflow-hidden mt-1 opacity-70">
              <svg className="w-full h-full stroke-primary stroke-2 fill-none" viewBox="0 0 100 40">
                <path d="M0,35 Q20,10 40,25 T80,5 T100,20" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Inventory Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-mono text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">{t('inventory.productName')}</th>
                <th className="px-6 py-4 font-semibold">{t('inventory.brand')}</th>
                <th className="px-6 py-4 font-semibold">{t('inventory.category')}</th>
                <th className="px-6 py-4 font-semibold text-right">{t('inventory.price')}</th>
                <th className="px-6 py-4 font-semibold">{t('transactions.status')}</th>
                <th className="px-6 py-4 font-semibold text-center">{t('inventory.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filterProduct?.map((p:Product) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors group">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{p.modelName}</p>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">{p.spec} • ID: {p.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600 text-sm font-semibold">{p.brand.name}</td>
                  
                  <td className="px-6 py-4 text-slate-600 text-sm">{p.category.name}</td>
                  
                  <td className="px-6 py-4 text-right font-bold text-primary text-sm font-mono">${p.sellingPrice.toLocaleString('en', { minimumFractionDigits: 2 })}</td>
                  
                  <td className="px-6 py-4">
                    {p.stockQty === 0 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 font-mono">
                        {t('pos.outOfStock')}
                      </span>
                    ) : p.stockQty <= 4 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 font-mono">
                        Low ({p.stockQty})
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 font-mono">
                        In Stock ({p.stockQty})
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        // onClick={() => handleRestock(p.id)}
                        className="p-2 text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer"
                        title="Quick restock (+10)"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button 
                        // onClick={() => handleDelete(p.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic bottom pagination tracker */}
        <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-slate-500 font-mono">
          {/* <span>Showing {filteredProducts.length} of {products.length} registered devices</span> */}
          <div className="flex gap-2">
            <button disabled className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold">1</span>
          </div>
        </div>

      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 font-sans mb-1 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" /> {t('inventory.addNewProduct')}
              </h3>
              <p className="text-slate-500 text-xs mb-6">MobilePulse register stock terminal form</p>

              <form onSubmit={()=>{}} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.productName')}</label>
                    <input 
                      type="text" 
                      required
                      value={newProductName}
                      onChange={e => setNewProductName(e.target.value)}
                      placeholder="e.g. Google Pixel 9 Pro"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.brand')}</label>
                    <input 
                      type="text" 
                      required
                      value={newProductBrand}
                      onChange={e => setNewProductBrand(e.target.value)}
                      placeholder="e.g. Google"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.category')}</label>
                    <select
                      value={newProductCategory}
                      onChange={e => setNewProductCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none cursor-pointer"
                    >
                      <option>Smartphones</option>
                      <option>Tablets</option>
                      <option>Accessories</option>
                      <option>Audio</option>
                      <option>Wearables</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.price')} ($)</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      step="0.01"
                      value={newProductPrice}
                      onChange={e => setNewProductPrice(e.target.value)}
                      placeholder="1199.00"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.stock')}</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      value={newProductStock}
                      onChange={e => setNewProductStock(e.target.value)}
                      placeholder="12"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none font-mono"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.specs')}</label>
                    <input 
                      type="text" 
                      value={newProductSpecs}
                      onChange={e => setNewProductSpecs(e.target.value)}
                      placeholder="e.g. Bay Blue, 256GB Dual SIM"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('inventory.color')}</label>
                    <input 
                      type="text" 
                      value={newProductColor}
                      onChange={e => setNewProductColor(e.target.value)}
                      placeholder="e.g. Bay Blue"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary text-sm focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6 pl-2">
                    <input 
                      type="checkbox" 
                      id="imeiToggle"
                      checked={newProductImei}
                      onChange={e => setNewProductImei(e.target.checked)}
                      className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="imeiToggle" className="text-xs font-bold text-slate-600 select-none cursor-pointer">{t('pos.imeiRequired')}</label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-sm cursor-pointer"
                  >
                    {t('inventory.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary text-white hover:bg-primary-container rounded-xl font-bold text-sm shadow-md shadow-primary/10 cursor-pointer"
                  >
                    {t('inventory.saveChanges')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
