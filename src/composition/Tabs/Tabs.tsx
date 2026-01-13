import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import styles from "./Tabs.module.css";

type TabsContextValue = {
  value?: string;
  setValue: (value: string) => void;
  setInitialValue: (value: string, disabled?: boolean) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

type TabsProps = {
  id: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
};

type TabsListProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

type TabsTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "role" | "aria-selected" | "aria-controls"
> & {
  value: string;
  children: ReactNode;
};

type TabsPanelProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "role" | "aria-labelledby"
> & {
  value: string;
  children: ReactNode;
};

const Tabs = ({
  id,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;
  const hasInitialValueRef = useRef(defaultValue !== undefined);

  const setValue = (nextValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const setInitialValue = (nextValue: string, disabled?: boolean) => {
    if (isControlled || hasInitialValueRef.current || disabled) {
      return;
    }

    hasInitialValueRef.current = true;
    setUncontrolledValue(nextValue);
  };

  const contextValue: TabsContextValue = {
    value: currentValue,
    setValue,
    setInitialValue,
    baseId: id,
  };

  const classes = [styles.tabs, className].filter(Boolean).join(" ");

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={classes}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({
  children,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: TabsListProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsList must be used within Tabs.");
  }

  const classes = [styles.list, className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      role="tablist"
      aria-orientation="horizontal"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({
  value,
  children,
  className,
  disabled,
  onClick,
  onKeyDown,
  ...props
}: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs.");
  }

  const isSelected = context.value === value;
  const tabId = `${context.baseId}--tab-${value}`;
  const panelId = `${context.baseId}--panel-${value}`;

  useEffect(() => {
    context.setInitialValue(value, disabled);
  }, [context, value, disabled]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }
    context.setValue(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }

    const list = event.currentTarget.closest('[role="tablist"]');
    if (!list) {
      return;
    }

    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    ).filter((tab) => !tab.disabled);

    if (tabs.length === 0) {
      return;
    }

    const currentIndex = tabs.indexOf(event.currentTarget);
    if (currentIndex === -1) {
      return;
    }

    const focusTab = (tab: HTMLButtonElement) => {
      tab.focus();
      const nextValue = tab.dataset.value;
      if (nextValue) {
        context.setValue(nextValue);
      }
    };

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = tabs[(currentIndex + 1) % tabs.length];
      focusTab(next);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const next = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
      focusTab(next);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTab(tabs[0]);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTab(tabs[tabs.length - 1]);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      context.setValue(value);
    }
  };

  const classes = [styles.trigger, className].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      id={tabId}
      role="tab"
      className={classes}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected && !disabled ? 0 : -1}
      data-selected={isSelected ? "true" : undefined}
      data-value={value}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsPanel = ({
  value,
  children,
  className,
  ...props
}: TabsPanelProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsPanel must be used within Tabs.");
  }

  const isSelected = context.value === value;
  const tabId = `${context.baseId}--tab-${value}`;
  const panelId = `${context.baseId}--panel-${value}`;
  const classes = [styles.panel, className].filter(Boolean).join(" ");

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!isSelected}
      className={classes}
      data-selected={isSelected ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tabs;
export { TabsList, TabsTrigger, TabsPanel };
export type { TabsListProps, TabsPanelProps, TabsProps, TabsTriggerProps };
