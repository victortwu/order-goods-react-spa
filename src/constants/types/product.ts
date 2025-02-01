export interface Product {
  id: string;
  category: string;
  name: string;
  vendorID: string;
  upc?: string;
  vendorProductName?: string;
  description?: string;
  tags?: string[];
  hide?: boolean;
  qty?: number;
  unitType?: "case" | "unit";
}
