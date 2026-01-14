import type {
  ButtonHTMLAttributes,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";
import { createContext, useContext, useRef, useState } from "react";

import styles from "./DropdownMenu.module.css";

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  baseId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  triggerIdRef: RefObject<string>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

type DropdownMenuProps = {
  id: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: ReactNode;
};

type DropdownMenuTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "aria-haspopup" | "aria-expanded"
> & {
  children: ReactNode;
};

type DropdownMenuContentProps = Omit<HTMLAttributes<HTMLDivElement>, "role"> & {
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

type DropdownMenuItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  children: ReactNode;
  onSelect?: () => void;
};

const DropdownMenu = ({
  id,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
}: DropdownMenuProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const triggerIdRef = useRef(`${id}--trigger`);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const classes = [styles.menu, className].filter(Boolean).join(" ");

  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (nextFocus && event.currentTarget.contains(nextFocus)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) {
        return;
      }
      if (!root.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider
      value={{ open: isOpen, setOpen, baseId: id, triggerRef, triggerIdRef }}
    >
      <div className={classes} ref={rootRef} onBlur={handleBlur}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({
  children,
  className,
  onClick,
  ...props
}: DropdownMenuTriggerProps) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuTrigger must be used within DropdownMenu.");
  }

  const triggerId = props.id ?? `${context.baseId}--trigger`;
  context.triggerIdRef.current = triggerId;
  const classes = [styles.trigger, className].filter(Boolean).join(" ");

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    context.setOpen(!context.open);
  };

  return (
    <button
      {...props}
      id={triggerId}
      ref={context.triggerRef}
      type="button"
      className={classes}
      aria-haspopup="menu"
      aria-expanded={context.open}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const DropdownMenuContent = ({
  children,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onKeyDown,
  ...props
}: DropdownMenuContentProps) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuContent must be used within DropdownMenu.");
  }

  if (!context.open) {
    return null;
  }

  const triggerId = context.triggerIdRef.current;
  const menuId = `${context.baseId}--menu`;
  const classes = [styles.content, className].filter(Boolean).join(" ");

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      context.setOpen(false);
      context.triggerRef.current?.focus();
    }
  };

  return (
    <div
      {...props}
      id={menuId}
      className={classes}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : ariaLabelledBy ?? triggerId}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = ({
  children,
  className,
  disabled,
  onSelect,
  onClick,
  ...props
}: DropdownMenuItemProps) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuItem must be used within DropdownMenu.");
  }

  const classes = [styles.item, className].filter(Boolean).join(" ");

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }
    onSelect?.();
    context.setOpen(false);
    context.triggerRef.current?.focus();
  };

  return (
    <button
      {...props}
      type="button"
      className={classes}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default DropdownMenu;
export { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
};
