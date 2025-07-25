
import type { Metadata } from 'next';

/**
 * @interface ProductPagePropsForMetadata
 * @description Props for the generateMetadata function, specifically for product pages.
 * @property {Object} params - Object containing dynamic route parameters.
 * @property {string} params.id - The ID of the product from the URL.
 */
interface ProductPagePropsForMetadata {
  params: { slug: string };
}

/**
 * @function generateMetadata
 * @description Dynamically generates SEO metadata for each product page.
 * This function runs on the server.
 * IMPORTANT: Direct IndexedDB access in generateMetadata (server-side) is NOT possible.
 * This implementation provides a generic title/description based on the ID.
 * In a real app with a server-side database, you would fetch product details here.
 * @param {ProductPagePropsForMetadata} props - The props containing the product ID.
 * @returns {Promise<Metadata>} The generated metadata object.
 */
export async function generateMetadata({ params }: ProductPagePropsForMetadata): Promise<Metadata> {
  // As IndexedDB is client-side, we cannot fetch the actual product name/description/image here.
  // This is a limitation for purely client-side data with server-side metadata generation.
  // For a real application with a backend, you would make a server-side fetch here:
  // const product = await fetchProductDetailsFromServer(params.id);
  // if (!product) { return { title: 'Product Not Found' }; }

  // For now, we provide a basic dynamic title and description based on the ID.
  const productSlug = params.slug;
  const pageTitle = `Product: ${productSlug}`;
  const pageDescription = `Details for product ID: ${productSlug} on ListingHub.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/product/${productSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    // Add keywords if you can derive them without client-side data
    keywords: [`product ${productSlug}`, 'e-commerce', 'details'],
  };
}
