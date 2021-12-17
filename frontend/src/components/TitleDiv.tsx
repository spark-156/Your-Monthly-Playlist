import React from 'react'

import styles from '../styles/TitleDiv.module.css'

interface TitleDivProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
}

export function TitleDiv ({ children, fontSize, textAlign, ...props }: TitleDivProps) {
  return <div className={styles.titleDiv} style={{
    fontSize: fontSize,
    textAlign: textAlign
  }} {...props}>
    {children}
  </div>
}
