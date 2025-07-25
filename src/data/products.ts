import { Product } from "@/types/product";

// This data is used to populate the IndexedDB initially if no products are found
export const dummyProductsData: Product[] = [
  {
    id: crypto.randomUUID(),
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation with crystal-clear call quality and comfortable design. Perfect for travel and daily commute.',
    price: 250000,
    category: 'Electronics',
    slug: 'sony-wh-1000xm5-noise-cancelling-headphones',
    imageUrl: '/images/sony-headphone.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Apple Watch Series 9 GPS',
    slug: 'apple-watch-series-9-gps',
    description: 'Advanced health features, brighter display, and powerful new ways to interact with your watch. Track your fitness and stay connected.',
    price: 450000,
    category: 'Electronics',
    imageUrl: '/images/apple-watch.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Genuine Leather Bi-Fold Wallet',
    slug: 'genuine-leather-bi-fold-wallet',
    description: 'Slim and stylish wallet with RFID blocking technology, perfect for everyday use. Durable and elegant.',
    price: 12000,
    category: 'Accessories',
    imageUrl: '/images/genuine-leather-wallet.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Organic Cotton Crewneck T-Shirt',
    slug: 'organic-cotton-crewneck-t-shirt',
    description: 'Eco-friendly and incredibly soft, this classic unisex t-shirt is a wardrobe essential. Available in multiple colors.',
    price: 8500,
    category: 'Apparel',
    imageUrl: '/images/cotton-crewneck-t-shirt.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Herman Miller Aeron Ergonomic Office Chair',
    slug: 'herman-miller-aeron-ergonomic-office-chair',
    description: 'The benchmark for ergonomic seating, designed for comfort and optimal support during long working hours. Fully adjustable.',
    price: 750000,
    category: 'Furniture',
    imageUrl: '/images/herman-ergonomic-office-chair.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Anker PowerCore III Elite 20000mAh Power Bank',
    slug: 'anker-powercore-iii-elite-20000mah-power-bank',
    description: 'Ultra-high capacity portable charger with PowerIQ 3.0 for rapid charging of multiple devices. Essential for travel.',
    price: 18000,
    category: 'Electronics',
    imageUrl: '/images/anker-power-bank.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Vintage Leather Travel Backpack',
    slug: 'vintage-leather-travel-backpack',
    description: 'Stylish and durable backpack, perfect for daily commute or weekend getaways. Features multiple compartments and robust zippers.',
    price: 35000,
    category: 'Accessories',
    imageUrl: '/images/vintage-leather-backpack.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Dell XPS 15 High-Performance Gaming Laptop',
    slug: 'dell-xps-15-high-performance-gaming-laptop',
    description: 'Experience immersive gaming and demanding tasks with cutting-edge graphics and lightning-fast processing. Sleek design and powerful performance.',
    price: 1200000,
    category: 'Electronics',
    imageUrl: '/images/dell_laptop.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Bose QuietComfort Earbuds II',
    slug: 'bose-quietcomfort-earbuds-ii',
    description: 'Compact and powerful earbuds with active noise cancellation for on-the-go listening. Exceptional sound quality and comfortable fit.',
    price: 75000,
    category: 'Electronics',
    imageUrl: '/images/bose-earbuds.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Ray-Ban Wayfarer Classic Sunglasses',
    slug: 'ray-ban-wayfarer-classic-sunglasses',
    description: 'Protect your eyes with style. Iconic design with UV400 protection and lightweight frame. A timeless accessory.',
    price: 15000,
    category: 'Accessories',
    imageUrl: '/images/ray-sunglasses.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12. Durable and eco-friendly, perfect for gym or office.',
    price: 4500,
    category: 'Home Goods',
    imageUrl: '/images/stainless-steel-water-bottle.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Yoga Mat Non-Slip Eco-Friendly',
    slug: 'yoga-mat-non-slip-eco-friendly',
    description: 'Premium yoga mat made from natural rubber, providing excellent grip and comfort for all yoga styles.',
    price: 7000,
    category: 'Sports & Outdoors',
    imageUrl: '/images/yoga-mat.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Coffee Maker Drip with Timer',
    slug: 'coffee-maker-drip-with-timer',
    description: 'Programmable coffee maker with a 12-cup capacity and a built-in timer for fresh coffee every morning.',
    price: 15000,
    category: 'Home Goods',
    imageUrl: '/images/drip-with-timer.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Digital Camera Mirrorless APS-C',
    slug: 'digital-camera-mirrorless-aps-c',
    description: 'Capture stunning photos and 4K videos with this compact and powerful mirrorless camera. Ideal for enthusiasts.',
    price: 800000,
    category: 'Electronics',
    imageUrl: '/images/digital-camera.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Enjoy high-quality audio on the go with this compact and waterproof Bluetooth speaker. Long battery life.',
    price: 22000,
    category: 'Electronics',
    imageUrl: '/images/bluetooth-speaker.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Gardening Tool Set (5-Piece)',
    slug: 'gardening-tool-set-5-piece',
    description: 'Essential tools for every gardener: trowel, transplanter, cultivator, pruning shears, and gloves. Durable and comfortable.',
    price: 9500,
    category: 'Home Goods',
    imageUrl: '/images/gardening-tool-set.jpg',
  },
  {
    id: crypto.randomUUID(),
    name: 'Fitness Tracker with GPS',
    slug: 'fitness-tracker-with-gps',
    description: 'Monitor your steps, heart rate, sleep, and track your routes with built-in GPS. Stay motivated on your fitness journey.',
    price: 30000,
    category: 'Sports & Outdoors',
    imageUrl: '/images/fitness-tracker.jpg',
  },
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
    imageUrl: '/images/organic-cotton.jpg',
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