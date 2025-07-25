'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { addProductDb } from '@/lib/indexeddb';
import { ProductFormData } from '@/types/product';

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
    setFormError(null); 
    try {
      await addProductDb(data);
      console.log('Product added successfully!');
      // After successful addition, navigate back to the home page
      router.push('/');
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
