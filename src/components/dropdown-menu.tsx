import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Portal from "@radix-ui/react-portal";
import React from "react";
import { cx } from "../utils/cx";

const Root = RadixDropdownMenu.Root;

const Trigger = RadixDropdownMenu.Trigger;

const Content = React.forwardRef<
  HTMLDivElement,
  RadixDropdownMenu.DropdownMenuContentProps
>(({ children, className, ...props }, ref) => (
  <Portal.Root>
    <RadixDropdownMenu.Content
      ref={ref}
      align="start"
      sideOffset={4}
      className={cx(
        "min-w-[12rem] rounded-xl bg-bg-overlay p-1 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1),_0px_4px_8px_0px_rgba(0,0,0,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </RadixDropdownMenu.Content>
  </Portal.Root>
));

type ItemProps = RadixDropdownMenu.DropdownMenuItemProps & {
  icon?: React.ReactNode;
};

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, icon, children, ...props }, ref) => (
    <RadixDropdownMenu.Item
      ref={ref}
      className={cx(
        "flex h-12 items-center rounded-lg px-4 leading-none outline-none focus:bg-bg-secondary",
        className
      )}
      {...props}
    >
      {children}
    </RadixDropdownMenu.Item>
  )
);

const Separator = () => {
  return <RadixDropdownMenu.Separator className="bg-divider h-px" />;
};

export const DropdownMenu = Object.assign(Root, {
  Trigger,
  Content,
  Item,
  Separator,
});
