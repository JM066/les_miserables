import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import MyChart from "./components/MyChart"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div style={{ height: "100vh", width: "100vw" }}> */}
      <MyChart />
      {/* </div> */}
    </QueryClientProvider>
  )
}

export default App
