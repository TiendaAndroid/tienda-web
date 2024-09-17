import { Product } from "./Products";

export interface CartItemData {
  id:string;
  cart: string;
  product: Product;
  quantity: number;
}
