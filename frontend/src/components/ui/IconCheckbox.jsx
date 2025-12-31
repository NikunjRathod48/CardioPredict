import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const IconCheckbox = ({ label, icon: Icon, value, onChange, error, className = "" }) => {
    // value is assumed to be '1' or '0' (string or number from RHF)
    const isChecked = String(value) === '1';

    const handleClick = () => {
        onChange(isChecked ? '0' : '1');
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <motion.button
                type="button"
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
                className={`
                    relative w-full p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group
                    ${isChecked
                        ? 'border-primary bg-primary/10 shadow-md shadow-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }
                    ${error ? '!border-destructive' : ''}
                `}
            >
                {/* Check Badge in Top Right */}
                <div className={`
                    absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-colors
                    ${isChecked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                    <Check className="w-3 h-3" strokeWidth={3} />
                </div>

                {/* Icon */}
                <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-colors
                    ${isChecked
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    }
                `}>
                    <Icon className="w-6 h-6" />
                </div>

                {/* Label */}
                <span className={`
                    font-bold text-sm transition-colors
                    ${isChecked ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                `}>
                    {label}
                </span>
            </motion.button>
            {error && <p className="text-xs text-destructive text-center">{error}</p>}
        </div>
    );
};

export default IconCheckbox;
