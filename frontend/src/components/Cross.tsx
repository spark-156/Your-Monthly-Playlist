import React from 'react'

interface CrossProps extends React.HTMLAttributes<SVGSVGElement> {}

export function Cross ({ onClick, ...props }: CrossProps) {
  return <svg
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    width="100%"
    height="100%"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="69.2808" height="1" transform="matrix(0.709187 -0.70502 0.704619 0.709586 0.176575 49.3732)" fill="white"/>
    <rect width="69.2808" height="1" transform="matrix(0.709187 0.70502 -0.704619 0.709586 0.690338 0.98912)" fill="white"/>
  </svg>
}
