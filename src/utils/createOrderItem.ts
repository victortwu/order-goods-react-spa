import { OrderItem } from "../constants/types/orderItem";
import { Product } from "../constants/types/product";

/**
 * Creates an OrderItem from a Product.
 * This is the single place that knows how Product maps to OrderItem —
 * if Product's schema changes, fix it here only.
 */
export const createOrderItem = (product: Product): OrderItem => ({
  id: product.id,
  productName: product.name,
  qty: 1,
  unitType: "case",
  productData: product,
});
