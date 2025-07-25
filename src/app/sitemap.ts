// This file generates the XML sitemap for your application.
// It runs on the server at build time (or dynamically).

import { MetadataRoute } from 'next';
// import { getProductIdsFromBackend } from '@/lib/server-data'; // Conceptual: if you had a server-side data source

/**
 * @function sitemap
 * @description Generates the sitemap for the application.
 * In a real application with a server-side database, you would fetch all product IDs here
 * to dynamically generate sitemap entries for each product.
 * For this client-side IndexedDB project, we'll list static pages and
 * provide a conceptual example for dynamic product pages.
 * @returns {MetadataRoute.Sitemap} An array of sitemap entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin/add-product`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Add other static pages like about, contact, etc. if you create them
  ];


  return [...staticPages]; 
}
