'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const pathName = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                     <Image src="/images/cart-100.png"
                            width={60}
                            height={60}
                         alt="Logo"/>
                    <Link href="/" className="text-xl font-bold text-blue-600">ListingHub</Link>
                </div>

                <div className="space-x-6">
                    <Link
                        href="/"
                        className={`${pathName === '/' ? 'text-blue-600 font-semibold underline' : 'text-gray-700 hover:text-blue-500'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/admin/add-product"
                        className={`${pathName === '/admin/add-product' ? 'text-blue-600 font-semibold underline' : 'text-gray-700 hover:text-blue-500'
                            }`}
                    >
                        Add Product
                    </Link>
                </div>
            </div>
        </nav>
    )
}