import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Button.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

export function Button ({ children, ...props }: ButtonProps) {
  return <button {...props} className={classNames([styles.button])}>
    {children}
  </button>
}
