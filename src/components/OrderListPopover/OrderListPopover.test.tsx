import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { OrderListPopover } from "./OrderListPopover";

// --- Mock ---

const mockOrderList: { id: string; productName: string; qty: number }[] = [];

vi.mock("../../hooks/useOrderList", () => ({
  useOrderList: () => ({
    orderList: mockOrderList,
  }),
}));

// --- Helpers ---

const setOrderList = (items: { id: string; productName: string; qty: number }[]) => {
  mockOrderList.length = 0;
  mockOrderList.push(...items);
};

// --- Tests ---

describe("<OrderListPopover />", () => {
  test("renders nothing when order list is empty", () => {
    // arrange
    setOrderList([]);

    // act
    const { container } = render(<OrderListPopover />);

    // assert
    expect(container.innerHTML).toBe("");
  });

  test("renders item count when order list has items", () => {
    // arrange
    setOrderList([
      { id: "a", productName: "Flour", qty: 2 },
      { id: "b", productName: "Sugar", qty: 1 },
    ]);

    // act
    render(<OrderListPopover />);

    // assert
    expect(screen.getByText("Items: 2")).toBeInTheDocument();
  });
});
