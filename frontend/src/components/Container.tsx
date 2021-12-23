import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Container.module.css'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string,
  alignSelfCenter?: boolean,
  disablePadding?: boolean,
}

export function Container ({ children, className, maxWidth, alignSelfCenter = false, disablePadding = false, ...props }: ContainerProps) {
  return <div className={classNames({
    [styles.container]: true,
    [styles.alignSelfCenter]: alignSelfCenter,
    [styles.disablePadding]: disablePadding
  }, className)}
  style={{
    maxWidth: maxWidth
  }}
  {...props}
  >
    {children}
  </div>
}
