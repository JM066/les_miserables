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
    const totalNodes = nodeEntries.length
    const centerX = 600 
    const centerY = 500 
    
    // Create multiple concentric rings to avoid overcrowding
    const nodesPerRing = Math.ceil(Math.sqrt(totalNodes)) 
    const ringIndex = Math.floor(index / nodesPerRing)
    const positionInRing = index % nodesPerRing
    
    // Vary radius based on ring (inner rings smaller, outer rings larger)
    const baseRadius = 120 + (ringIndex * 80) 
    const angleStep = (2 * Math.PI) / Math.min(nodesPerRing, totalNodes - ringIndex * nodesPerRing)
    const angle = positionInRing * angleStep
    
    // Add slight randomization to prevent perfect alignment
    const randomOffset = Math.sin(index * 0.7) * 30
    const finalRadius = baseRadius + randomOffset
    
    return {
      x: centerX + Math.cos(angle) * finalRadius,
      y: centerY + Math.sin(angle) * finalRadius
    }
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <div className="p-4 bg-gray-50">
        <h1 className="text-xl font-bold">Les Misérables Network</h1>
      </div>
      
      <div className="overflow-auto bg-white w-full h-full">
        <svg 
          className="w-full h-full min-w-[1200px] min-h-[1000px]" 
          viewBox="0 0 1200 1000" 
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
            const radius = Math.max(15, nodeData.size * 35 + 15)

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
    </div>
  )
}

export default Chart
