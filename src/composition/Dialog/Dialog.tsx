import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Dialog.module.css";

type DialogProps = {
  id: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  "aria-label"?: string;
  initialFocusRef?: RefObject<HTMLElement>;
  className?: string;
  children: ReactNode;
};

const focusableSelector =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector)
  ).filter((element) => element.tabIndex !== -1);
};

const Dialog = ({
  id,
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  "aria-label": ariaLabel,
  initialFocusRef,
  className,
  children,
}: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(isOpen);

  const requestClose = () => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      lastActiveRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      const focusTarget =
        initialFocusRef?.current ??
        getFocusableElements(surfaceRef.current)[0] ??
        surfaceRef.current;
      focusTarget?.focus();
    }

    if (!isOpen && wasOpenRef.current) {
      lastActiveRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, initialFocusRef]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      requestClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusable = getFocusableElements(surfaceRef.current);
    const activeElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (focusable.length === 0) {
      event.preventDefault();
      surfaceRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (!event.shiftKey && activeElement === surfaceRef.current) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (
      event.shiftKey &&
      (activeElement === first || activeElement === surfaceRef.current)
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      requestClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const titleId = title ? `${id}--title` : undefined;
  const descriptionId = description ? `${id}--description` : undefined;

  const classes = [styles.surface, className].filter(Boolean).join(" ");

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        ref={surfaceRef}
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descriptionId}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {title || description ? (
          <div className={styles.header}>
            {title ? (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            ) : null}
            {description ? (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
export type { DialogProps };
