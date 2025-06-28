import { useQuery } from "@tanstack/react-query"
export interface DataResponse {
  nodes: { name: string; group: number }[]
  links: { source: number; target: number; value: number }
}
const useData = () => {
  const queryKey = ["data"]

  return useQuery<DataResponse>({
    queryKey,
    queryFn: async () => {
      const response = await fetch("https://bost.ocks.org/mike/miserables/miserables.json")
      console.log({ response })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
  })
}

export default useData
