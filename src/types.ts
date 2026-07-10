export interface Product {
  id: number;
  brandId: number,
  categoryId: number,
  modelName: string;
  photo?: string;
  storage?: string;
  ram?: string;
  spec?: string;
  color?: string;
  price: number;
  stockQty: number;
  purchasePrice: number;
  sellingPrice: number;
  status: string;
  createdAt?: Date;
  updatedAt: Date;
  category: Category;
  brand: Brand;
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  status:      string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  status:      string
  createdAt: Date;
  updatedAt: Date;
}


export interface CartItem {
  product: Product;
  quantity: number;
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
