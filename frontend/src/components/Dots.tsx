import classNames from 'classnames'
import React from 'react'

import styles from '../styles/Dots.module.css'

interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Dots ({ className, onClick, ...props } : DotsProps) {
  return <div className={classNames([styles.dots], className)} {...props}>
    <svg onClick={onClick} width="22" height="10" viewBox="0 0 50 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" fill="white"/>
      <circle cx="25" cy="5" r="5" fill="white"/>
      <circle cx="45" cy="5" r="5" fill="white"/>
    </svg>
  </div>
}
