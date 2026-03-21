import React from 'react';
import './Button.css';

const Button = ({
                    children,
                    onClick,
                    type = 'button',
                    variant = 'primary',
                    size = 'medium',
                    disabled = false,
                    fullWidth = false,
                    icon,
                    loading = false,
                    className = ''
                }) => {
    const buttonClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${fullWidth ? 'btn-full-width' : ''} 
    ${loading ? 'btn-loading' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && <span className="btn-spinner"></span>}
            {!loading && icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
        </button>
    );
};

export default Button;
