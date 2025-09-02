import * as React from "react";
import { cn } from "./utils";

interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "w-full p-2 border border-border rounded-md bg-input-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

NativeSelect.displayName = "NativeSelect";

export { NativeSelect };