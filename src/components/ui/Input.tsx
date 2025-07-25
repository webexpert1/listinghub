import React from 'react';

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