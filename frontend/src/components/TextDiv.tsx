import React from 'react'
import { Colors, Fonts } from '../lib/constants'

interface TextDivProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
  maxWidth?: string,
}

export function TextDiv ({ children, fontSize = '16px', textAlign = 'left', maxWidth = '100%', ...props }: TextDivProps) {
  return <div style={{
    color: Colors.White,
    fontFamily: Fonts.Default,
    fontSize: fontSize,
    textAlign: textAlign,
    maxWidth: maxWidth
  }} {...props}>
    {children}
  </div>
}
