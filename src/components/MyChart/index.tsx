import { Chart } from "regraph"
import useData from "../../hooks/api/useData"
import { arrayToMap } from "../../helpers/arrayHelper"
import { useMemo, useRef } from "react"
const colors = [
  "#f15d5b",
  "#00423e",
  "#2dcda8",
  "#f5ed5d",
  "#e8ae31",
  "#e8ae31",
  "#7078c4",
  "#784bab",
  "#d67bdb",
  "#d492aa",
  "#e6413e",
]
function MyChart() {
  const { data } = useData()
  // const [maxValue , setMaxValue ] = useState<number>(0)
  const max = useRef<number>(0)
  const maxNodes = useRef<[number, number] | null>(null)
  const nodes = useMemo(
    () =>
      arrayToMap(
        data?.nodes ?? [],
        (_d, i) => `node${i}`,
        (d, i) => ({
          color: colors[d.group],
          size:
            (maxNodes && maxNodes.current && i === maxNodes?.current[0]) ||
            (maxNodes && maxNodes.current && i === maxNodes?.current[1])
              ? 7
              : 3,
          label: {
            text: d.name,
            backgroundColor: "transparent",
          },
        })
      ),
    [data?.nodes]
  )
  console.log({ data })
  const links = useMemo(
    () =>
      arrayToMap(
        data?.links ?? [],
        (_d, i) => `link${i}`,
        (d, i) => {
          if (max.current < d.value) {
            max.current = d.value
            maxNodes.current = [d.source, d.target]
          }
          max.current = Math.max(max.current, d.value)
          return {
            id1: `node${d.source}`,
            id2: `node${d.target}`,
            width: d.value,
            color: "rgb(4, 129, 112)",
          }
        }
      ),
    [data?.links]
  )
  console.log({ max: max.current, maxNodes })
  const newItems = Object.assign({}, { ...nodes, ...links })
  console.log({ newItems })
  return (
    <>
      <Chart items={newItems} />
    </>
  )
}
export default MyChart
