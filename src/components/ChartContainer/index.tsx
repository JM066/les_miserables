import { Chart } from "regraph"
import { arrayToMap } from "../../helpers/arrayHelper"
import { useMemo } from "react"
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
  const { data, isLoading } = useMiserables()
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

  const values = useMemo(() => {
    const valueMap: Record<number, number> = {}
    if (!data?.links) return valueMap

    for (const { source, target, value } of data.links) {
      valueMap[source] = (valueMap[source] ?? 0) + value
      valueMap[target] = (valueMap[target] ?? 0) + value
    }
    return valueMap
  }, [data?.links])

  const [min, max] = useMemo(() => {
    const values = data?.links?.map((link) => link.value ?? 0) ?? []
    return [values.length ? Math.min(...values) : 0, values.length ? Math.max(...values) : 0]
  }, [data?.links])

  const nodes = useMemo(
    () =>
      arrayToMap(
        data?.nodes ?? [],
        (_d, i) => `node${i}`,
        (d, i) => {
          return {
            color: COLORS[d.group],
            size: normalizeValue(values[i], min, max),
            label: {
              text: d.name,
              backgroundColor: "transparent",
            },
          }
        }
      ),
    [values, data?.nodes, min, max]
  )
  const items = { ...nodes, ...links }
  if (isLoading) return <div className="loader"></div>

  return <Chart items={items} />
}
export default ChartContainer
