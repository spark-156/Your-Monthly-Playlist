import React from 'react'
import { Colors, Fonts } from '../lib/constants'

interface TitleDivProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string,
  textAlign?: 'left' | 'center' | 'right',
}

export function TitleDiv ({ children, fontSize = '30px', textAlign = 'left', ...props }: TitleDivProps) {
  return <div style={{
    color: Colors.White,
    fontFamily: Fonts.Title,
    fontSize: fontSize,
    textAlign: textAlign
  }} {...props}>
    {children}
  </div>
}
