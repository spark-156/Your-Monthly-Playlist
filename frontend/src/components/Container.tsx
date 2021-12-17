import React from 'react'
import { Colors } from '../lib/constants'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string,
  alignSelfCenter?: boolean,
  disablePadding?: boolean,
}

export function Container ({ children, maxWidth = '1000px', alignSelfCenter = false, disablePadding = false, ...props }: ContainerProps) {
  return <div style={{
    backgroundColor: Colors.Black,
    color: Colors.White,
    padding: disablePadding ? undefined : '15px',
    width: '100%',
    height: '100%',
    maxWidth: maxWidth,
    margin: alignSelfCenter ? '0 auto' : undefined
  }} {...props}>
    {children}
  </div>
}
