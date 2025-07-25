'use client';
import { useState, useEffect, } from 'react';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { initDB, getProductsDB, addProductDb } from '@/lib/indexeddb';
import { Product } from '@/types/product';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { dummyProductsData } from '@/data/products';
import dynamic from 'next/dynamic';


const DynamicCategoryFilter = dynamic(() => import('@/components/CategoryFilter'), {
  loading: () => <div className="p-4 bg-white rounded-lg shadow-md mb-6 animate-pulse h-24"></div>,
  ssr: false, // Ensure this component only renders on the client
});

const DynamicPriceFilter = dynamic(() => import('@/components/PriceFilter'), {
  loading: () => <div className="p-4 bg-white rounded-lg shadow-md mb-6 animate-pulse h-36"></div>,
  ssr: false, // Ensure this component only renders on the client
});

/**
 * @function HomePage
 * @description The main landing page displaying a list of all products.
 * Fetches products directly from IndexedDB (client-side) and populates dummy data if empty.
 * Includes category and price filtering.
 */
export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all fetched products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Store currently filtered products
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  // State for filters, synchronized with URL search params
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get('category') || 'all';
  const initialMinPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const initialMaxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [minPriceFilter, setMinPriceFilter] = useState<number | undefined>(initialMinPrice);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | undefined>(initialMaxPrice);

  // Effect to fetch and populate products on initial load
  useEffect(() => {
    const fetchAndPopulateProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('HomePage (Client): Ensuring IndexedDB is initialized...');
        await initDB();
        console.log('HomePage (Client): IndexedDB initialized. Attempting to fetch products...');

        let fetched = await getProductsDB();

        if (fetched.length === 0) {
          console.log('HomePage (Client): No existing products found. Adding dummy data...');

          for (const productData of dummyProductsData) {
            await addProductDb(productData); // Corrected function name
          }
          console.log('HomePage (Client): Dummy data added to IndexedDB. Re-fetching products...');
          fetched = await getProductsDB(); // Re-fetch after adding
        }

        // Sort all products by creation date, newest first
        fetched.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        setAllProducts(fetched); // Store all products

        // Extract unique categories
        const categories = Array.from(new Set(fetched.map(p => p.category)));
        setUniqueCategories(categories);

        console.log('HomePage (Client): Final products data:', fetched);
      } catch (err) {
        console.error('HomePage (Client): Error during fetch or data population:', err);
        setError((err as Error).message || 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndPopulateProducts();
  }, []);

  // Effect to apply filters whenever filter states or allProducts change
  useEffect(() => {
    let currentFiltered = [...allProducts];

    // Apply category filter
    if (selectedCategory !== 'all') {
      currentFiltered = currentFiltered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price filter
    if (minPriceFilter !== undefined && !isNaN(minPriceFilter)) {
      currentFiltered = currentFiltered.filter((p) => p.price >= minPriceFilter);
    }
    if (maxPriceFilter !== undefined && !isNaN(maxPriceFilter)) {
      currentFiltered = currentFiltered.filter((p) => p.price <= maxPriceFilter);
    }

    setFilteredProducts(currentFiltered);
  }, [allProducts, selectedCategory, minPriceFilter, maxPriceFilter]);

  // Handlers for filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePriceFilterChange = (min: number | undefined, max: number | undefined) => {
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
    // Update URL
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (min !== undefined) {
      newSearchParams.set('minPrice', min.toString());
    } else {
      newSearchParams.delete('minPrice');
    }
    if (max !== undefined) {
      newSearchParams.set('maxPrice', max.toString());
    } else {
      newSearchParams.delete('maxPrice');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Sync state with URL params on initial load or URL change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'all';
    const minPriceFromUrl = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPriceFromUrl = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

    setSelectedCategory(categoryFromUrl);
    setMinPriceFilter(minPriceFromUrl);
    setMaxPriceFilter(maxPriceFromUrl);
  }, [searchParams]); // Re-run when searchParams object changes

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

      <div className="flex flex-col lg:flex-row gap-6">
        <DynamicCategoryFilter
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
        <DynamicPriceFilter
          initialMinPrice={minPriceFilter}
          initialMaxPrice={maxPriceFilter}
          onApplyFilter={handlePriceFilterChange}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">

        {/* Product Listing Section */}
        <div className="lg:w-full">
          {filteredProducts.length === 0 ? (
            <EmptyState message="No products found matching your filter criteria." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
