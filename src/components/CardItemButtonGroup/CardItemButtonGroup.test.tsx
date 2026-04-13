import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { CardItemButtonGroup } from "./CardItemButtonGroup";
import { OrderItem } from "../../constants/types/orderItem";

const mockItem: OrderItem = {
  id: "test-id-123",
  productName: "Test Product",
  qty: 2,
  unitType: "case",
  productData: {
    id: "test-id-123",
    name: "Test Product",
    category: "Test Category",
    vendorID: "Test Vendor",
  },
};

const baseProps = {
  item: mockItem,
  stagedQty: 2,
  stagedUnitType: "case" as const,
  onStageQty: vi.fn(),
  onStageUnitType: vi.fn(),
  onUpdate: vi.fn(),
};

describe("<CardItemButtonGroup />", () => {
  test("goods mode: renders increment, decrement, unit select — no remove", () => {
    const { container } = render(
      <CardItemButtonGroup {...baseProps} isList={false} />,
    );
    const group = createWrapper(container).findButtonGroup();
    expect(group?.findButtonById("increment")).not.toBeNull();
    expect(group?.findButtonById("decrement")).not.toBeNull();
    expect(group?.findButtonById("remove")).toBeNull();
  });

  test("list mode: renders remove button in addition to increment/decrement", () => {
    const { container } = render(
      <CardItemButtonGroup {...baseProps} isList={true} onRemove={vi.fn()} />,
    );
    const group = createWrapper(container).findButtonGroup();
    expect(group?.findButtonById("increment")).not.toBeNull();
    expect(group?.findButtonById("decrement")).not.toBeNull();
    expect(group?.findButtonById("remove")).not.toBeNull();
  });

  test("goods mode: increment calls onStageQty with qty + 1", () => {
    const onStageQty = vi.fn();
    const { container } = render(
      <CardItemButtonGroup
        {...baseProps}
        isList={false}
        onStageQty={onStageQty}
      />,
    );
    createWrapper(container)
      .findButtonGroup()
      ?.findButtonById("increment")
      ?.click();
    expect(onStageQty).toHaveBeenCalledWith(3);
  });

  test("goods mode: decrement does not go below 0", () => {
    const onStageQty = vi.fn();
    const { container } = render(
      <CardItemButtonGroup
        {...baseProps}
        stagedQty={0}
        isList={false}
        onStageQty={onStageQty}
      />,
    );
    createWrapper(container)
      .findButtonGroup()
      ?.findButtonById("decrement")
      ?.click();
    expect(onStageQty).toHaveBeenCalledWith(0);
  });

  test("list mode: remove calls onRemove with item id", () => {
    const onRemove = vi.fn();
    const { container } = render(
      <CardItemButtonGroup {...baseProps} isList={true} onRemove={onRemove} />,
    );
    createWrapper(container)
      .findButtonGroup()
      ?.findButtonById("remove")
      ?.click();
    expect(onRemove).toHaveBeenCalledWith(mockItem.id);
  });

  test("list mode: increment calls onUpdate with qty + 1", () => {
    const onUpdate = vi.fn();
    const { container } = render(
      <CardItemButtonGroup
        {...baseProps}
        isList={true}
        onUpdate={onUpdate}
        onRemove={vi.fn()}
      />,
    );
    createWrapper(container)
      .findButtonGroup()
      ?.findButtonById("increment")
      ?.click();
    expect(onUpdate).toHaveBeenCalledWith(mockItem.id, { qty: 3 });
  });
});
