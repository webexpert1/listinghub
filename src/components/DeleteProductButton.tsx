'use client';

import { useRouter } from 'next/navigation';
import { deleteProductDB } from '@/lib/indexeddb';

export default function DeleteProductButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    console.log('Deleting product with slug:', slug);
    await deleteProductDB(slug);
    router.push('/');
  };

  

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete Product
    </button>
  );
}
