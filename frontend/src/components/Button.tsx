import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Button.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> { }

export function Button ({ children, className, ...props }: ButtonProps) {
  return <button className={classNames(styles.button, className)} {...props}>
    {children}
  </button>
}
