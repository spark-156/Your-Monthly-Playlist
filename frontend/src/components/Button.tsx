import React from 'react'
import { Colors, Fonts } from '../lib/constants'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

export function Button ({ onClick, children }: ButtonProps) {
  return <button onClick={onClick} style={{
    width: '200px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: Colors.Green,
    color: Colors.White,
    fontFamily: Fonts.Default,
    border: 'none'
  }}>
    {children}
  </button>
}
