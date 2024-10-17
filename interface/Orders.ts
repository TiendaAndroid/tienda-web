import { OrdersItemData } from "./OrdersItems";

export interface OrdersData {
  id: string;
  createdAt: string;
  order_items: OrdersItemData[];
  receiptUrl: string;
  paymentId: string;
  status:string;
  deliveryDate: string;
}
