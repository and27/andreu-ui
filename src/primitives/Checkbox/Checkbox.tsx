import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./Checkbox.module.css";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> & {
  id: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className, ...props }, ref) => {
    const classes = [styles.checkbox, className].filter(Boolean).join(" ");

    return (
      <input ref={ref} id={id} type="checkbox" className={classes} {...props} />
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
export type { CheckboxProps };
