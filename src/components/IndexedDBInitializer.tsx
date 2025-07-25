'use client';

import { useEffect } from 'react';
import { initDB } from '@/lib/indexeddb';

/**
 * @function IndexedDBInitializer
 * @description A client component to initialize IndexedDB.
 * This should run once to ensure the database is ready for use across the application.
 * It no longer populates dummy data; that responsibility is handled conditionally by HomePage.
 */
export default function IndexedDBInitializer() {
  useEffect(() => {
    const setupDB = async () => {
      try {
        await initDB();
        console.log('IndexedDB initialized from client (by Initializer).');

      } catch (error) {
        console.error('Error setting up IndexedDB from Initializer:', error);
      }
    };
    setupDB();
  }, []);

  return null;
}
