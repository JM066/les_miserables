import { useSuspenseQuery } from "@tanstack/react-query"
export interface DataResponse {
  nodes: { name: string; group: number }[]
  links: { source: number; target: number; value: number }[]
}
const useMiserables = () => {
  const queryKey = ["miserables"]

  return useSuspenseQuery<DataResponse>({
    queryKey,
    queryFn: async () => {
      const response = await fetch("https://bost.ocks.org/mike/miserables/miserables.json")
      if (!response.ok) {
        throw new Error("Network response failed")
      }
      return response.json()
    },
  })
}

export default useMiserables
