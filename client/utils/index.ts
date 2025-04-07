import { useRef } from "react";

export function useRenderCount(componentName: string) {
  const renders = useRef(1);
  console.log(`${componentName} renders count:
  ${renders.current++}`);
}

export const sanitizeString = (input: string): string => {
  // Remove non-alphanumeric characters, for example
  return input.replace(/[^a-zA-Z0-9 ]/g, '').trim();
};

export const validatePrice = (price: number): number => {
  if (isNaN(price) || price <= 0) {
    throw new Error('Price must be a positive number');
  }
  return price;
};

export const sanitizeProductData = (data: any) => {
  if (!data || typeof data !== 'object') throw new Error('Invalid product data');

  const { id, name, price } = data;
  if (!id || !name || typeof price !== 'number') throw new Error('Invalid product data structure');

  return {
    id,
    name,
    price: price.toFixed(2)
  };
};