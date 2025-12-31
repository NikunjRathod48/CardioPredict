import React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">{label}</label>}
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        </div>
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
