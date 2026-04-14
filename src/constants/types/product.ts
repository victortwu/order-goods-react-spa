export type VendorID =
  | "RESTAURANT_DEPOT"
  | "WESTCOAST_PITA"
  | "FRANZ_BAKERY"
  | "AMAZON"
  | "INSTACART_US_FOODS"
  | "UNKNOWN";

export interface Product {
  id: string;
  name: string;
  category: string;
  vendorID: VendorID;
  upc?: string;
  vendorProductName?: string;
  description?: string;
  tags?: string[];
  hide?: boolean;
}
