# E-commerce Product Listing Platform

This project is an E-commerce Product Listing Platform built with Next.js, TypeScript, and Tailwind CSS. It lets users browse products, view detailed info for each item, filter by category and price, and manage products by adding, editing, or deleting them.

## What This Project Does

The platform showcases modern web development techniques, focusing on:

- **Product Listing:** Displaying products in a clean grid layout.
- **Product Details:** Dedicated pages with full product information.
- **Filtering:** Easy-to-use filters for categories and price ranges.
- **Product Management:** Full CRUD (create, read, update, delete) functionality.
- **Responsive Design:** Works smoothly on mobile, tablet, and desktop.
- **SEO Friendly:** Proper meta tags, sitemap, and robots.txt for better search engine visibility.
- **Performance:** Uses Next.js features to deliver a fast, smooth user experience.

## Data Storage Note

To keep things simple and meet project goals, all product data is stored locally in the browser using IndexedDB. This means data is saved only on the user’s device and won’t sync across different browsers or devices, nor is it shared between users.

---

## Getting Started Locally

### Prerequisites

- Node.js (version 18 or later recommended)
- npm (or yarn/pnpm)

### Installation Steps

```bash
git clone https://github.com/webexpert1/listinghub.git
cd listinghub
npm install
```

Environment Setup
Create a .env.local file in the project root and add your base URL (used for SEO):
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Running the App
Start the development server:
```bash
npm run dev
```

Open your browser and go to http://localhost:3000.

On first load (or if IndexedDB is cleared), the app will populate the database with sample product data automatically.

Building for Production
To build the app for production:
```bash
npm run dev
```

This generates optimized assets in the .next folder.

## SEO Implementation
SEO was an important focus for this project, and several Next.js features were used to make sure the site is search-engine friendly:

- **Dynamic Metadata: We use generateMetadata functions in files like layout.tsx, page.tsx, and the metadata files for product and category pages. This lets each page have its own unique title, description, and social media tags (Open Graph and Twitter cards), which helps search engines and social platforms understand the content better.

- **Sitemap: An automatically generated XML sitemap (sitemap.ts) helps search engines easily find and index all the pages on the site.

- **Robots.txt: A robots.txt file is included to tell web crawlers which parts of the site they should or shouldn’t access.

- **Image Optimization: The app uses Next.js’s <Image /> component everywhere to optimize images automatically. This means images load faster thanks to lazy loading, responsive sizes, and modern formats — all of which improve SEO by speeding up page load times.

Because product and category data is stored client-side in IndexedDB, the dynamic metadata for those pages is generated based on the URL parameters. In a full-stack setup with a server-side database, we could fetch full product or category details directly when generating metadata, making the SEO content even richer.