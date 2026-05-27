import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-glass-stroke bg-surface-container-low/60 px-4 py-3 text-base text-on-surface transition-all placeholder:text-on-surface-variant/30 focus:outline-none focus:border-cyan-glow/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full flex items-center", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
InputGroup.displayName = "InputGroup";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-12 w-full rounded-lg border border-glass-stroke bg-surface-container-low/60 px-4 py-3 text-base text-on-surface transition-all focus:outline-none focus:border-cyan-glow/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer md:text-sm [&_option]:bg-[#191b24] [&_option]:text-[#e1e2ee]",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = "Select";

export { Input, InputGroup, Select };
