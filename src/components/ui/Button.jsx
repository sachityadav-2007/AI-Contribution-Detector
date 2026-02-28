import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200",
        ghost: "hover:bg-slate-800/50 text-slate-300 hover:text-white",
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button };
