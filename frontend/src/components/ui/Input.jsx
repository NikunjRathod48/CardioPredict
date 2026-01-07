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
                        w-full px-4 py-3.5 rounded-xl border bg-white/50 dark:bg-slate-900/50 text-foreground placeholder:text-muted-foreground
                        text-sm font-medium transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-900
                        hover:border-primary/50
                        disabled:opacity-60 disabled:cursor-not-allowed
                        ${error
                            ? 'border-destructive focus:ring-destructive/20 focus:border-destructive bg-destructive/5'
                            : 'border-slate-200 dark:border-slate-800'
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
