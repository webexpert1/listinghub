'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductsDB } from '@/lib/indexeddb';
import { Product } from '@/types/product';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import DeleteProductButton from '@/components/DeleteProductButton';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';


export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const allProducts = await getProductsDB();
      const found = allProducts.find((p) => p.slug === slug);
      setProduct(found || null);
      setLoading(false);
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="container mx-auto p-4 flex-grow flex justify-center items-center">
        <LoadingSpinner />
      </main>
    );
  }


  if (!product) {
    return (
      <main className="container mx-auto p-4 flex-grow flex justify-center items-center">
        <EmptyState message="Product not found." />
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(product.price);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <BackButton />

        <div className=' space-x-4'>
          <Link href={`/product/${product.slug}/edit`}>
            <Button className=" px-4 py-2 bg-yellow-500 text-white rounded">Edit Product</Button>
          </Link>
          <DeleteProductButton slug={product.slug || ''} />
        </div>
      </div>

      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="my-4 rounded" />
      <p className="text-2xl font-bold">{formattedPrice}</p>
      <p>{product.description}</p>
    </div>
  );
}

