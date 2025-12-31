import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = false, depth = 'soft', ...props }) => {

    // Using semantic border/shadows
    const shadows = {
        soft: 'shadow-soft dark:shadow-none border-border',
        depth: 'shadow-depth dark:shadow-none border-border',
    };

    return (
        <motion.div
            whileHover={hoverEffect ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`
                bg-card text-card-foreground rounded-2xl border p-6 md:p-8 relative overflow-hidden transition-colors duration-300
                ${shadows[depth]}
                ${className}
            `}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
