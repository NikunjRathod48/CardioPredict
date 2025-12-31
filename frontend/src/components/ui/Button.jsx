import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    className = '',
    ...props
}) => {

    // Premium Semantic Variants
    const variants = {
        primary: `
            bg-primary text-primary-foreground 
            shadow-lg shadow-primary/30 border border-transparent
            hover:shadow-primary/40 hover:bg-teal-600
        `,
        secondary: `
            bg-card text-foreground 
            border border-border shadow-sm
            hover:bg-muted hover:border-input
        `,
        ghost: `
            bg-transparent text-muted-foreground 
            hover:bg-muted hover:text-foreground
        `,
        danger: `
            bg-destructive/10 text-destructive border border-destructive/20
            hover:bg-destructive/20
        `,
    };

    const sizes = {
        sm: "px-4 py-1.5 text-xs font-semibold tracking-wide",
        md: "px-6 py-3 text-sm font-semibold tracking-wide",
        lg: "px-8 py-4 text-base font-bold tracking-wide",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={disabled || isLoading}
            className={`
                relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 select-none
                ${variants[variant]}
                ${sizes[size]}
                ${disabled || isLoading ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                ${className}
            `}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </motion.button>
    );
};

export default Button;
