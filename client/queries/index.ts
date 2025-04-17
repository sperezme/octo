import { gql } from '@apollo/client';
import { z } from 'zod';

export const GET_PRODUCTS = gql`
  query getProducts($id: ID!) {
    Product(id: $id) {
      id
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      model_code
      colour
      img_url
    }
  }
`;

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  power: z.string().nullable(),    
  description: z.string().nullable(),
  price: z.number(),
  quantity: z.number(),
  brand: z.string().nullable(),
  weight: z.number().nullable(),
  height: z.number().nullable(),
  width: z.number().nullable(),
  length: z.number().nullable(),
  model_code: z.string().nullable(),
  colour: z.string().nullable(),
  img_url: z.string().nullable(),
});

export const GetProductsResponseSchema = z.object({
  Product: ProductSchema.nullable(), 
});