import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'default',
    size = 'default',
    isLoading = false,
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            disabled={isLoading || props.disabled}
            className={cn(
                "relative inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
                {
                    'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-200': variant === 'default',
                    'bg-danger-500 text-white hover:bg-danger-600 shadow-md': variant === 'destructive',
                    'border border-slate-200 bg-white hover:bg-slate-100 text-slate-900': variant === 'outline',
                    'hover:bg-slate-100 text-slate-700': variant === 'ghost',
                    'text-primary-600 underline-offset-4 hover:underline': variant === 'link',
                    'h-9 px-4 py-2': size === 'default',
                    'h-8 rounded-md px-3 text-xs': size === 'sm',
                    'h-11 rounded-md px-8 text-lg': size === 'lg',
                    'h-9 w-9 p-0': size === 'icon',
                },
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
