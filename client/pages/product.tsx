import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../queries';
import ProductCard from '../components/productCard';
import Layout from "../components/layout";
import Header from '../components/header';
import Footer from '../components/footer';
import Error from "../components/error";
import { GetProductResponse, GetProductVariables } from "../types";


const ProductPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<number>(0);

  const handleUpdate = (quantity: number): void => {
    setCartItems(prev => prev + quantity);
  }

  const { loading, error, data, refetch } = useQuery<GetProductResponse, GetProductVariables>(
    GET_PRODUCTS,
    {
      variables: { id: '1' },
      fetchPolicy: 'cache-first', // Use cache by default, and fetch fresh data only if cache is not available
    }
  );

  const handleRetry = () => {
    refetch(); // the query uses the same variables that it used in its previous execution.
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching product:', error);
    return <Error error={error} handleRetry={handleRetry} />;
  }

  return (
    <Layout>
      <div className="product-page fade-in">
        <Header cartItems={cartItems} />
        <ProductCard data={data.Product} handleUpdate={handleUpdate} />
        <Footer />
      </div>
    </Layout>

  );
};

export default ProductPage;
