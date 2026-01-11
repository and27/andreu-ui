import type { ReactNode, SelectHTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./Select.module.css";

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> & {
  id: string;
  children: ReactNode;
  className?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, children, className, ...props }, ref) => {
    const classes = [styles.select, className].filter(Boolean).join(" ");

    return (
      <select ref={ref} id={id} className={classes} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
export type { SelectProps };
