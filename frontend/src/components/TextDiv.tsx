import React from 'react'

import styles from '../styles/TextDiv.module.css'

interface TextDivProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
  maxWidth?: string,
}

export function TextDiv ({ children, fontSize, textAlign, maxWidth, ...props }: TextDivProps) {
  return <div className={styles.textDiv} style={{
    fontSize: fontSize,
    textAlign: textAlign,
    maxWidth: maxWidth
  }} {...props}>
    {children}
  </div>
}
