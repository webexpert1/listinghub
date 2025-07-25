'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { initDB, getProductsDB, addProductDb } from '@/lib/indexeddb'; // Import addProductDB
import { Product } from '@/types/product';
import { dummyProductsData } from '@/data/products';
import Link from 'next/link';


/**
 * @function HomePage
 * @description The main landing page displaying a list of all products.
 * Fetches products directly from IndexedDB (client-side) and populates dummy data if empty.
 */
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndPopulateProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('HomePage (Client): Ensuring IndexedDB is initialized...');
        await initDB(); // Ensure DB is initialized
        console.log('HomePage (Client): IndexedDB initialized. Attempting to fetch products...');

        let fetchedProducts = await getProductsDB();

        if (fetchedProducts.length === 0) {
          console.log('HomePage (Client): No existing products found. Adding dummy data...');
        
          for (const productData of dummyProductsData) {
            await addProductDb(productData);
          }
          console.log('HomePage (Client): Dummy data added to IndexedDB. Re-fetching products...');
          // Fetch again after adding dummy data
          fetchedProducts = await getProductsDB();
        }

        // Sort products by creation date, newest first
        fetchedProducts.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        setProducts(fetchedProducts);
        console.log('HomePage (Client): Final products data:', fetchedProducts);
      } catch (err) {
        console.error('HomePage (Client): Error during fetch or data population:', err);
        setError((err as Error).message || 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndPopulateProducts();
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto p-4 flex-grow flex justify-center items-center">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-4 flex-grow flex justify-center items-center">
        <EmptyState message={`Error loading products: ${error}`} />
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 flex-grow">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        All Products
      </h1>

      {products.length === 0 ? (
        <EmptyState message="No products found. Start by adding some!" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`}>
                 <ProductCard key={product.id} product={product} />
              </Link>
           
          ))}
        </div>
      )}
    </main>
  );
}
