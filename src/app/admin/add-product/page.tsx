'use client'; // This page needs to be a Client Component for form interactivity

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook for navigation
import ProductForm from '@/components/ProductForm';
import { addProductDb } from '@/lib/indexeddb'; // Import IndexedDB function
import { ProductFormData } from '@/types/product';

/**
 * @function AddProductPage
 * @description Page for adding a new product to the e-commerce platform.
 * Uses the reusable ProductForm component.
 */
export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  /**
   * @function handleAddProduct
   * @description Handles the submission of the product form to add a new product.
   * @param {ProductFormData} data - The product data from the form.
   */
  const handleAddProduct = async (data: ProductFormData) => {
    setIsLoading(true);
    setFormError(null); // Clear previous errors
    try {
      await addProductDb(data);
      console.log('Product added successfully!');
      // After successful addition, navigate back to the home page
      router.push('/');
      // Optional: router.refresh() if you want to force re-render of server components
      // on the home page, though for client-side IndexedDB, the HomePage useEffect
      // will re-fetch anyway.
    } catch (error) {
      console.error('Error adding product:', error);
      setFormError('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-8 flex-grow">
      <ProductForm
        onSubmit={handleAddProduct}
        isLoading={isLoading}
        submitButtonText="Add Product"
        formError={formError}
      />
    </main>
  );
}
