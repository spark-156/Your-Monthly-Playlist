import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Container.module.css'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string,
  alignSelfCenter?: boolean,
  disablePadding?: boolean,
}

export function Container ({ children, maxWidth = '1000px', alignSelfCenter = false, disablePadding = false, ...props }: ContainerProps) {
  return <div className={classNames({
    [styles.container]: true,
    [styles.alignSelfCenter]: alignSelfCenter,
    [styles.disablePadding]: disablePadding
  })}
  style={{
    maxWidth: maxWidth
  }}
  {...props}
  >
    {children}
  </div>
}
