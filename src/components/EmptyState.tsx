interface EmptyStateProps {
    message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-600">{message}</p>
            <p className="text-gray-400">Try adding some products!</p>
        </div>
    );
}