import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { Label } from "../../primitives/Label";
import styles from "./FormField.module.css";

type FormFieldProps = {
  id: string;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  children: ReactElement;
};

const FormField = ({
  id,
  label,
  description,
  error,
  invalid = false,
  disabled = false,
  required = false,
  className,
  children,
}: FormFieldProps) => {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error("FormField expects a single React element child.");
  }

  const descriptionId = description ? `${id}--description` : undefined;
  const errorId = error ? `${id}--error` : undefined;
  const childDescribedBy = child.props["aria-describedby"];
  const describedBy = [childDescribedBy, descriptionId, errorId]
    .filter(Boolean)
    .join(" ");
  const hasDescribedBy = describedBy.length > 0;

  const isInvalid = invalid || Boolean(error);
  const childAriaInvalid = child.props["aria-invalid"];
  const ariaInvalidValue = isInvalid ? "true" : childAriaInvalid;

  const mergedDisabled = disabled || Boolean(child.props.disabled);
  const mergedRequired = required || Boolean(child.props.required);

  const control = cloneElement(child, {
    id,
    disabled: mergedDisabled,
    required: mergedRequired,
    "aria-describedby": hasDescribedBy ? describedBy : undefined,
    "aria-invalid": ariaInvalidValue,
  });

  const classes = [styles.field, className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={mergedDisabled ? "true" : undefined}
    >
      {label ? (
        <Label htmlFor={id} className={styles.label}>
          {label}
        </Label>
      ) : null}
      {control}
      {description ? (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
export type { FormFieldProps };
