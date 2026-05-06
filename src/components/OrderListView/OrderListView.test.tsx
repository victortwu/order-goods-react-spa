import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { OrderListView } from "./OrderListView";
import { OrderItem } from "../../constants/types/orderItem";

// --- Helpers ---

const makeItem = (id: string, qty = 3, unitType = "case"): OrderItem => ({
  id,
  productName: `Product ${id}`,
  qty,
  unitType: unitType as OrderItem["unitType"],
  productData: {
    id,
    name: `Product ${id}`,
    category: "General",
    vendorID: "RESTAURANT_DEPOT",
  },
});

// --- Tests ---

describe("<OrderListView />", () => {
  const mockOnUpdate = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all items with name and quantity", () => {
    // arrange
    const items = [makeItem("a", 2), makeItem("b", 5, "unit")];

    // act
    render(
      <OrderListView items={items} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />,
    );

    // assert
    expect(screen.getByText(/Product a/)).toBeInTheDocument();
    expect(screen.getByText(/2 case/)).toBeInTheDocument();
    expect(screen.getByText(/Product b/)).toBeInTheDocument();
    expect(screen.getByText(/5 units/)).toBeInTheDocument();
  });

  test("renders edit button for each item", () => {
    // arrange
    const items = [makeItem("a"), makeItem("b")];

    // act
    render(
      <OrderListView items={items} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />,
    );

    // assert
    expect(screen.getByLabelText("Edit Product a")).toBeInTheDocument();
    expect(screen.getByLabelText("Edit Product b")).toBeInTheDocument();
  });

  test("clicking edit opens modal with item details", async () => {
    // arrange
    const items = [makeItem("a", 4)];
    const user = userEvent.setup();

    // act
    render(
      <OrderListView items={items} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />,
    );
    await user.click(screen.getByLabelText("Edit Product a"));

    // assert
    expect(screen.getByText("Update item")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("clicking Done closes the modal", async () => {
    // arrange
    const items = [makeItem("a")];
    const user = userEvent.setup();

    // act
    render(
      <OrderListView items={items} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />,
    );
    await user.click(screen.getByLabelText("Edit Product a"));
    await user.click(screen.getByText("Done"));

    // assert
    expect(screen.queryByText("Update item")).not.toBeInTheDocument();
  });

  test("remove action calls onRemove and closes modal", async () => {
    // arrange
    const items = [makeItem("a")];
    const user = userEvent.setup();

    // act
    render(
      <OrderListView items={items} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />,
    );
    await user.click(screen.getByLabelText("Edit Product a"));
    // ButtonGroup icon buttons are accessed by their aria-label text
    const removeButton = screen.getByRole("button", { name: "Remove from list" });
    await user.click(removeButton);

    // assert
    expect(mockOnRemove).toHaveBeenCalledWith("a");
    expect(screen.queryByText("Update item")).not.toBeInTheDocument();
  });
});
