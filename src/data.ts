import type { Product, Transaction } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    price: 1199.00,
    stock: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfkg99JOnih0cbP-g_1K-hmJjHs-UEbcoEkv3n9sttcSFAjX-1Tq0PZeUlhEKtcfXU6vrswdzXDiYOL4nTOGlInlXigAyyV6y_yefedK1OD4i79gjJP3e62TEjlBIWnw2be_3eLdeQDl11YEm08eMSb7emjfwGsQ0rq6A8TymCVb0dV5E4nxb7UTfPE5Ywld8VyVWXyjjG8DI_4g6gX1xB-vMNDUqOA1xm2Klp8SC4ew3lzGXsqQghaw',
    specs: 'Natural Titanium, 256GB',
    color: 'Natural Titanium',
    imeiRequired: true
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 1299.00,
    stock: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs9EWHDoYvV0N73KHuK8pdP2XpOSiH6Lw8H097RdCie5WHzZjvzJOzx5x5kwfYkAuaQ3qLZ5w6gWgpH39kSA8s1rfaoDLUzIVGV9AoM_oeuxpC_cIKdAP8I3r2OC6SoQK0tseHbJx3mMYSI2ZaycoCxNodRdnhHCF5ojqKjrNSZiWsCmt3BrPMym5aX304v4s5aoyOIwqwiqRs62GvRC9LUrTIFA-bnz7uUkmrIlUEyNSpp4b-P0EDQg',
    specs: 'Phantom Black, 512GB',
    color: 'Phantom Black',
    imeiRequired: true
  },
  {
    id: 'prod-3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'Smartphones',
    price: 899.00,
    stock: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxUO_5mvKR4CR___I3-CoRU9zJBfbq0wznU_BqfdP7b4YYlVLxJC2A47CcJqxCXnIGOxwpGKWP79l7m3iwHMFE_WxZ-7JJYrhiActmJj1kCzk4LG3gGPidgy8v7Fzz5oFhjW-7_TkIxjlEGYjSWlEDHkcg8aiKfW622uTjTK3xcicfxZbw3KwzTB_uMr7G_RybJjusy-tCFQOQzuktIe61NCLLBq9xgvWt0zxNwDaHOgya0lN9Oa8h3g',
    specs: 'Bay Blue, 128GB',
    color: 'Bay Blue',
    imeiRequired: true
  },
  {
    id: 'prod-4',
    name: 'AirPods Max',
    brand: 'Apple',
    category: 'Audio',
    price: 549.00,
    stock: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI8qT8ThjXNPl6tfxbGDTAgiV9EDLoLjyQbH3WuzO9gMLKGRUgKKZnFXTj1Z0zl_vagW5k44SpH5y5sQkkN661BlHaMPFIiqOlOOrWaSgXy5yr17MibJyyVh5c0VeekuOxnbQaIFvDRkbcu_ABu63F03EAZB04a9Y4kQQDzbMEZ4eVLjBv_zaPpPwqSeO0WS3rxloQ1p3V0sbg6WiBQLS_8V0DC1P21JEQfTv8THDPS2d-P2d-QTfTSQ',
    specs: 'Silver, Over-ear',
    color: 'Silver',
    imeiRequired: false
  },
  {
    id: 'prod-5',
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    category: 'Wearables',
    price: 799.00,
    stock: 7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr5bDfPA9ezJ_Cr0IPMAcO5wYMbF6npna7mnv6-2M4-18CLPYYid1JsEjwW_HpLxqxVGDpFS7laxWXWBGLoy4t-QJj1poNDXyMB5t1K99W9J9omsZ70J-ssaD-iszus1AQwHGvWTbaS6pv9iVYVSkxstvNW7gc0JKrbufq7YJ8G8J_sJRo10XKde5mxqVz5l2i9udTQE2q6a8tO_ci-dv9BX_wwWf5Y8hVQrBuvAID0riy_T0-I2Srjg',
    specs: 'Orange Alpine Loop, Rugged Titanium',
    color: 'Orange Alpine',
    imeiRequired: true
  },
  {
    id: 'prod-6',
    name: '30W Power Adapter',
    brand: 'Apple',
    category: 'Accessories',
    price: 39.00,
    stock: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAMdtt21cClMEjS_bvZfVnIzJQQEFGwVAgaNipDFleguiETO75MwIDh4TVP7vzKvWO65XTMMNZlotIYWqAL7q_yXSQqH5ARqQdSoRRN7U3zvUq21hhnfgOmcyfODghwr8Gu-vWgen7z5jHoV-zO7tyoK-x_OzMwFBq56IG5-bER-9NybZgKei1UsIf6gW64_MzVmw-YIDz3zcZEQTsfkoJhP6cXbpPdkkEasNmIxmCudoL4nq7trv6aA',
    specs: 'White, Single USB-C',
    color: 'White',
    imeiRequired: false
  },
  {
    id: 'prod-7',
    name: 'Samsung Galaxy Z Fold 5',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 1799.00,
    stock: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCpYUiVA94A922ETyM9D1GoRdu1gz61uqx67moT3V6U8Xrq4mzcwCNf8Xi6ofBGtL_EytysT5asyFtILPxeOfA_SInnitpi4So121_cvwm16wFOH79mXQJ6NE8AJH2dYrUGzxaiKcBa2hlY_Enzujm-VY1pPVZigIDhOtTfC1bE4NRyDilU7qUn47AFELA3O8fZHefYDx8AaRRJY4rEMGfaRUj32kdzZnsOVDxeLFM6a-y9KxLz2Q6zw',
    specs: 'Phantom Black, 512GB',
    color: 'Phantom Black',
    imeiRequired: true
  },
  {
    id: 'prod-8',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    price: 349.00,
    stock: 25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1lcN9Y-BNh9HMpMG1rXIvCmyKKdwwEKAaDqtVOLr6Fc5yhs1oAzbR_1SuJKGpzaZ3lTiEKKDLCqJ6YovqUY_kBRNE9gA9KW6r8L4-J0ZBWAZeNb1A6ngZGHrYnvuCAsl-jhAeWlk2RyPqUkbjx3AWeMxZz8PSj0Zel4ZXqoz6rc52PZT2WKie18LOfo7kJmedKPEa48XW5eKhTzDzRLjQa-64IpdPCmx_fHh_HkHORFfUkkTIIIwXaQ',
    specs: 'Matte Black, Wireless NC',
    color: 'Matte Black',
    imeiRequired: false
  },
  {
    id: 'prod-9',
    name: 'Pixel Tablet 11',
    brand: 'Google',
    category: 'Tablets',
    price: 499.00,
    stock: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUJjXHNthh0crU7BIp5kRud-wUhNi34Lz_6MxUi9DMCEh4ogies4mIK3e0dPzCk11CLKPHdoWXraboRDBHI7-ueJXjBkrruHDSQD3J8hC-8R0vbxoeKQwsXFJhsSxSiVWTHCSeiH4SG0WExTJFPQsdHQTQdC-30JNf_KN36rRUzBcYHSApWvAppsev4DPAI4xnEiloeEoBz3pocWmJh5VVsy3bz7lriEqpmAvGqlBqk39kvO5LZBPS4A',
    specs: 'Porcelain, 128GB with Speaker Dock',
    color: 'Porcelain',
    imeiRequired: false
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#TRP-9842',
    date: '2026-07-01',
    time: '10:24 AM',
    customerName: 'John Dorsey',
    customerEmail: 'john.dorsey@gmail.com',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // iPhone 15 Pro Max
        quantity: 1,
        selectedImei: 'IMEI: 358249001274558'
      },
      {
        product: INITIAL_PRODUCTS[5], // 30W Adapter
        quantity: 1
      }
    ],
    subtotal: 1238.00,
    tax: 61.90,
    discount: 54.40,
    total: 1245.50,
    paymentMethod: 'Card',
    status: 'Completed'
  },
  {
    id: '#TRP-9841',
    date: '2026-07-01',
    time: '09:55 AM',
    customerName: 'Sarah Miller',
    customerEmail: 'sarah.m@outlook.com',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // S24 Ultra
        quantity: 1,
        selectedImei: 'IMEI: 351945112093842'
      }
    ],
    subtotal: 1299.00,
    tax: 64.95,
    discount: 294.95, // mock total $1,069.00
    total: 1069.00,
    paymentMethod: 'Cash',
    status: 'Completed'
  },
  {
    id: '#TRP-9840',
    date: '2026-07-01',
    time: '09:12 AM',
    customerName: 'Brian Kim',
    customerEmail: 'bkim@corp.com',
    items: [
      {
        product: INITIAL_PRODUCTS[5], // 30W Power Adapter
        quantity: 5
      }
    ],
    subtotal: 195.00,
    tax: 9.75,
    discount: 4.76,
    total: 199.99,
    paymentMethod: 'KPay',
    status: 'Pending'
  },
  {
    id: '#TRP-9839',
    date: '2026-07-01',
    time: '08:45 AM',
    customerName: 'Elena T.',
    customerEmail: 'elena.t@yahoo.com',
    items: [
      {
        product: INITIAL_PRODUCTS[7], // Sony Headphones
        quantity: 1
      }
    ],
    subtotal: 349.00,
    tax: 17.45,
    discount: 217.45,
    total: 149.00,
    paymentMethod: 'AYA Pay',
    status: 'Refunded'
  }
];

export const MANAGER_PROFILE = {
  name: 'Alex Rivera',
  role: 'Store Manager',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGqk-KEB4uJCWi5ry9wZR56s-IH4HGkJRa-AstffapKoMA2zoiirx4GFRy4KqLaaHzqFnPLRPSoBUc_L8nSYosp2ZnXvv2S6Q00icSLu4S_kaxo03OTNR3xOTeHtlSJFleg6BUm1u3pyLtz1T0pvl_N9YgpCxv3-SQsmwp3XVi8P4fJAFWDevF3soRrb6q5WR1nd2jSsuswUYsB3315VgY0A0hwOMfERR0EzDT0Y2fFxXn8BUpHLGXog'
};
