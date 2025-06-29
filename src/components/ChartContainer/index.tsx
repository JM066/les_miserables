import { Chart } from "regraph"
import { arrayToMap } from "../../helpers/arrayHelper"
import { useCallback, useMemo } from "react"
import { normalizeValue } from "../../helpers/normalizeHelper"
import useMiserables from "../../hooks/api/useMiserables"

const COLORS = [
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

function ChartContainer() {
  const { data, isLoading, error, isError } = useMiserables()

  const links = useMemo(
    () =>
      arrayToMap(
        data?.links ?? [],
        (_d, i) => `link${i}`,
        (d) => ({
          id1: `node${d.source}`,
          id2: `node${d.target}`,
          width: d.value,
          color: "rgb(4, 129, 112)",
        })
      ),
    [data?.links]
  )

  const connection = useMemo(() => {
    const nodes = data?.nodes ?? []
    const links = data?.links ?? []

    const relMaps: Record<string, string[]> = {}
    const relList: string[] = []

    for (const link of links) {
      const fromNode = nodes[link.source]
      const toNode = nodes[link.target]
      if (!fromNode || !toNode) continue

      const person = fromNode.name
      const related = toNode.name
      if (relMaps[person]) {
        relMaps[person].push(related)
      } else {
        relMaps[person] = [related]
        relList.push(person)
      }
    }
    return { relMaps, relList }
  }, [data?.links, data?.nodes])

  const relatedConnections = useCallback(
    (contacts: string[], added: Set<string>): number => {
      if (!contacts?.length) return 0

      let count = 0
      for (const id of contacts) {
        if (added.has(id)) continue
        added.add(id)

        const contact = connection.relMaps[id]
        count += 1 + relatedConnections(contact, added)
      }

      return count
    },
    [connection.relMaps]
  )

  const connectionCounts = useMemo(() => {
    const countMap: Record<string, number> = {}
    const cacheMap: Record<string, string[]> = {}
    const counts: number[] = []

    while (connection.relList.length > 0) {
      const contact = connection.relList.pop()
      if (!contact) continue

      const visited = new Set<string>()
      const count = relatedConnections(connection.relMaps[contact], visited)
      cacheMap[contact] = Array.from(visited)

      if (!countMap[contact]) {
        countMap[contact] = count
        counts.push(count)
      }
    }
    return { countMap, counts }
  }, [connection.relList, connection.relMaps, relatedConnections])

  const [min, max] = useMemo(() => {
    return [Math.min(...connectionCounts.counts), Math.max(...connectionCounts.counts)]
  }, [connectionCounts])

  const nodes = useMemo(
    () =>
      arrayToMap(
        data?.nodes ?? [],
        (_d, i) => `node${i}`,
        (d) => {
          return {
            color: COLORS[d.group],
            size: normalizeValue(connectionCounts.countMap[d.name], min, max),
            label: {
              text: d.name,
              backgroundColor: "transparent",
            },
          }
        }
      ),
    [connectionCounts.countMap, data?.nodes, min, max]
  )

  const items = { ...nodes, ...links }

  if (isLoading) return <div className="loader" />

  if (isError) throw new Error(error.message)

  return <Chart items={items} />
}
export default ChartContainer
