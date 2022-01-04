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
  disablePaddingTopAndBottom?: boolean,
  direction?: ContainerDirectionEnum,
  halfGap?: boolean,
}

export function Container ({
  children,
  className,
  maxWidth,
  alignSelfCenter = false,
  disablePadding = false,
  disablePaddingTopAndBottom = false,
  direction = ContainerDirectionEnum.Down,
  halfGap = false,
  ...props
}: ContainerProps) {
  return <div className={classNames({
    [styles.container]: true,
    [styles.alignSelfCenter]: alignSelfCenter,
    [styles.disablePadding]: disablePadding,
    [styles.disablePaddingTopAndBottom]: disablePaddingTopAndBottom,
    [styles.rows]: direction === ContainerDirectionEnum.Down,
    [styles.columns]: direction === ContainerDirectionEnum.Right,
    [styles.halfGap]: halfGap
  }, className)}
  style={{
    maxWidth: maxWidth
  }}
  {...props}
  >
    {children}
  </div>
}
