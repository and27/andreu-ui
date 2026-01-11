import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

import styles from "./Textarea.module.css";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id"
> & {
  id: string;
  className?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, className, ...props }, ref) => {
    const classes = [styles.textarea, className].filter(Boolean).join(" ");

    return <textarea ref={ref} id={id} className={classes} {...props} />;
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
export type { TextareaProps };
