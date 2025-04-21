import React from "react";
import { ApolloError, useQuery } from '@apollo/client';
import { GET_PRODUCTS, GetProductsResponseSchema } from '../queries';
import ProductCard from '../components/productCard';
import Error from "../components/error";
import { GetProductsResponse, GetProductVariables } from "../types";

interface ProductPageProps {
  updateCart: (quantity: number) => void;
  cartItems: number;
}

const ProductPage: React.FC<ProductPageProps> = ({ updateCart }) => {
  const handleRetry = () => {
    refetch(); // the query uses the same variables that it used in its previous execution.
  };

  const PRODUCT_ID = '1';

  const { loading, error, data, refetch } = useQuery<GetProductsResponse, GetProductVariables>(
    GET_PRODUCTS,
    {
      variables: { id: PRODUCT_ID },
      fetchPolicy: 'cache-first', // Use cache by default, and fetch fresh data only if cache is not available
    }
  );

  const result = GetProductsResponseSchema.safeParse(data);
  if (loading) return <p>Loading...</p>;

  if (!result.data?.Product) {
    // If the product is not found (besides zod, defensively checking it)
    return <Error error={new ApolloError({ errorMessage: 'Something went wrong' })} handleRetry={handleRetry} />;
  }

  if (error || !result.success) {
    console.error('Error fetching product:', error);
    return <Error error={error} handleRetry={handleRetry} />;
  }

  return (
    <div className="product-page fade-in">
      <ProductCard data={result.data} handleUpdate={updateCart} />
    </div>
  );

};

export default ProductPage;
