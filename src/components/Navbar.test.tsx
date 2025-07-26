

import React from 'react';
import { render, screen } from '@testing-library/react';
import  Navbar  from './Navbar';
import '@testing-library/jest-dom';


// Mock next/navigation's usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock next/link to render a simple anchor for easier testing
jest.mock('next/link', () => {
  return ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

import { usePathname } from 'next/navigation';

describe('Navbar', () => {
  const cases = [
    {
      desc: 'pathName is "/" - Home link is active',
      pathName: '/',
      expectedClasses: {
        home: 'text-blue-600 font-semibold underline',
        addProduct: 'text-gray-700 hover:text-blue-500',
      },
    },
    {
      desc: 'pathName is "/admin/add-product" - Add Product link is active',
      pathName: '/admin/add-product',
      expectedClasses: {
        home: 'text-gray-700 hover:text-blue-500',
        addProduct: 'text-blue-600 font-semibold underline',
      },
    },
    {
      desc: 'pathName is unknown - no link is active',
      pathName: '/some/other/path',
      expectedClasses: {
        home: 'text-gray-700 hover:text-blue-500',
        addProduct: 'text-gray-700 hover:text-blue-500',
      },
    },
    {
      desc: 'pathName is empty string - no link is active',
      pathName: '',
      expectedClasses: {
        home: 'text-gray-700 hover:text-blue-500',
        addProduct: 'text-gray-700 hover:text-blue-500',
      },
    },
    {
      desc: 'pathName is root with trailing slash "/" - Home link is active',
      pathName: '/',
      expectedClasses: {
        home: 'text-blue-600 font-semibold underline',
        addProduct: 'text-gray-700 hover:text-blue-500',
      },
    },
  ];

  cases.forEach(({ desc, pathName, expectedClasses }) => {
    test(desc, () => {
      (usePathname as jest.Mock).mockReturnValue(pathName);

      render(<Navbar />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      const addProductLink = screen.getByRole('link', { name: 'Add Product' });
      const listingHubLink = screen.getByRole('link', { name: 'ListingHub' });

      // Check ListingHub link always points to "/" and has correct base classes
      expect(listingHubLink).toHaveAttribute('href', '/');
      expect(listingHubLink).toHaveClass('text-xl', 'font-bold', 'text-blue-600');

      // Check Home link href and className
      expect(homeLink).toHaveAttribute('href', '/');
      expect(homeLink).toHaveClass(...expectedClasses.home.split(' '));

      // Check Add Product link href and className
      expect(addProductLink).toHaveAttribute('href', '/admin/add-product');
      expect(addProductLink).toHaveClass(...expectedClasses.addProduct.split(' '));
    });
  });
});