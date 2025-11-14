import React from 'react';

/**
 * Reusable Button Component
 * 
 * Usage:
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Click Me
 * </Button>
 */

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'medium',
    className = '',
    disabled = false
  }) => {
    const baseStyles = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';
    
    const variants = {
      primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      white: 'bg-white text-black hover:bg-gray-50 focus:ring-gray-300 border border-gray-200'
    };
    
    const sizes = {
      small: 'px-4 py-1.5 text-sm',
      medium: 'px-5 py-2 text-sm',
      large: 'px-6 py-3 text-base'
    };
  
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      >
        {children}
      </button>
    );
  };

export default Button;