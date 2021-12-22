import React from 'react'
import classNames from 'classnames'

import styles from '../styles/Arrow.module.css'

export enum DirectionEnum {
  /* eslint-disable no-unused-vars */
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
  /* eslint-enable no-unused-vars */
}

interface ArrowProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: DirectionEnum
}

export function Arrow ({ direction, className }: ArrowProps) {
  return <div
  className={classNames(styles.arrow, {
    [styles.up]: direction === DirectionEnum.Up,
    [styles.down]: direction === DirectionEnum.Down,
    [styles.left]: direction === DirectionEnum.Left,
    [styles.right]: direction === DirectionEnum.Right
  }, className)}
  />
}
