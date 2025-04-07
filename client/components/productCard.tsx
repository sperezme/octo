import React, { useState } from "react";
import { Product } from "../types";

interface ProductProps {
  data: Product;
  handleUpdate: (quantity: number) => void;
}
const ProductCard: React.FC<ProductProps> = ({ data, handleUpdate }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const [isAdded, setIsAdded] = useState<boolean>(false);

  const increaseQuantity = (): void => setQuantity(prev => prev + 1);
  const decreaseQuantity = (): void => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = (): void => {
    setIsAdded(true);
    // update cart items
    handleUpdate(quantity)
    // mock API call 
    setTimeout(() => setIsAdded(false), 2000);
  };

  const {
    name,
    power,
    description,
    price,
    quantity: packSize,
    brand,
    weight,
    height,
    width,
    length,
    model_code,
    colour,
    img_url } = data;

  return (

    <div className="product-card pop-in">
      <section className="product-card-header">
        <div className="product-image">
          <img
            src={img_url}
            alt="Product"
          />
        </div>

        <h1 className="product-title">{name}</h1>
        <p className="product-subtitle">{power} // Packet of {packSize}</p>
        <div className="quantity-selector">
          <p className="product-price">{price}</p>
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
          {description}
        </p>
      </section>

      <section className="specifications fade-in-delay">
        <h2>Specifications</h2>
        <ul>
          <li><strong>Brand:</strong> {brand}</li>
          <li><strong>Item weight (g):</strong> {weight} </li>
          <li><strong>Dimensions (cm):</strong> {height} x {width} x {length}</li>
          <li><strong>Item Model number:</strong>{model_code}</li>
          <li><strong>Colour:</strong> {colour}</li>
        </ul>
      </section>
    </div>
  );
};

export default ProductCard;