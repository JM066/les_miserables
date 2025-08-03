interface NodeProps {
  id: string
  x: number
  y: number
  radius: number
  color: string
  label: string
}


export function Node({ id, x, y, radius, color, label }: NodeProps) {
  return (
    <g key={id}>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={color}
        stroke="black"
        strokeWidth="1"
      />
      <text
        x={x}
        y={y + radius + 12}
        textAnchor="middle"
        fontSize="10"
      >
        {label}
      </text>
    </g>
  )
}

export default Node
