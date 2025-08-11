function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-600 p-6">
        <div className="max-w-md p-6 bg-white border border-red-200 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="mb-4">
            <strong>Error:</strong> {error.message}
          </p>
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  export default ErrorFallback;
  