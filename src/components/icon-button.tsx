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
        "grid h-12 w-12 place-content-center rounded-lg text-text-secondary outline-none hover:bg-bg-secondary focus:ring-2 focus:ring-border-focus focus:ring-offset-1 focus:ring-offset-bg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
