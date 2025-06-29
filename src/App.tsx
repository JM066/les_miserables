import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ChartContainer from "./components/ChartContainer"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./components/ErrorFallback"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ChartContainer />
        </ErrorBoundary>
      </div>
    </QueryClientProvider>
  )
}

export default App
