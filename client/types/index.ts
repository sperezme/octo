import { z } from "zod";
import { GetProductsResponseSchema } from "../queries";

export interface GetProductVariables {
  id: string;
}

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;