import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./Radio.module.css";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type"> & {
  id: string;
  name: string;
  className?: string;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id, name, className, ...props }, ref) => {
    const classes = [styles.radio, className].filter(Boolean).join(" ");

    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type="radio"
        className={classes}
        {...props}
      />
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
export type { RadioProps };
