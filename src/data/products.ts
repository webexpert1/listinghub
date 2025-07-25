import { Product, ProductCategory } from "@/types/product";

export const dummyProductsData: Product[] = [
  { 
    id: crypto.randomUUID(),
    slug: 'wireless-bluetooth-headphones',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-fidelity sound with comfortable over-ear design and long-lasting battery.',
    price: 25000,
    category: 'Electronics',
    imageUrl: '/images/headphones.jpg',
  },
  {
    id: crypto.randomUUID(),
    slug: 'smartwatch-with-heart-rate-monitor',
    name: 'Smartwatch with Heart Rate Monitor',
    description: 'Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.',
    price: 45000,
    category: 'Electronics',
    imageUrl: '/images/smart-watch.jpg',
  },
  {
    id: crypto.randomUUID(),
    slug: 'classic-leather-wallet',
    name: 'Classic Leather Wallet',
    description: 'Handcrafted from genuine leather, featuring multiple card slots and a coin pouch.',
    price: 12000,
    category: 'Accessories',
    imageUrl: '/images/wallet.jpg',
  },
  {
    id: crypto.randomUUID(),
    slug: 'organic-cotton-t-shirt',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft and breathable 100% organic cotton t-shirt, perfect for everyday wear.',
    price: 8500,
    category: 'Apparel',
    imageUrl: '/images/wallet.jpg',
  },
  {
    id: crypto.randomUUID(),
    slug: 'ergonomic-office-chair',
    name: 'Ergonomic Office Chair',
    description: 'Designed for maximum comfort and support during long working hours. Adjustable height and lumbar support.',
    price: 75000,
    category: 'Furniture',
    imageUrl: '/images/office-chair.jpg',
  },
  {
    id: crypto.randomUUID(),
    slug: 'portable-power-bank-20000mah',
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank to keep your devices charged on the go. Fast charging support.',
    price: 18000,
    category: 'Electronics',
    imageUrl: '/images/powerbank.jpg',
  }
];

export interface Category {
    slug: string;
    name: string;
  }