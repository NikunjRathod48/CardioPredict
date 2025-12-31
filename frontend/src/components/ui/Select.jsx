import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ label, options, error, className = '', ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-semibold text-foreground ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                <select
                    ref={ref}
                    className={`
                        w-full px-4 py-3.5 rounded-xl border bg-input/20 text-foreground appearance-none cursor-pointer
                        text-sm font-medium transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring focus:bg-card
                        hover:border-accent-foreground/30
                        ${error
                            ? 'border-destructive focus:ring-destructive/20 focus:border-destructive bg-destructive/5'
                            : 'border-input'
                        }
                        ${className}
                    `}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-foreground transition-colors" />
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
