import { Product } from "./product";

export type UnitType = "case" | "unit";

export interface OrderItem {
  id: string; // mirrors productData.id — stable key for localStorage CRUD
  productName: string; // mirrors productData.name — denormalized for quick display
  qty: number;
  unitType: UnitType;
  productData: Product;
}
