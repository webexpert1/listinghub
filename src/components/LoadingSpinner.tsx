export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500" role="status" aria-label="Loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}