import { CartItemData } from "./CartItem";

export interface CartData {
  id: string;
  createdAt: string;
  cart_items: CartItemData[];
}
