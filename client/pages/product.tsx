import React, { useState } from "react";


const Product: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const increaseQuantity = (): void => setQuantity(q => q + 1);
  const decreaseQuantity = (): void => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = (): void => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-page fade-in">
      <header className="header slide-down">
        <div className="logo">logo</div>
        <div className="cart-icon">🛒</div>
      </header>

      <div className="product-card pop-in">
        <div className="product-image">
          <img
            src="/your-product-image.jpg"
            alt="Product"
          />
        </div>

        <h1 className="product-title">Energy Saver</h1>
        <p className="product-subtitle">25W // Packet of 4</p>
        <p className="product-price">£12.99</p>

        <div className="quantity-selector">
          <button onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>

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
      </div>
    </div>
  );
};

export default Product;
