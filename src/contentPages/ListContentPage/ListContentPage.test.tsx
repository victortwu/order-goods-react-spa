import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ListsContentPage } from "./ListContentPage";
import { OrderItem } from "../../constants/types/orderItem";

// --- Mocks ---

const mockOrderList: OrderItem[] = [];
const mockUpdateItem = vi.fn();
const mockRemoveItem = vi.fn();
const mockClearList = vi.fn();
const mockMutate = vi.fn();
const mockReset = vi.fn();

vi.mock("../../hooks/useOrderList", () => ({
  useOrderList: () => ({
    orderList: mockOrderList,
    updateItem: mockUpdateItem,
    removeItem: mockRemoveItem,
    clearList: mockClearList,
    addItem: vi.fn(),
    isInList: vi.fn(),
  }),
}));

vi.mock("../../api/hooks/useCreateList", () => ({
  useCreateList: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    reset: mockReset,
  }),
}));

vi.mock("../../contexts/NotificationContext/NotificationContext", () => ({
  useNotifications: () => ({
    flashItems: [],
    startTracking: vi.fn(),
    addFlash: vi.fn(),
  }),
}));

// --- Helpers ---

const makeItem = (id: string, qty = 2): OrderItem => ({
  id,
  productName: `Product ${id}`,
  qty,
  unitType: "case",
  productData: {
    id,
    name: `Product ${id}`,
    category: "General",
    vendorID: "RESTAURANT_DEPOT",
  },
});

const setOrderList = (items: OrderItem[]) => {
  mockOrderList.length = 0;
  mockOrderList.push(...items);
};

// --- Tests ---

describe("<ListsContentPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setOrderList([]);
  });

  test("shows empty state when order list is empty", () => {
    // arrange & act
    render(<ListsContentPage />);

    // assert
    expect(
      screen.getByText("No items added yet. Go to Goods to build your order."),
    ).toBeInTheDocument();
  });

  test("renders items when order list has items", () => {
    // arrange
    setOrderList([makeItem("a"), makeItem("b")]);

    // act
    render(<ListsContentPage />);

    // assert
    expect(screen.getByText(/Product a/)).toBeInTheDocument();
    expect(screen.getByText(/Product b/)).toBeInTheDocument();
  });

  test("submit button is disabled when list is empty", () => {
    // arrange & act
    render(<ListsContentPage />);

    // assert
    expect(screen.getByText("Submit Order").closest("button")).toBeDisabled();
  });

  test("submit button calls mutate with order list", async () => {
    // arrange
    const items = [makeItem("a")];
    setOrderList(items);
    const user = userEvent.setup();

    // act
    render(<ListsContentPage />);
    await user.click(screen.getByText("Submit Order"));

    // assert
    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith(
      { list: items },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });

  test("clear all button opens confirmation modal", async () => {
    // arrange
    setOrderList([makeItem("a")]);
    const user = userEvent.setup();

    // act
    render(<ListsContentPage />);
    const clearButtons = screen.getAllByText("Clear All");
    await user.click(clearButtons[0]);

    // assert
    expect(
      screen.getByText(
        "Are you sure you want to clear all items from your order list? This action cannot be undone.",
      ),
    ).toBeInTheDocument();
  });

  test("confirming clear all calls clearList and closes modal", async () => {
    // arrange
    setOrderList([makeItem("a")]);
    const user = userEvent.setup();

    // act
    render(<ListsContentPage />);
    const clearButtons = screen.getAllByText("Clear All");
    await user.click(clearButtons[0]);
    // Modal's Clear All button is the last one
    const allClearButtons = screen.getAllByText("Clear All");
    await user.click(allClearButtons[allClearButtons.length - 1]);

    // assert
    expect(mockClearList).toHaveBeenCalledTimes(1);
  });

  test("cancel in clear modal does not call clearList", async () => {
    // arrange
    setOrderList([makeItem("a")]);
    const user = userEvent.setup();

    // act
    render(<ListsContentPage />);
    const clearButtons = screen.getAllByText("Clear All");
    await user.click(clearButtons[0]);
    await user.click(screen.getByText("Cancel"));

    // assert
    expect(mockClearList).not.toHaveBeenCalled();
  });

  test("displays total package count in header", () => {
    // arrange
    setOrderList([makeItem("a", 3), makeItem("b", 5)]);

    // act
    render(<ListsContentPage />);

    // assert
    expect(screen.getByText(/8 pkgs/)).toBeInTheDocument();
  });
});
