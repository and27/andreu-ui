import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./Switch.module.css";

type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> & {
  id: string;
  className?: string;
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id, className, ...props }, ref) => {
    const classes = className ? `${styles.switch} ${className}` : styles.switch;

    return (
      <input
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        className={classes}
        {...props}
      />
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
export type { SwitchProps };
