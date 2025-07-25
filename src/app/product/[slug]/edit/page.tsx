'use client';

import Input from "@/components/ui/Input";
import { getProductsDB, updateProductDB } from "@/lib/indexeddb";
import { Product } from "@/types/product";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditProductPage() {
    const router = useRouter();
    const { slug } = useParams() as { slug: string };

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const products = await getProductsDB();
            const found = products.find((p) => p.slug === slug);
            setProduct(found || null);
            setLoading(false);
        };

        if (slug) fetchProduct();
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        await updateProductDB(product);
        router.push(`/product/${product.slug}`);
    }

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

            <label className="block mb-2">Name</label>
            <Input
                id="edit-name"
                name="name"
                className="border border-gray-300 rounded p-2"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })} />

            <label className="block mb-2">Description</label>
            <textarea
                className="border p-2 w-full mb-4"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
            ></textarea>

            <label className="block mb-2">Price</label>
            <Input
                id="edit-price"
                name="price"
                className="border border-gray-300 rounded p-2"
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />

            <label className="block mb-2">Image URL</label>
            <Input
                id="edit-image-url"
                name="image_url"
                className="border border-gray-300 rounded p-2"
                value={product.imageUrl}
                onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })} />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">Update Product</button>
        </form>
    )
}