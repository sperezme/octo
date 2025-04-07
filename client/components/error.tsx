import { ApolloError } from '@apollo/client';

interface ErrorProps {
    error: ApolloError
    handleRetry: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, handleRetry }) => {
    return <div>
        <p>Oops! Something went wrong while fetching the product data.</p>
        <p>Error: {error.message}</p>
        {error.networkError ? (
            <div>
                <p>It looks like there was a problem with the network. Please try again.</p>
                <button onClick={handleRetry}>Retry</button>
            </div>
        ) : (
            <div>
                <p>Please contact support if the issue persists.</p>
            </div>
        )}
    </div>
}

export default Error;