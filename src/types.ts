export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  specs: string;
  color: string;
  imeiRequired?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedImei?: string;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'Card' | 'Cash' | 'QR Pay' | 'KPay' | 'AYA Pay';
  status: 'Completed' | 'Pending' | 'Refunded';
}

export type ViewTab = 'dashboard' | 'pos' | 'inventory' | 'transactions' | 'admin';
