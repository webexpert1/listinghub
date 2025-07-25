import { Product, ProductFormData } from "@/types/product";

const DB_NAME = 'ecommerce_db';
const DB_VERSION = 1;
const STORE_NAME = 'products';

let db: IDBDatabase | null = null;

/**
 * @function initDB
 * @description Initializes the IndexedDB database.
 * Opens the database and creates the object store if it doesn't exist.
 * @returns {Promise<void>} A promise that resolves when the database is successfully opened.
 */
export const initDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Open the database
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const target = event.target as IDBOpenDBRequest;
            db = target.result;
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                objectStore.createIndex('category', 'category', { unique: false });
                objectStore.createIndex('price', 'price', { unique: false });
                objectStore.createIndex('slug', 'slug', { unique: false });
                console.log('IndexedDB object store created successfully.', STORE_NAME);
            }
        }

        // Event handler for successful database opening
        request.onsuccess = (event) => {
            const target = event.target as IDBOpenDBRequest;
            db = target.result;
            console.log('IndexedDB opened successfully.', DB_NAME);
            resolve();
        }

        // Event handler for errors
        request.onerror = (event) => {
            console.error('Error opening IndexedDB.', event);
            reject(event);
        }
    });
}

/**
 * @function getTransaction
 * @description Helper function to get an IndexedDB transaction.
 * @param {IDBTransactionMode} mode - The mode of the transaction ('readonly' or 'readwrite').
 * @returns {IDBObjectStore} The object store for products.
 * @throws {Error} If the database is not initialized.
 */
const getTransaction = (mode: IDBTransactionMode): IDBObjectStore => {
    if (!db) {
        throw new Error('IndexedDB not initialized. Call initDB() first.');
    }
    const transaction = db.transaction(STORE_NAME, mode);
    return transaction.objectStore(STORE_NAME);
}

/**
 * @function addProductDB
 * @description Adds a new product to the IndexedDB.
 * @param {ProductFormData} productData - The product data to add.
 * @returns {Promise<Product>} A promise that resolves with the added product (including generated ID and timestamps).
 */
export const addProductDb = (productData: ProductFormData): Promise<Product> => {
    return new Promise((resolve, reject) => {
        const objectStore = getTransaction('readwrite');
        const newProduct: Product = {
            id: crypto.randomUUID(),
            ...productData,
            price: Number(productData.price),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const request = objectStore.add(newProduct);

        request.onsuccess = () => {
            console.log('Product added successfully.', newProduct);
            resolve(newProduct);
        }

        request.onerror = (event) => {
            const target = event.target as IDBRequest;
            console.error('Error adding product to IndexedDB.', target.error);
            reject(target.error);
        }
    })
}

/**
 * @function getProductsDB
 * @description Retrieves all products from IndexedDB.
 * @returns {Promise<Product[]>} A promise that resolves with an array of all products.
 */
export async function getProductsDB(): Promise<Product[]> {
    await initDB(); // Ensure DB is initialized first
    if (!db) {
        throw new Error('IndexedDB not initialized.');
    }
    const tx = db.transaction('products', 'readonly');
    const store = tx.objectStore('products');
    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as Product[]);
        request.onerror = (event) => {
            const target = event.target as IDBRequest;
            console.error('Error retrieving products from IndexedDB.', target.error);
            reject(target.error);
        };
    });
}


/**
 * @function getProductByIdDB
 * @description Retrieves a single product by its ID from IndexedDB.
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Promise<Product | undefined>} A promise that resolves with the product or undefined if not found.
 */
export const getProductByIdDB = (id: string): Promise<Product | undefined> => {
    return new Promise((resolve, reject) => {
        const objectStore = getTransaction('readonly');
        const request = objectStore.get(id);

        request.onsuccess = () => {
            resolve(request.result as Product | undefined)
        }

        request.onerror = (event) => {
            const target = event.target as IDBRequest;
            console.log('Error getting product by ID', target.error);
            reject(target.error);
        }

    })
}

/**
 * @function updateProductDB
 * @description Updates an existing product in IndexedDB.
 * @param {string} id - The ID of the product to update.
 * @param {Partial<ProductFormData>} updates - An object containing the fields to update.
 * @returns {Promise<Product | undefined>} A promise that resolves with the updated product or undefined if not found.
 */
export async function updateProductDB(updatedProduct: Product): Promise<void> {
  await initDB(); // Ensure the database is initialized
  if (!db) {
    throw new Error('IndexedDB not initialized.');
  }
  const tx = db.transaction('products', 'readwrite');
  const store = tx.objectStore('products');
  const request = store.put(updatedProduct); // overwrites based on ID

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log('Product updated successfully.', updatedProduct);
      resolve();
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error('Error updating product:', target.error);
      reject(target.error);
    };
  });
}




/**
 * @function deleteProductDB
 * @description Deletes a product by its ID from IndexedDB.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is successfully deleted.
 */
export async function deleteProductDB(slug: string): Promise<void> {
    await initDB(); // Ensure the database is initialized
    if (!db) {
        throw new Error('IndexedDB not initialized.');
    }
    return new Promise((resolve, reject) => {
        const objectStore = getTransaction('readwrite');
        const request = objectStore.delete(slug);

        request.onsuccess = () => {
            console.log('Product deleted successfully.');
            resolve();
        };

        request.onerror = (event) => {
            const target = event.target as IDBRequest;
            console.error('Error deleting product:', target.error);
            reject(target.error);
        };
    });
}