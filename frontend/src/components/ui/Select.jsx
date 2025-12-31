import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ className, label, options, error, placeholder = "Select an option", ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5 relative">
            {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">{label}</label>}
            <div className="relative">
                <select
                    className={cn(
                        "flex h-11 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-8 text-foreground",
                        error && "border-destructive focus-visible:ring-destructive",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    <option value="" disabled className="text-muted-foreground bg-background">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-background text-foreground">{opt.label}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        </div>
    );
});
Select.displayName = "Select";

export { Select };
