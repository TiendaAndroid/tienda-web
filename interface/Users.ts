import { CartData } from "./Cart";
import { DirectionData } from "./Directions";
import { OrdersData } from "./Orders";

// types.ts
export interface UserData {
  id: string;
  email: string;
  name: string;
  lastName: string;
  googleId: string;
  isActive: boolean;
  role: string[];
  direction: DirectionData[];
  cart: CartData;
  orders: OrdersData[];
}
