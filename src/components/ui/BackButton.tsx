'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

/**
 * @interface BackButtonProps
 * @description Props for the BackButton component.
 * @property {string} [className=''] - Additional Tailwind CSS classes.
 */
interface BackButtonProps {
  className?: string;
}

/**
 * @function BackButton
 * @description A reusable button component that navigates back to the previous page.
 * @param {BackButtonProps} props - The component props.
 */
export default function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter();

  /**
   * @function handleGoBack
   * @description Navigates to the previous entry in the browser's history stack.
   */
  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleGoBack}
      variant="secondary"
      className={`flex items-center gap-1 ${className}`}
    >
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Back
    </Button>
  );
}
