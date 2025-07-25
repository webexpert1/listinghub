import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types/product';

export default function ProductImage({ product }: { product: Product }) {
    const [imgSrc, setImgSrc] = useState(product.imageUrl);

    return (
        <div className="relative w-full h-64">
            <Image
                src={imgSrc}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                onError={() => setImgSrc('/images/fallback.jpg')}
                priority
            />
        </div>
    );
};
