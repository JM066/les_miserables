
export interface NodeData {
  name: string
  group: number
}

export interface LinkData {
  source: number
  target: number
  value: number
}

export interface Miserables {
  nodes: NodeData[]
  links: LinkData[]
}

export type RelationshipMaps = {
  relMaps: Record<string, string[]>
  relList: string[]
}

export type ConnectionCounts = {
  countMap: Record<string, number>
  counts: number[]
}

export interface ChartNode {
  color: string
  size: number
  label: {
    text: string
    backgroundColor: string
  }
}

export interface ChartLink {
  id1: string
  id2: string
  width: number
  color: string
}
