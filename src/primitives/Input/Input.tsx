import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import styles from './Input.module.css'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, type = 'text', ...props }, ref) => {
    const classes = className ? `${styles.input} ${className}` : styles.input

    return <input id={id} ref={ref} type={type} className={classes} {...props} />
  },
)

Input.displayName = 'Input'

export default Input
export type { InputProps }
