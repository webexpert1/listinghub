import { Product } from "@/types/product";
import ProductImage from "@/components/ProductImage";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Format price to local currency NGN
    const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(product.price);

    return (
            <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
                <ProductImage  product={product} />
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">
                        Category: {product.category}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-auto">
                        {formattedPrice}
                    </p>
                </div>
            </div>
    );
}