import classNames from 'classnames'
import React from 'react'

import styles from '../styles/TextDiv.module.css'

interface TextDivProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
  maxWidth?: string,
  clickable?: boolean,
}

export function TextDiv ({
  children,
  fontSize,
  textAlign,
  maxWidth,
  clickable = false,
  className,
  ...props
}: TextDivProps) {
  return <div className={classNames([styles.textDiv], { [styles.clickable]: clickable }, className)} style={{
    fontSize: fontSize,
    textAlign: textAlign,
    maxWidth: maxWidth
  }} {...props}>
    {children}
  </div>
}
