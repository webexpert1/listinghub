import React from 'react';

/**
 * Interface defining the props for the Input component.
 *
 * @interface InputProps
 * @property {string} id - The unique identifier for the input element.
 * @property {string} name - The name attribute for the input element.
 * @property {string} [label] - Optional label text displayed above the input.
 * @property {string} [placeholder] - Optional placeholder text inside the input.
 * @property {string} [className] - Optional additional CSS classes for the input element.
 * @property {string} [containerClassName] - Optional additional CSS classes for the input container.
 * @property {string} [type] - The type of the input (e.g., text, number). Defaults to 'text'.
 * @property {string | number} [value] - The current value of the input.
 * @property {boolean} [required] - Whether the input is required. Defaults to false.
 * @property {boolean} [disabled] - Whether the input is disabled.
 * @property {string} [autoComplete] - The autocomplete attribute for the input.
 * @property {string} [error] - Error message to display below the input.
 * @property {string} [step] - Step attribute for inputs like number or range.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Change event handler.
 */

interface InputProps {
    label?: string;
    placeholder?: string;
    id: string;
    name: string;
    className?: string;
    containerClassName?: string;
    type?: string;
    value?: string | number;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    error?: string
    step?: string;
    min?: string;
    max?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    name,
    type = 'text',
    label,
    placeholder,
    id,
    value,
    required = false,
    className = '',
    containerClassName = '',
    error,
    onChange,
    ...rest
}: InputProps) {
    return (
        <div className={`mb-4 ${containerClassName}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...rest}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}