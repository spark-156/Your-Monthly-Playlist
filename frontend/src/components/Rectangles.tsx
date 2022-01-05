import React from 'react'

interface RectanglesProps extends React.HTMLAttributes<SVGSVGElement> {}

export function Rectangles ({ onClick, ...props }: RectanglesProps) {
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

      <rect y="40" width="50" height="5" rx="2.5" fill="white"/>
      <rect y="20" width="50" height="5" rx="2.5" fill="white"/>
      <rect width="50" height="5" rx="2.5" fill="white"/>
    </svg>
}
