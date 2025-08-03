import { arrayToMap } from "../../helpers/arrayHelper"
import { useCallback, useMemo } from "react"
import { normalizeValue } from "../../helpers/normalizeHelper"
import useMiserables from "../../hooks/api/useMiserables"
import Chart from "../Chart"
import type { 
  NodeData, 
  LinkData, 
  RelationshipMaps, 
  ConnectionCounts 
} from "../../types"

const GROUP_COLORS = [
  "#6b9996",
  "#e6c73e",
  "#85d457",
  "#64e3bd",
  "#527cbf",
  "#e67c3e",
  "#d93687",
  "#f03a4c",
  "#f7bead",
  "#d492aa",
  "#e6413e",
]
const LINK_COLOR = "rgb(4, 129, 112)"

/**
 * Build relationship maps from link data (DIRECTIONAL for influence calculation)
 * @param nodes - Array of character nodes
 * @param links - Array of relationship links
 * @returns Object containing relationship maps and character list
 */

function buildRelationshipData(
  nodes: NodeData[] = [],
  links: LinkData[] = []
): RelationshipMaps {
  const relMaps: Record<string, string[]> = {}
  const relList: string[] = []

  for (const link of links) {
    const fromNode = nodes[link.source]
    const toNode = nodes[link.target]
    if (!fromNode || !toNode) continue

    const influencer = fromNode.name
    const influenced = toNode.name
    
    // Only add one-directional relationships: influencer -> influenced
    if (relMaps[influencer]) {
      relMaps[influencer].push(influenced)
    } else {
      relMaps[influencer] = [influenced]
      relList.push(influencer)
    }
  }
  
  return { relMaps, relList }
}

/**
 * Calculate connection counts for all characters in the relationship map
 * @param relMaps - Map of character to their direct connections
 * @param relList - List of all characters with connections
 * @param calculateConnections - Function to calculate connections for a character
 * @returns Object with character count map and array of all counts
 */
function calculateAllConnectionCounts(
  relMaps: Record<string, string[]>,
  relList: string[], 
  calculateConnections: (contacts: string[], visited: Set<string>) => number
): ConnectionCounts {
  const countMap: Record<string, number> = {}
  const counts: number[] = []

  for (const contact of relList) {
    const visited = new Set<string>()
    const count = calculateConnections(relMaps[contact] || [], visited)

    // Prevent duplicate counting of the same character
    if (!countMap[contact]) {
      countMap[contact] = count
      counts.push(count)
    }
  }
  
  return { countMap, counts }
}

function createChartLinks(links: LinkData[] = []) {
  return arrayToMap(
    links,
    (_l, i) => `link${i}`,
    (l) => ({
      id1: `node${l.source}`,
      id2: `node${l.target}`,
      width: l.value,
      color: LINK_COLOR,
    })
  )
}

/**
 * Transform node data into format expected by the Chart component
 * @param nodes - Array of raw node data from API
 * @param connectionCounts - Map of character names to their connection counts
 * @param min - Minimum connection count for normalization
 * @param max - Maximum connection count for normalization
 * @returns Transformed nodes for Chart component
 */
function createChartNodes(
  nodes: NodeData[] = [],
  connectionCounts: Record<string, number>,
  min: number,
  max: number
) {
  return arrayToMap(
    nodes,
    (_n, i) => `node${i}`,
    (n) => ({
      color: GROUP_COLORS[n.group],
      size: normalizeValue(connectionCounts[n.name], min, max, 0.1, 1.0, false),
      label: {
        text: n.name,
        backgroundColor: "transparent",
      },
    })
  )
}

function ChartContainer() {
  const { data, isLoading, error, isError } = useMiserables()


  const links = useMemo(
    () => createChartLinks(data?.links),
    [data?.links]
  )

  const relationshipData = useMemo(() => {
    return buildRelationshipData(data?.nodes, data?.links)
  }, [data?.links, data?.nodes])

  
  const calculateInfluenceReach = useCallback(
    (contacts: string[], visited: Set<string>): number => {
      if (!contacts?.length) return 0

      let totalReach = 0
      for (const person of contacts) {
        // Skip if already visited
        if (visited.has(person)) continue
        visited.add(person)

        // Count this direct contact
        totalReach += 1
        
        // Add the influence reach of this person's contacts
        const personContacts = relationshipData.relMaps[person] || []
        totalReach += calculateInfluenceReach(personContacts, visited)
      }

      return totalReach
    },
    [relationshipData.relMaps]
  )

 // Calculate connection counts for all characters.
  const connectionCounts = useMemo(() => {
    const result = calculateAllConnectionCounts(
      relationshipData.relMaps,
      relationshipData.relList,
      calculateInfluenceReach
    )
    
    console.log('Valjean', result.countMap['Valjean'])
    
    return result
  }, [relationshipData.relList, relationshipData.relMaps, calculateInfluenceReach])

 // Calculate min and max connection counts for normalization
  const [min, max] = useMemo(() => {
    return [Math.min(...connectionCounts.counts), Math.max(...connectionCounts.counts)]
  }, [connectionCounts])

  const nodes = useMemo(
    () => createChartNodes(data?.nodes, connectionCounts.countMap, min, max),
    [connectionCounts.countMap, data?.nodes, min, max]
  )

  if (isLoading) {
    return <div className="loader" />
  }

  if (isError) {
    throw new Error(error?.message || 'Failed to load character data')
  }

  return <Chart nodes={nodes} links={links} />
}

export default ChartContainer
