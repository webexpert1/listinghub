'use client';

import React from 'react';

/**
 * @interface CategoryFilterProps
 * @description Props for the CategoryFilter component.
 * @property {string[]} categories - An array of unique category names.
 * @property {string} selectedCategory - The currently selected category.
 * @property {(category: string) => void} onSelectCategory - Callback function when a category is selected.
 */
interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

/**
 * @function CategoryFilter
 * @description A filter component to select products by category.
 * @param {CategoryFilterProps} props - The component props.
 */
export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">

                <button
                    onClick={() => onSelectCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${selectedCategory === 'all'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedCategory.toLowerCase() === category.toLowerCase()
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
