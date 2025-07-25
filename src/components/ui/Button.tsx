import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large'
}

export default function Button({
    children,
    variant = 'primary',
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    ...rest
}: ButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    let variantStyles = '';

    switch (variant) {
        case 'primary':
            variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
            break;
        case 'secondary':
            variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
            break;
        case 'danger':
            variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
            break;
        default:
            variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
    }

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}