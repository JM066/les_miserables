import { useQuery } from "@tanstack/react-query"
import type { Miserables } from "../../types"

const useMiserables = () => {
  const queryKey = ["miserables"]

  return useQuery<Miserables, Error>({
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
