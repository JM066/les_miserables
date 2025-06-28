import type { FallbackProps } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h2 className="fs-4">Something went wrong.</h2>
      <details style={{ whiteSpace: "pre-wrap" }}>
        {error.error.message}
        <br />
      </details>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  )
}
export default ErrorFallback
