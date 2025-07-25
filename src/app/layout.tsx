import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import IndexedDBInitializer from '@/components/IndexedDBInitializer';
import { Suspense } from 'react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ListingHub - E-commerce Product Listing Platform',
    template: '%s | ListingHub',
  },
  description: 'Discover and manage a wide range of products with ease on ListingHub.',
  keywords: ['e-commerce', 'products', 'online shopping', 'tech', 'accessories', 'furniture', 'apparel'],
  authors: [{ name: 'ListingHub Inc.' }],
  creator: 'Richardson/ListingHub',
  publisher: 'ListingHub',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),

  openGraph: {
    title: 'ListingHub - E-commerce Product Listing Platform',
    description: 'Discover and manage a wide range of products with ease on ListingHub.',
    url: '/',
    siteName: 'ListingHub',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // A generic, high-quality image for the homepage/site
        width: 1200,
        height: 630,
        alt: 'ListingHub E-commerce Platform - Explore Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ListingHub - E-commerce Product Listing Platform',
    description: 'Discover and manage a wide range of products with ease on ListingHub.',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <IndexedDBInitializer />
        <Navbar />
        <div className='flex-grow'>
          <Suspense fallback={
            <div className="flex justify-center items-center h-full min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="ml-4 text-gray-700">Loading content...</p>
            </div>
          }>
            {children}
          </Suspense>

        </div>
        <Footer />

      </body>
    </html>
  );
}
