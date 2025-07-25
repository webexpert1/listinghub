import React from 'react';

/**
 * Interface defining the props for the Button component.
 *
 * @interface ButtonProps
 * @property {React.ReactNode} children - The content inside the button.
 * @property {string} [className] - Additional CSS classes for the button.
 * @property {boolean} [disabled] - Whether the button is disabled.
 * @property {() => void} [onClick] - Click event handler.
 * @property {'button' | 'submit' | 'reset'} [type] - The button type attribute.
 * @property {'primary' | 'secondary' | 'danger'} [variant] - Visual style variant of the button.
 * @property {'small' | 'medium' | 'large'} [size] - Size variant of the button.
 */
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