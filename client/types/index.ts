import { z } from "zod";
import { GetProductsResponseSchema } from "../queries";

export interface Product {
  id: string;
  name: string;
  power: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  model_code: string;
  colour: string;
  img_url: string;
}

export interface GetProductResponse {
  Product: Product;
}

export interface GetProductVariables {
  id: string;
}

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;