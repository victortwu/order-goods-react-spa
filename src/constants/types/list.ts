import { Product } from "./product";

export interface ListItem extends Product {
  qty: number;
  unitType: "case" | "unit";
}

export interface ListPayload {
  list: ListItem[];
}
