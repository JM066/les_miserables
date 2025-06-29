import type { FallbackProps } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h2>Something went wrong.</h2>
      <pre style={{ whiteSpace: "normal" }} className="mb-4">
        {error.message}
        <br />
      </pre>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="bg-[#2dcda8] hover:bg-[#5ea595] px-1.5 py-1 text-white rounded-md cursor-pointer flex justify-self-end"
      >
        Try again
      </button>
    </div>
  )
}
export default ErrorFallback
