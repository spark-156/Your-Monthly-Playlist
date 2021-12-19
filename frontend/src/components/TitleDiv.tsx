import classNames from 'classnames'
import React from 'react'

import styles from '../styles/TitleDiv.module.css'

interface TitleDivProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
}

export function TitleDiv ({ children, fontSize, textAlign, className, ...props }: TitleDivProps) {
  return <div className={classNames(styles.titleDiv, className)} style={{
    fontSize: fontSize,
    textAlign: textAlign
  }} {...props}>
    {children}
  </div>
}
