import { describe, test, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOrderList } from "./useOrderList";
import { OrderItem } from "../constants/types/orderItem";

const makeItem = (id: string, qty = 1): OrderItem => ({
  id,
  productName: `Product ${id}`,
  qty,
  unitType: "case",
  productData: {
    id,
    name: `Product ${id}`,
    category: "Cat",
    vendorID: "RESTAURANT_DEPOT",
  },
});

beforeEach(() => {
  localStorage.clear();
});

describe("useOrderList", () => {
  test("initialises with an empty list when localStorage is empty", () => {
    const { result } = renderHook(() => useOrderList());
    expect(result.current.orderList).toEqual([]);
  });

  test("initialises from existing localStorage data", () => {
    const existing = [makeItem("a"), makeItem("b")];
    localStorage.setItem("orderList", JSON.stringify(existing));
    const { result } = renderHook(() => useOrderList());
    expect(result.current.orderList).toEqual(existing);
  });

  test("addItem appends an item and persists to localStorage", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("x")));
    expect(result.current.orderList).toHaveLength(1);
    expect(result.current.orderList[0].id).toBe("x");
    expect(JSON.parse(localStorage.getItem("orderList")!)).toHaveLength(1);
  });

  test("addItem does not add a duplicate", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("x")));
    act(() => result.current.addItem(makeItem("x")));
    expect(result.current.orderList).toHaveLength(1);
  });

  test("updateItem changes qty and persists", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("x", 1)));
    act(() => result.current.updateItem("x", { qty: 5 }));
    expect(result.current.orderList[0].qty).toBe(5);
    const stored = JSON.parse(
      localStorage.getItem("orderList")!,
    ) as OrderItem[];
    expect(stored[0].qty).toBe(5);
  });

  test("updateItem changes unitType and persists", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("x")));
    act(() => result.current.updateItem("x", { unitType: "unit" }));
    expect(result.current.orderList[0].unitType).toBe("unit");
  });

  test("updateItem does not affect other items", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("a")));
    act(() => result.current.addItem(makeItem("b")));
    act(() => result.current.updateItem("a", { qty: 9 }));
    expect(result.current.orderList.find((i) => i.id === "b")?.qty).toBe(1);
  });

  test("removeItem removes the correct item and persists", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("a")));
    act(() => result.current.addItem(makeItem("b")));
    act(() => result.current.removeItem("a"));
    expect(result.current.orderList).toHaveLength(1);
    expect(result.current.orderList[0].id).toBe("b");
    const stored = JSON.parse(
      localStorage.getItem("orderList")!,
    ) as OrderItem[];
    expect(stored).toHaveLength(1);
  });

  test("clearList empties the list and removes localStorage key", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("a")));
    act(() => result.current.clearList());
    expect(result.current.orderList).toEqual([]);
    expect(localStorage.getItem("orderList")).toBeNull();
  });

  test("isInList returns true for an added item", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("a")));
    expect(result.current.isInList("a")).toBe(true);
  });

  test("isInList returns false for an item not in the list", () => {
    const { result } = renderHook(() => useOrderList());
    expect(result.current.isInList("not-here")).toBe(false);
  });

  test("isInList returns false after item is removed", () => {
    const { result } = renderHook(() => useOrderList());
    act(() => result.current.addItem(makeItem("a")));
    act(() => result.current.removeItem("a"));
    expect(result.current.isInList("a")).toBe(false);
  });
});
