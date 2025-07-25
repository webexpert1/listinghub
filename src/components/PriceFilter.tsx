'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

/**
 * @interface PriceFilterProps
 * @description Props for the PriceFilter component.
 * @property {number | undefined} initialMinPrice - Initial minimum price.
 * @property {number | undefined} initialMaxPrice - Initial maximum price.
 * @property {(min: number | undefined, max: number | undefined) => void} onApplyFilter - Callback when filter is applied.
 */
interface PriceFilterProps {
  initialMinPrice?: number;
  initialMaxPrice?: number;
  onApplyFilter: (min: number | undefined, max: number | undefined) => void;
}

/**
 * @function PriceFilter
 * @description A filter component to set minimum and maximum price range.
 * @param {PriceFilterProps} props - The component props.
 */
export default function PriceFilter({
  initialMinPrice,
  initialMaxPrice,
  onApplyFilter,
}: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState<number | ''>(initialMinPrice ?? '');
  const [maxPrice, setMaxPrice] = useState<number | ''>(initialMaxPrice ?? '');

  // Update local state when initial props change (e.g., from URL params)
  useEffect(() => {
    setMinPrice(initialMinPrice ?? '');
    setMaxPrice(initialMaxPrice ?? '');
  }, [initialMinPrice, initialMaxPrice]);

  /**
   * @function handleMinChange
   * @description Handles change in minimum price input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value === '' ? '' : parseFloat(value));
  };

  /**
   * @function handleMaxChange
   * @description Handles change in maximum price input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value === '' ? '' : parseFloat(value));
  };

  /**
   * @function applyFilter
   * @description Calls the onApplyFilter callback with current min/max values.
   */
  const applyFilter = () => {
    const finalMin = typeof minPrice === 'number' && !isNaN(minPrice) ? minPrice : undefined;
    const finalMax = typeof maxPrice === 'number' && !isNaN(maxPrice) ? maxPrice : undefined;
    onApplyFilter(finalMin, finalMax);
  };

  /**
   * @function clearFilter
   * @description Clears the price filter inputs and applies the filter.
   */
  const clearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    onApplyFilter(undefined, undefined);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter by Price</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <Input
          id="minPrice"
          name="minPrice"
          label="Min Price (NGN)"
          type="number"
          value={minPrice}
          onChange={handleMinChange}
          placeholder="0"
          step="1"
          min='0'
          containerClassName="flex-grow"
        />
        <Input
          id="maxPrice"
          name="maxPrice"
          label="Max Price (NGN)"
          type="number"
          value={maxPrice}
          onChange={handleMaxChange}
          placeholder="0"
          step="1"
          min='0'
          containerClassName="flex-grow"
        />
        <div className="flex gap-2 w-full sm:w-auto mb-4 ">
          <Button onClick={applyFilter} variant="primary" className="flex-grow">
            Apply
          </Button>
          <Button onClick={clearFilter} variant="secondary" className="flex-grow">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
