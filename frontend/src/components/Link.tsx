import classNames from 'classnames'
import React from 'react'

import styles from '../styles/Link.module.css'

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
  maxWidth?: string,
  href: string,
}

export function Link ({
  children,
  fontSize,
  textAlign,
  maxWidth,
  className,
  href,
  ...props
}: LinkProps) {
  return <a
    className={classNames([styles.link], className)}
    href={href}
    {...props}
    style={{
      fontSize: fontSize,
      textAlign: textAlign,
      maxWidth: maxWidth
    }}
  >
    {children}
  </a>
}
