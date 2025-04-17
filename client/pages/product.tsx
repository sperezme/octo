import React from "react";
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS, GetProductsResponseSchema } from '../queries';
import ProductCard from '../components/productCard';
import Error from "../components/error";
import { GetProductResponse, GetProductVariables } from "../types";

interface ProductPageProps {
  updateCart: (quantity: number) => void;
  cartItems: number;
}

const ProductPage: React.FC<ProductPageProps> = ({ updateCart }) => {
  const handleRetry = () => {
    refetch(); // the query uses the same variables that it used in its previous execution.
  };

  const { loading, error, data, refetch } = useQuery<GetProductResponse, GetProductVariables>(
    GET_PRODUCTS,
    {
      variables: { id: '1' },
      fetchPolicy: 'cache-first', // Use cache by default, and fetch fresh data only if cache is not available
    }
  );

  const result = GetProductsResponseSchema.safeParse(data);

  if (loading) return <p>Loading...</p>;
  if (error || !result.success) {
    console.error('Error fetching product:', error);
    return <Error error={error} handleRetry={handleRetry} />;
  }
  else {

    const product = data.Product;

    return (
      <div className="product-page fade-in">
        <ProductCard data={product} handleUpdate={updateCart} />
      </div>
    );
  }
};

export default ProductPage;
