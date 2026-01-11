import type { InputHTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useRef } from "react";

import { Label } from "../Label";
import { Radio } from "../Radio";
import styles from "./RadioGroup.module.css";

type AriaInvalid = InputHTMLAttributes<HTMLInputElement>["aria-invalid"];

type RadioGroupContextValue = {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  ariaInvalid?: AriaInvalid;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

type RadioGroupProps = {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaInvalid;
};

type RadioGroupItemProps = {
  id: string;
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

const RadioGroup = ({
  name,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  label,
  className,
  children,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: RadioGroupProps) => {
  const defaultValueRef = useRef(defaultValue);

  const contextValue: RadioGroupContextValue = {
    name,
    value,
    defaultValue: defaultValueRef.current,
    onValueChange,
    disabled,
    ariaInvalid,
  };

  const classes = [styles.group, className].filter(Boolean).join(" ");
  const isInvalid =
    ariaInvalid === true ||
    ariaInvalid === "true" ||
    ariaInvalid === "grammar" ||
    ariaInvalid === "spelling";

  if (label) {
    return (
      <RadioGroupContext.Provider value={contextValue}>
        <fieldset
          id={id}
          className={classes}
          disabled={disabled}
          data-invalid={isInvalid ? "true" : undefined}
          data-disabled={disabled ? "true" : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        >
          <legend className={styles.legend}>{label}</legend>
          <div className={styles.items}>{children}</div>
        </fieldset>
      </RadioGroupContext.Provider>
    );
  }

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        id={id}
        role="radiogroup"
        className={classes}
        data-invalid={isInvalid ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || undefined}
      >
        <div className={styles.items}>{children}</div>
      </div>
    </RadioGroupContext.Provider>
  );
};

const RadioGroupItem = ({
  id,
  value,
  children,
  disabled,
}: RadioGroupItemProps) => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroupItem must be used within RadioGroup.");
  }

  const isControlled = context.value !== undefined;
  const isChecked = isControlled ? context.value === value : undefined;
  const isDefaultChecked =
    !isControlled && context.defaultValue !== undefined
      ? context.defaultValue === value
      : undefined;
  const isDisabled = context.disabled || disabled;

  const handleChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    event
  ) => {
    if (event.currentTarget.checked) {
      context.onValueChange?.(event.currentTarget.value);
    }
  };

  const checkedProps = isControlled ? { checked: isChecked } : {};
  const defaultCheckedProps =
    !isControlled && isDefaultChecked !== undefined
      ? { defaultChecked: isDefaultChecked }
      : {};

  return (
    <div className={styles.item} data-disabled={isDisabled ? "true" : undefined}>
      <Radio
        id={id}
        name={context.name}
        value={value}
        {...checkedProps}
        {...defaultCheckedProps}
        onChange={handleChange}
        disabled={isDisabled}
        aria-invalid={context.ariaInvalid}
      />
      <Label htmlFor={id} className={styles.label}>
        {children}
      </Label>
    </div>
  );
};

export default RadioGroup;
export { RadioGroupItem };
export type { RadioGroupItemProps, RadioGroupProps };
