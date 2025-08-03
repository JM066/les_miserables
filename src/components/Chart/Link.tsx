interface LinkProps {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  stroke?: string
  strokeWidth?: number
}


export function Link({ 
  id, 
  x1, 
  y1, 
  x2, 
  y2, 
  stroke = "gray", 
  strokeWidth = 1 
}: LinkProps) {
  return (
    <line
      key={id}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  )
}

export default Link
