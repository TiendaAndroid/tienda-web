// types.ts
export interface Product {
  id: string;
  price: number;
  color: string[];
  name: string;
  description: string;
  discount: number;
  material: string[];
  size: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: { id: number; url: string }[];
}
