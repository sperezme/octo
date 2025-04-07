import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:3001/graphql',  
    cache: new InMemoryCache(),
  });
};

// Apollo Client with SSR (Server-Side Rendering), we will need to create an instance of it on each request
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const initializeApollo = () => {

  if (typeof window === 'undefined') {
    return createApolloClient(); // Return a new client instance for SSR
  }

  // On the client-side, use a singleton Apollo Client instance
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }

  return apolloClient;
};
