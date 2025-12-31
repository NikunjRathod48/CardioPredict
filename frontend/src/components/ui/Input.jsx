import React from 'react';

const Input = React.forwardRef(({ label, error, helperText, className = '', ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-semibold text-foreground ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    ref={ref}
                    className={`
                        w-full px-4 py-3.5 rounded-xl border bg-input/20 text-foreground placeholder:text-muted-foreground
                        text-sm font-medium transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring focus:bg-card
                        hover:border-accent-foreground/30
                        disabled:opacity-60 disabled:cursor-not-allowed
                        ${error
                            ? 'border-destructive focus:ring-destructive/20 focus:border-destructive bg-destructive/5'
                            : 'border-input'
                        }
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {helperText && !error && (
                <p className="text-xs text-muted-foreground ml-1">{helperText}</p>
            )}
            {error && (
                <p className="text-xs text-destructive font-medium ml-1 animate-fadeInUp">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Input;
