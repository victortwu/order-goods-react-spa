export interface Product {
  id: string;
  name: string;
  category: string;
  vendorID: string;
  upc?: string;
  vendorProductName?: string;
  description?: string;
  tags?: string[];
  hide?: boolean;
}
