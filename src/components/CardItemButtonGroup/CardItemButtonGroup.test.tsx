import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { CardItemButtonGroup } from "./CardItemButtonGroup";
import { ListItem } from "../../constants/types/list";

describe("<Button/>", () => {
  const mockItem = {
    category: "Test Category",
    vendorID: "Test Vender ID",
    name: "Test Name",
    qty: 2,
    unitType: "case",
  } as ListItem;

  test("clicks on buttons when in order mode and 'remove' button is not present (isList = false)", () => {
    const { container } = render(
      <CardItemButtonGroup
        item={mockItem}
        setNewItems={() => {}}
        isList={false}
      />
    );
    const wrapper = createWrapper(container);

    const buttonButtonGroup = wrapper.findButtonGroup();

    const incrementButton = buttonButtonGroup?.findButtonById("increment");
    incrementButton?.click();
    const decrementButton = buttonButtonGroup?.findButtonById("decrement");
    decrementButton?.click();
    const removeButton = buttonButtonGroup?.findButtonById("remove");

    expect(removeButton).toBeNull();

    const toggleUnitButton =
      buttonButtonGroup?.findButtonById("toggleUnitType");
    toggleUnitButton?.click();

    expect(buttonButtonGroup?.getElement()).toBeInTheDocument();
  });

  test("clicks on buttons when in list mode (isList = true)", () => {
    const { container } = render(
      <CardItemButtonGroup
        item={mockItem}
        setNewItems={() => {}}
        isList={true}
      />
    );
    const wrapper = createWrapper(container);

    const buttonButtonGroup = wrapper.findButtonGroup();

    const incrementButton = buttonButtonGroup?.findButtonById("increment");
    incrementButton?.click();
    const decrementButton = buttonButtonGroup?.findButtonById("decrement");
    decrementButton?.click();
    const removeButton = buttonButtonGroup?.findButtonById("remove");

    expect(removeButton).not.toBeNull();
    removeButton?.click();

    const toggleUnitButton =
      buttonButtonGroup?.findButtonById("toggleUnitType");
    toggleUnitButton?.click();

    expect(buttonButtonGroup?.getElement()).toBeInTheDocument();
  });
});
