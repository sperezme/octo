import { AppProps } from 'next/app'
import "../styles/globals.css";
import './product.css';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../apolloClient';
import '../styles/globals.css';

const apolloClient = initializeApollo();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
