import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { ErrorBoundary } from '../components/errorBoundary';
import { initializeApollo } from '../apolloClient';
import { useCart } from '../hooks';
import Layout from "../components/layout";
import './product.css';

const apolloClient = initializeApollo();

function MyApp({ Component, pageProps }: AppProps) {
  const { cartItems, updateCart, clearCart } = useCart();

  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <Layout cartItems={cartItems} clearCart={clearCart}>
          <Component {...pageProps} updateCart={updateCart} />
        </Layout>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
