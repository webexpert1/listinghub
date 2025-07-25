import Image from 'next/image';
import { useState } from 'react';

export default function ProductImage({ product }) {
    const [imgSrc, setImgSrc] = useState(product.imageUrl);

    return (
        <div className="relative w-full h-64">
            <Image
                src={imgSrc}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="w-full h-64 object-cover rounded-lg"
                onError={() => setImgSrc('/images/fallback.jpg')}
            />
        </div>
    );
};
