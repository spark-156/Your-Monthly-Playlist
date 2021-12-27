import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Container.module.css'

export enum ContainerDirectionEnum {
  /* eslint-disable no-unused-vars */
  Down = 'down',
  Right = 'right'
  /* eslint-enable no-unused-vars */
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string,
  alignSelfCenter?: boolean,
  disablePadding?: boolean,
  direction?: ContainerDirectionEnum,
}

export function Container ({ children, className, maxWidth, alignSelfCenter = false, disablePadding = false, direction = ContainerDirectionEnum.Down, ...props }: ContainerProps) {
  return <div className={classNames({
    [styles.container]: true,
    [styles.alignSelfCenter]: alignSelfCenter,
    [styles.disablePadding]: disablePadding,
    [styles.rows]: direction === ContainerDirectionEnum.Down,
    [styles.columns]: direction === ContainerDirectionEnum.Right
  }, className)}
  style={{
    maxWidth: maxWidth
  }}
  {...props}
  >
    {children}
  </div>
}
