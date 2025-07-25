'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ProductFormData } from '@/types/product';
import { generateSlug } from '@/lib/generateSlug';

/**
 * Interface defining the props for the ProductForm component.
 *
 * @interface ProductFormProps
 * @property {ProductFormData | null} [initialData] - Optional initial data to populate the form (used for editing).
 * @property {boolean} isLoading - Indicates if the form is in a loading state (e.g., submitting).
 * @property {(data: ProductFormData) => Promise<void>} onSubmit - Function to handle form submission.
 * @property {string} submitButtonText - Text to display on the submit button.
 * @property {string | null} [formError] - Optional error message to display at the form level.
 */
interface ProductFormProps {
    initialData?: ProductFormData | null;
    isLoading: boolean;
    onSubmit: (data: ProductFormData) => Promise<void>;
    submitButtonText: string;
    formError?: string | null;
}

export default function ProductForm({
    initialData = null,
    isLoading,
    onSubmit,
    submitButtonText,
    formError = null,
}: ProductFormProps) {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

    // Populate form with initial data if provided (for editing)
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    /**
     * @function handleChange
     * @description Handles changes to form input fields.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' ? parseFloat(value) || 0 : value, // Convert price to number
        }));
        // Clear error for the field once user starts typing
        if (errors[name as keyof ProductFormData]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
        }
    };

    /**
     * @function validateForm
     * @description Validates the form data.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required.';
        if (!formData.description.trim()) newErrors.description = 'Description is required.';
        if (formData.price <= 0) newErrors.price = 'Price must be a positive number.';
        if (!formData.category.trim()) newErrors.category = 'Category is required.';
        if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
        else if (!/^https?:\/\/.+\.(png|jpe?g|gif|webp)$/i.test(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid image URL (png, jpg, jpeg, gif, webp).';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * @function handleSubmit
     * @description Handles form submission.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if name is set before submitting
        if (!formData.name.trim()) {
            setErrors((prev) => ({ ...prev, name: 'Product name is required.' }));
            return;
        }

        // Generate slug from name (e.g., lowercase, replace spaces with dashes)
        const slug = generateSlug(formData.name.trim().toLowerCase());

        if (validateForm()) {
            await onSubmit({...formData, slug});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-2xl mx-auto my-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {submitButtonText.includes('Add') ? 'Add New Product' : 'Edit Product'}
            </h2>

            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {formError}</span>
                </div>
            )}

            <Input
                label="Product Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Wireless Headphones"
                required
                error={errors.name}
            />

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of the product features..."
                    required
                    rows={5}
                    className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <Input
                label="Price (NGN)"
                id="price"
                name="price"
                type="number"
                value={formData.price === 0 ? '' : formData.price}
                onChange={handleChange}
                placeholder="e.g., 25000"
                required
                step="1"
                min="0"
                error={errors.price}
            />

            <Input
                label="Category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Electronics, Apparel, Furniture"
                required
                error={errors.category}
            />

            <Input
                label="Image URL"
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="e.g., https://images.unsplash.com/photo-1579298245158-33e8f568f510?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                required
                error={errors.imageUrl}
            />

            <Button type="submit" disabled={isLoading} className="w-full mt-6">
                {isLoading ? 'Processing...' : submitButtonText}
            </Button>
        </form>
    );
}
