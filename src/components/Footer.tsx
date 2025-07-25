export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white  p-6 mt-12 shadow-inner ">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} ListingHub. All rights reserved.</p>
            </div>

        </footer>
    );
}