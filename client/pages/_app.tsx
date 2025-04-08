import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { useCart } from '../hooks';
import "../styles/globals.css";
import './product.css';
import { initializeApollo } from '../apolloClient';
import Layout from "../components/layout";
import '../styles/globals.css';

const apolloClient = initializeApollo();

function MyApp({ Component, pageProps }: AppProps) {
  const { cartItems, updateCart } = useCart();

  const handleUpdate = (quantity: number): void => {
    updateCart(quantity);
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Layout cartItems={cartItems}>
        <Component {...pageProps} updateCart={handleUpdate} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
