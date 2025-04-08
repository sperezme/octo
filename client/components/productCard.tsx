import React, { useState, memo } from "react";
import Image from "next/image";
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
    handleUpdate(quantity)
    // mock API timeout
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
          <Image
            src={img_url}
            alt={`Image of ${name}`}
            width={420}
            height={500}
            loading="lazy"
            layout="intrinsic"
          />
        </div>

        <h1 className="product-title">{name}</h1>
        <p className="product-subtitle">{power} - Packet of {packSize}</p>

        <div className="quantity-selector">
          <p className="product-price">{price}</p>

          <span className="quantity-controls">
            <button
              onClick={decreaseQuantity}
              aria-label="Decrease quantity"
              title="Decrease quantity"
            >
              -
            </button>

            <span
              className="quantity"
              title="Current quantity"
              aria-live="polite"
            >
              <abbr>Qty</abbr>
              <span>{quantity}</span>
            </span>

            <button
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              title="Increase quantity"
            >
              +
            </button>
          </span>
        </div>
      </section>

      <button
        className="add-to-cart"
        onClick={handleAddToCart}
        aria-pressed={isAdded}
        aria-label={isAdded ? 'Item is already added to cart' : 'Add item to cart'}
      >
        {isAdded ? 'Added!' : 'Add to cart'}
      </button>

      <section className="description fade-in-delay">
        <h2>Description</h2>
        <p>{description}</p>
      </section>

      <section className="specifications fade-in-delay">
        <h2>Specifications</h2>
        <ul>
          <li><strong>Brand:</strong> {brand}</li>
          <li><strong>Item weight (g):</strong> {weight}</li>
          <li><strong>Dimensions (cm):</strong> {height} x {width} x {length}</li>
          <li><strong>Item Model number:</strong> {model_code}</li>
          <li><strong>Colour:</strong> {colour}</li>
        </ul>
      </section>

      <section className="footer fade-in-delay">
        <p>Octopus Energy Ltd is a company registered in England and Wales. </p>
        <p>Registered number: 09263424. Registered office: UK House, 5th floor, 164-182 Oxford Street, London, W1D 1NN.</p>
      </section>
    </div>

  );
};

export default memo(ProductCard);