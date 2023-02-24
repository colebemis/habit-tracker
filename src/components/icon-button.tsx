import React from "react";
import { cx } from "../utils/cx";

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cx(
        "grid h-12 w-12 place-content-center rounded-lg text-text-secondary outline-none hover:bg-bg-secondary focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 focus-visible:ring-offset-bg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
