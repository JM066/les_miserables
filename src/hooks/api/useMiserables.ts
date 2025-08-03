import { useQuery } from "@tanstack/react-query"
import type { Miserables } from "../../types"

const MISERABLES_API_URL = "https://bost.ocks.org/mike/miserables/miserables.json"

const useMiserables = () => {
  const queryKey = ["miserables"]

  return useQuery<Miserables, Error>({
    queryKey,
    queryFn: async (): Promise<Miserables> => {
      const response = await fetch(MISERABLES_API_URL)
      
      if (!response.ok) {
        throw new Error("Failed to fetch miserables data")
      }
      return response.json()
    },
  })
}

export default useMiserables
