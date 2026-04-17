import { describe, test, expect } from "vitest";
import { createOrderItem } from "./createOrderItem";
import { Product } from "../constants/types/product";

const mockProduct: Product = {
  id: "abc-123",
  name: "Ground Lamb",
  category: "Food COGS",
  vendorID: "RESTAURANT_DEPOT",
  upc: "20713500000",
  vendorProductName: "LAMB GROUND",
  hide: false,
};

describe("createOrderItem", () => {
  test("maps product id to OrderItem id", () => {
    expect(createOrderItem(mockProduct).id).toBe(mockProduct.id);
  });

  test("maps product name to productName", () => {
    expect(createOrderItem(mockProduct).productName).toBe(mockProduct.name);
  });

  test("sets default qty to 1", () => {
    expect(createOrderItem(mockProduct).qty).toBe(1);
  });

  test("sets default unitType to 'case'", () => {
    expect(createOrderItem(mockProduct).unitType).toBe("case");
  });

  test("stores the full product on productData", () => {
    expect(createOrderItem(mockProduct).productData).toEqual(mockProduct);
  });

  test("works with a minimal product (only required fields)", () => {
    const minimal: Product = {
      id: "min-1",
      name: "Minimal",
      category: "Cat",
      vendorID: "RESTAURANT_DEPOT",
    };
    const item = createOrderItem(minimal);
    expect(item.id).toBe("min-1");
    expect(item.productName).toBe("Minimal");
    expect(item.productData).toEqual(minimal);
  });
});
