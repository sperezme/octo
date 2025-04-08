import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../queries';
import ProductCard from '../components/productCard';
import Header from '../components/header';
import Footer from '../components/footer';
import Error from "../components/error";
import { GetProductResponse, GetProductVariables } from "../types";
import { useCart } from "../hooks";
// import { useRenderCount } from "../hooks";

interface ProductPageProps {
  updateCart: (quantity: number) => void;
  cartItems: number;
}

const ProductPage: React.FC<ProductPageProps> = ({updateCart}) => {
  // useRenderCount("CARD-PAGE");
  // useRenderCount is a custom hook to track the number of renders for debugging purposes


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
    <div className="product-page fade-in">
      <ProductCard data={data.Product} handleUpdate={updateCart} />
    </div>
  );
};

export default ProductPage;
