import { useMemo } from 'react'
import Node from './Node'
import Link from './Link'

interface ChartNode {
  color: string
  size: number
  label: {
    text: string
    backgroundColor: string
  }
}

interface ChartLink {
  id1: string
  id2: string
  width: number
  color: string
}

interface ChartProps {
  nodes: Record<string, ChartNode>
  links: Record<string, ChartLink>
}

export function Chart({ nodes, links }: ChartProps) {
  const nodeEntries = useMemo(() => Object.entries(nodes), [nodes])
  const linkEntries = useMemo(() => Object.entries(links), [links])

  const getNodePosition = (index: number) => {
    const centerX = 300
    const centerY = 250
    const radius = 150
    const angle = (index * 2 * Math.PI) / nodeEntries.length
    
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    }
  }

  return (
    <div className="w-full h-screen bg-white p-4">
      <h1 className="text-xl font-bold mb-4">Les Misérables Network</h1>
      <svg 
        className="w-full h-full border border-gray-300" 
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {linkEntries.map(([linkId, link]) => {
            const linkData = link as ChartLink
            const node1Index = parseInt(linkData.id1.replace('node', ''))
            const node2Index = parseInt(linkData.id2.replace('node', ''))
            
            const pos1 = getNodePosition(node1Index)
            const pos2 = getNodePosition(node2Index)

            return (
              <Link
                key={linkId}
                id={linkId}
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
              />
            )
          })}
        </g>
        <g>
          {nodeEntries.map(([nodeId, node], index) => {
            const nodeData = node as ChartNode
            const pos = getNodePosition(index)
            const radius = Math.max(5, nodeData.size * 10)

            return (
              <Node
                key={nodeId}
                id={nodeId}
                x={pos.x}
                y={pos.y}
                radius={radius}
                color={nodeData.color}
                label={nodeData.label.text}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default Chart
