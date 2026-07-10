import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Trash2, 
  Smartphone, 
  Check, 
  Plus, 
  Minus, 
  Receipt, 
  DollarSign, 
  X, 
  CheckCircle2, 
  Edit3,
  Barcode
} from 'lucide-react';
import type { Product, CartItem, Transaction } from '../types';
import { useI18n } from '../i18nContext';
import { useGetProduct } from '../hooks/useProduct';

export const POSTerminalView= () => {
  const { t } = useI18n();
  const {  data: { products:rawProducts, brands:rawBrands, categories:rawCategories } = {}, isLoading } = useGetProduct()
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState<Transaction | null>(null);
  const [editingImeiIndex, setEditingImeiIndex] = useState<number | null>(null);
  const [tempImei, setTempImei] = useState<string>('');

  // Customer form details
  const [customerName, setCustomerName] = useState<string>('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState<string>('sarah.j@gmail.com');

  // Brands extracted from product list
  const brands = useMemo(() => {
      const allBrands = { id: 0, name: "All Brands", status: "ACTIVE" }
      const list = rawBrands ?? []
      return [allBrands, ...list];
    }, [rawBrands]);


  const filteredProducts = useMemo(() => {
    console.log(rawProducts)
      const products = rawProducts ?? [];
  
      return products.filter((p: Product) => {
        const matchesBrand = Number(selectedBrand) === 0 || p.brandId === Number(selectedBrand);
        
        const matchesSearch = p.modelName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.spec?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.brand.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
      });
    }, [searchQuery, selectedBrand, rawProducts]);

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.stockQty === 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stockQty) return prev; // Limit to stock
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        product, 
        quantity: 1, 
        // selectedImei: product.imeiRequired ? `IMEI: ${Math.floor(100000000000000 + Math.random() * 900000000000000)}` : undefined
      }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id == Number(productId)) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          // check stock limit
          if (newQty > item.product.stockQty) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  // const removeItem = (productId: string) => {
  //   setCart(prev => prev.filter(item => item.product.id !== productId));
  // };

  // Cart totals
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.sellingPrice * item.quantity), 0);
  }, [cart]);

  const tax = useMemo(() => {
    return subtotal * 0.05; // 5% sales tax
  }, [subtotal]);

  const discount = useMemo(() => {
    // Flat 5% discount for premium order or 0
    return subtotal > 1000 ? 50.00 : 0.00;
  }, [subtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal + tax - discount);
  }, [subtotal, tax, discount]);

  // Handle transaction complete
  const handleCheckout = (paymentMethod: 'Card' | 'Cash' | 'KPay' | 'AYA Pay') => {
    if (cart.length === 0) return;

    // Create new transaction
    const invoiceId = `#TRP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newTx: Transaction = {
      id: invoiceId,
      date: dateStr,
      time: timeStr,
      customerName,
      customerEmail,
      items: cart,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      status: 'Completed'
    };

    // Deduct inventory stock
    // setProducts(prevProducts => {
    //   return prevProducts.map(p => {
    //     const cartItem = cart.find(item => item.product.id === p.id);
    //     if (cartItem) {
    //       return {
    //         ...p,
    //         stock: Math.max(0, p.stock - cartItem.quantity)
    //       };
    //     }
    //     return p;
    //   });
    // });

    // Add to transaction history
    // setTransactions(prev => [newTx, ...prev]);
    setCheckoutSuccess(newTx);
    setCart([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-140px)] h-auto lg:overflow-hidden overflow-visible"
    >
      {/* Left side: Product Catalog */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-slate-100 rounded-2xl p-6 lg:overflow-hidden overflow-visible">
        
        {/* Brand tabs and search */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-2">
              <Barcode className="w-5 h-5 text-primary" /> {t('pos.title')}
            </h3>
            
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('pos.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm placeholder-slate-400 font-medium transition-all"
              />
            </div>
          </div>

          {/* Quick select pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                  selectedBrand === brand.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                }`}
              >
                {brand.name === 'All Brands' ? t('pos.allCategories') : brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:flex-1 lg:overflow-y-auto overflow-visible pr-1 select-none">
          {filteredProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-slate-400">
              <Smartphone className="w-12 h-12 stroke-1 mb-2" />
              <p className="font-medium text-sm">{t('inventory.noProducts')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p:Product) => {
                const inCart = cart.find(item => item.product.id === p.id);
                const availableStock = p.stockQty - (inCart?.quantity || 0);

                return (
                  <motion.div
                    key={p.id}
                    layout
                    onClick={() => availableStock > 0 && addToCart(p)}
                    className={`group bg-white border rounded-2xl p-4 cursor-pointer relative overflow-hidden transition-all flex flex-col justify-between ${
                      availableStock === 0 
                        ? 'border-slate-100 opacity-65 cursor-not-allowed'
                        : 'border-slate-100 hover:border-primary/20 hover:shadow-md active:scale-[0.98]'
                    }`}
                  >
                    {/* Stock Indicator tag */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      {p.stockQty === 0 ? (
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold font-mono">
                          {t('pos.outOfStock')}
                        </span>
                      ) : availableStock === 0 ? (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold font-mono">
                          {t('pos.outOfStock')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-primary/5 text-primary rounded-lg text-[10px] font-bold font-mono">
                          {t('inventory.stock')}: {availableStock}
                        </span>
                      )}
                    </div>

                    {/* Image */}
                    <div className="h-32 w-full overflow-hidden rounded-xl p-2 flex items-center justify-center bg-slate-50/50">
                      <img
                        className="h-full object-contain group-hover:scale-105 transition-transform"
                        src={p.photo}
                        alt={p.modelName}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Info */}
                    <div className="mt-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm tracking-tight truncate">
                          {p.modelName}
                        </h4>
                        
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 rounded-full inline-block bg-slate-400" style={{
                            backgroundColor: p.color?.toLowerCase() === 'bay blue' ? '#60a5fa' : 
                                            p.color?.toLowerCase() === 'phantom black' ? '#1e293b' :
                                            p.color?.toLowerCase() === 'orange alpine' ? '#f97316' : 
                                            p.color?.toLowerCase() === 'porcelain' ? '#e2e8f0' : '#94a3b8'
                          }} />
                          <span className="text-[11px] text-slate-500 font-medium truncate max-w-[120px]">
                            {p.spec}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-50">
                        <span className="font-bold text-primary text-base font-mono">
                          ${p.sellingPrice.toLocaleString()}
                        </span>
                        
                        <span className={`p-1.5 rounded-lg transition-colors ${
                          inCart ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white'
                        }`}>
                          <Check className={`w-4 h-4 ${inCart ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Current Order Cart */}
      <div className="w-full lg:w-[420px] bg-white border border-slate-100 rounded-2xl flex flex-col lg:overflow-hidden overflow-visible">
        
        {/* Order Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t('pos.currentCart')}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              <span className="text-xs font-mono text-slate-500">{customerName}</span>
            </div>
          </div>
          
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Clear cart"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Cart Item Feed */}
        <div className="lg:flex-1 lg:overflow-y-auto overflow-visible p-6 space-y-6 scrollbar-none">
          {cart.length === 0 ? (
            <div className="min-h-[160px] flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Receipt className="w-12 h-12 stroke-1 mb-3 text-slate-300" />
              <p className="font-semibold text-sm">{t('pos.emptyCart')}</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={item.product.id} className="flex flex-col gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden p-1 flex items-center justify-center flex-shrink-0">
                      <img className="h-full object-contain" src={item.product.photo} alt={item.product.modelName} referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate max-w-[160px]">{item.product.modelName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[160px]">{item.product.spec}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900 font-mono text-sm">${(item.product.sellingPrice * item.quantity).toLocaleString()}</div>
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-2 mt-2 bg-slate-50 border border-slate-200/50 p-1 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.product.id.toString(), -1)}
                        className="w-5 h-5 rounded hover:bg-white text-slate-600 flex items-center justify-center transition-colors font-semibold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs font-bold w-5 text-center text-slate-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id.toString(), 1)}
                        className="w-5 h-5 rounded hover:bg-white text-slate-600 flex items-center justify-center transition-colors font-semibold"
                        disabled={item.quantity >= item.product.stockQty}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* IMEI Entry for Mobile phones */}
                {/* {item.product?.imeiRequired && (
                  <div className="relative">
                    {editingImeiIndex === index ? (
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={tempImei}
                          onChange={e => setTempImei(e.target.value)}
                          className="flex-1 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          onClick={() => saveImei(index)}
                          className="px-2 bg-primary text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          {t('inventory.saveChanges')}
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => startEditingImei(index, item.selectedImei || '')}
                        className="w-full px-3 py-1.5 bg-slate-50/50 border border-slate-100 hover:border-primary/20 rounded-lg flex justify-between items-center cursor-pointer font-mono text-[11px] text-primary"
                      >
                        <span>{item.selectedImei || `${t('pos.imeiPlaceholder')}`}</span>
                        <Edit3 className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                  </div>
                )} */}
              </div>
            ))
          )}
        </div>

        {/* Totals & Quick Payments */}
        <div className="p-6 bg-slate-50/80 border-t border-slate-100 shadow-[0_-8px_24px_rgba(0,0,0,0.02)] space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-500 text-sm">
              <span>{t('pos.subtotal')}</span>
              <span className="font-mono">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 text-sm">
                <span>{t('pos.discount')}</span>
                <span className="font-mono">-${discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            
            <div className="flex justify-between items-end border-t border-slate-200/60 pt-3">
              <span className="font-bold text-slate-900 text-base">{t('pos.total')}</span>
              <span className="text-2xl font-black text-primary font-mono">
                ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* Cash Pay */}
            <button
              onClick={() => handleCheckout('Cash')}
              disabled={cart.length === 0}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2.5 active:scale-95 transition-all shadow-md shadow-emerald-600/10 cursor-pointer text-sm"
            >
              <DollarSign className="w-4.5 h-4.5" />
              {t('pos.completeCheckout')} (Cash)
            </button>

            {/* Mobile wallets */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleCheckout('KPay')}
                disabled={cart.length === 0}
                className="py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span className="text-[10px] opacity-75">{t('transactions.payment')}</span>
                <span className="text-sm font-sans tracking-tight">KPay</span>
              </button>
              
              <button
                onClick={() => handleCheckout('AYA Pay')}
                disabled={cart.length === 0}
                className="py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-300 text-slate-900 rounded-xl font-bold flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span className="text-[10px] opacity-75">{t('transactions.payment')}</span>
                <span className="text-sm font-sans tracking-tight">AYA Pay</span>
              </button>
            </div>

            <button
              onClick={() => handleCheckout('Card')}
              disabled={cart.length === 0}
              className="w-full py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:bg-transparent rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {t('pos.completeCheckout')} (Card)
            </button>
          </div>

        </div>
      </div>

      {/* Checkout Success Modal overlay */}
      <AnimatePresence>
        {checkoutSuccess && (
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
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setCheckoutSuccess(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 mb-4 animate-bounce">
                  <CheckCircle2 className="w-12 h-12 stroke-2" />
                </div>
                
                <h3 className="text-xl font-black text-slate-900">{t('pos.checkoutSuccess')}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">{t('transactions.txnId')}: {checkoutSuccess.id}</p>

                <div className="w-full bg-slate-50 rounded-2xl p-4 my-5 space-y-3 text-left text-sm border border-slate-100 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">{t('transactions.customer')}:</span>
                    <span className="text-slate-800 font-bold">{checkoutSuccess.customerName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">{t('transactions.payment')}:</span>
                    <span className="text-slate-800 font-bold">{checkoutSuccess.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">{t('transactions.totalPurchased')}:</span>
                    <span className="text-slate-800 font-bold">
                      {checkoutSuccess.items.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  </div>

                  <div className="border-t border-slate-200/60 pt-2 flex justify-between text-base">
                    <span className="font-bold text-slate-900">{t('pos.total')}:</span>
                    <span className="font-black text-primary">${checkoutSuccess.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    {t('transactions.printReceipt')}
                  </button>
                  <button
                    onClick={() => setCheckoutSuccess(null)}
                    className="flex-1 py-3 bg-primary text-white hover:bg-primary-container font-bold rounded-xl text-sm transition-all shadow-md shadow-primary/10 cursor-pointer"
                  >
                    {t('sidebar.newSale')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
