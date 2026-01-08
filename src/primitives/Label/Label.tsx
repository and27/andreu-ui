import type { LabelHTMLAttributes, ReactNode } from 'react'

import styles from './Label.module.css'

type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'children'> & {
  htmlFor: string
  children: ReactNode
  className?: string
}

const Label = ({ htmlFor, children, className, ...props }: LabelProps) => {
  const classes = className ? `${styles.label} ${className}` : styles.label

  return (
    <label htmlFor={htmlFor} className={classes} {...props}>
      {children}
    </label>
  )
}

export default Label
export type { LabelProps }
