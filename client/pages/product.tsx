import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../queries';
import ProductCard from '../components/productCard';
import Basket from "../public/basket.svg";
import { GetProductResponse, GetProductVariables } from "../types";

const ProductPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<number>(0);

  const handleUpdate = (quantity: number): void => {
    setCartItems(prev => prev + quantity);
  }

  const { loading, error, data } = useQuery<GetProductResponse, GetProductVariables>(
    GET_PRODUCTS,
    {
      variables: { id: '1' }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-page fade-in">
      <header className="header slide-down">
        <div className="logo"><img
            src="https://static.octopuscdn.com/logos/logo.svg"
            alt="Octopus Energy Logo"
            height={20}
          /></div>
        <div className="cart-icon">
          <span title="Basket items">{cartItems}</span>
          <Image src={Basket} width="20" height="20" alt="Basket" />
        </div>
      </header>

      <ProductCard data={data.Product} handleUpdate={handleUpdate} />

      <section className="footer fade-in-delay">
        <p>Octopus Energy Ltd is a company registered in England and Wales.
          Registered number: 09263424.
          Registered office 33 Holborn London ECN2HT .
          Trading office 20-24 Broadwick Street. London W1F BHT.</p>
      </section>
    </div>
  );
};

export default ProductPage;
