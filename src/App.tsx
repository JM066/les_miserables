import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ChartContainer from "./components/ChartContainer"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./components/ErrorFallback"

const queryClient = new QueryClient()

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div className="loader"></div>}>
          <div className="flex flex-col items-center justify-center h-screen w-screen">
            <ChartContainer />
          </div>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
