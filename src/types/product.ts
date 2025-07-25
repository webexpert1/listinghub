
export enum ProductCategory {
    Electronics = "electronics",
    Clothing = "clothing",
    Fashion = "fashion",
    Footwear = "footwear",
}

/**
* @interface Product
* @description Defines the structure for a single product.
* @property {string} id - Unique identifier for the product.
* @property {string} name - Name of the product.
* @property {string} description - Detailed description of the product.
* @property {number} price - Price of the product.
* @property {string} category - Category the product belongs to (e.g., 'Electronics', 'Books').
* @property {string} imageUrl - URL of the product image.
* @property {number} createdAt - Timestamp of when the product was created.
* @property {number} updatedAt - Timestamp of when the product was last updated.
*/
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    slug?: string;
    category: ProductCategory | string;
    imageUrl: string
    createdAt?: number;
    updatedAt?: number;
}

/**
* @interface Category
* @description Defines the structure for a product category.
* @property {string} slug - URL-friendly identifier for the category (e.g., 'electronics').
* @property {string} name - Display name of the category (e.g., 'Electronics').
*/
export interface Category {
    slug: string;
    name: string;
}

/**
 * @interface ProductFormData
 * @description Defines the structure for product data as it comes from a form,
 * excluding auto-generated fields like id, createdAt, updatedAt.
 */
export interface ProductFormData {
    id?: string; // Optional for new products
    name: string;
    description: string;
    slug?: string; 
    price: number;
    category: string;
    imageUrl: string;
  }