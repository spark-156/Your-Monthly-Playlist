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

export function Arrow ({ direction, className, onClick, ...props }: ArrowProps) {
  // TODO FIX left and right versions of arrow

  return <div
  className={classNames(styles.arrow, {
    [styles.up]: direction === DirectionEnum.Up,
    [styles.down]: direction === DirectionEnum.Down,
    [styles.left]: direction === DirectionEnum.Left,
    [styles.right]: direction === DirectionEnum.Right
  }, className)}
  {...props}
  >
    <svg onClick={onClick} width="22" height="32" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10.6464" y1="11.6237" x2="21.6237" y2="0.646447" stroke="white"/>
      <line x1="0.353553" y1="0.646447" x2="11.3308" y2="11.6237" stroke="white"/>
    </svg>
  </div>
}
