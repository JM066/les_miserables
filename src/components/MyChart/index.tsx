import { Chart } from "regraph"
import useData from "../../hooks/api/useData"

function MyChart() {
  const { data, isFetched } = useData()

  if (!data) return
  return (
    <>
      {data?.nodes.map((n) => (
        <Chart items={{ node: { label: { text: "hello" }, border: { color: "maroon" } } }} />
      ))}
    </>
  )
}
export default MyChart
