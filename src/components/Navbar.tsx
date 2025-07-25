'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathName = usePathname();

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold rounded-md transition-colors" >
                    ListingHub
                </Link>
                <div>
                    <Link href="/" className={`px-3 py-2 rounded-md text-lg font-medium transition-colors hover:bg-blue-500 hover:text-white ${pathName === "/" ? 'bg-blue-500 text-white' : 'text-blue-100 hover:bg-blue-500'}`}> Home
                    </Link>
                    <Link href="/admin/add-product" className={`px-3 py-2 rounded-md text-lg font-medium transition-colorrs ${
                        pathName === "/admin/add-product" ? 'bg-blue-500 text-white' : 'text-blue-100 hover:bg-blue-500'
                    }`}> Add Product
                    </Link>
                </div>
            </div>
        </nav>
    )
}