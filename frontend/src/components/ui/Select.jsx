import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Select = React.forwardRef(({ label, options, error, value, onChange, className = '', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Find label for current value
    const selectedLabel = options.find(opt => opt.value === value)?.label || "Select...";

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        if (onChange) {
            onChange(optionValue);
        }
        setIsOpen(false);
    };

    return (
        <div className="w-full space-y-1.5" ref={containerRef}>
            {label && (
                <label className="block text-sm font-semibold text-foreground ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    ref={ref}
                    className={`
                        w-full px-4 py-3.5 rounded-xl border bg-white/50 dark:bg-slate-900/50 text-foreground text-left flex items-center justify-between
                        text-sm font-medium transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-900
                        hover:border-primary/50
                        ${error
                            ? 'border-destructive focus:ring-destructive/20 focus:border-destructive bg-destructive/5'
                            : 'border-slate-200 dark:border-slate-800'
                        }
                        ${className}
                    `}
                    {...props}
                >
                    <span className="truncate">{selectedLabel}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
                        >
                            <div className="p-1 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleSelect(opt.value)}
                                        className={`
                                            w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                            ${value == opt.value
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }
                                        `}
                                    >
                                        <span>{opt.label}</span>
                                        {value == opt.value && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {error && (
                <p className="text-xs text-destructive font-medium ml-1 animate-fadeInUp">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Select;
