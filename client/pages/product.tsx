import React, { useState } from "react";
import Image from "next/image";
import Basket from "../public/basket.svg";

const Product: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [cartItems, setCartItems] = useState<number>(0);

  const [isAdded, setIsAdded] = useState<boolean>(false);

  const increaseQuantity = (): void => setQuantity(prev => prev + 1);
  const decreaseQuantity = (): void => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = (): void => {
    setIsAdded(true);
    // update cart items
    setCartItems(prev => prev + quantity)
    // mock API call - optimistically update the cart
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-page fade-in">
      <header className="header slide-down">
        <div className="logo">logo</div>
        <div className="cart-icon">
          <span title="Basket items">{cartItems}</span>
          <Image src={Basket} width="20" height="20" alt="Basket" />
        </div>
      </header>

      <div className="product-card pop-in">
        <section className="product-card-header">
          <div className="product-image">
            <img
              src="/bulb.png"
              alt="Product"
            />
          </div>

          <h1 className="product-title">Energy Saving light bulb</h1>
          <p className="product-subtitle">25W // Packet of 4</p>
          <div className="quantity-selector">
            <p className="product-price">£12.99</p>
            <span className="quantity-controls">
            <button onClick={decreaseQuantity}>-</button>
            <span className="quantity" title="Current quantity"><abbr>Qty</abbr><span>{quantity}</span></span>
            <button onClick={increaseQuantity}>+</button></span>
          </div>
        </section>
        <button className="add-to-cart" onClick={handleAddToCart}>
          {isAdded ? 'Added!' : 'Add to cart'}
        </button>

        <section className="description fade-in-delay">
          <h2>Description</h2>
          <p>
            No wait around warm start and flicker-free features make for a great all-rounder.
          </p>
        </section>

        <section className="specifications fade-in-delay">
          <h2>Specifications</h2>
          <ul>
            <li><strong>Brand:</strong> ExampleBrand</li>
            <li><strong>Item weight (g):</strong> 77</li>
            <li><strong>Dimensions (cm):</strong> 12.6 x 6.2 x 6.2</li>
            <li><strong>Item Model number:</strong> X1234</li>
            <li><strong>Colour:</strong> Cool daylight</li>
          </ul>
        </section>


        <section className="footer fade-in-delay">
          <p>Octopus Energy Ltd is a company registered in England and Wales.
            Registered number: 09263424.
            Registered office 33 Holborn London ECN2HT .
            Trading office 20-24 Broadwick Street. London W1F BHT.</p>
        </section>
      </div>
    </div>
  );
};

export default Product;
