'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathName = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">ListingHub</Link>
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