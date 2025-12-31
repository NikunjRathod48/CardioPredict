import React from 'react';

const Textarea = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-700 ml-1">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                className={`
                    w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400
                    text-sm transition-all duration-200 min-h-[120px] resize-y
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error
                        ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                        : 'border-slate-200 hover:border-slate-300'
                    }
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-500 font-medium ml-1 animate-pulse-soft">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Textarea;
