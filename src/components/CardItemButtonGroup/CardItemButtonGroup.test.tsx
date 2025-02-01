import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
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
  test("clicks on buttons", () => {
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
    removeButton?.click();

    expect(buttonButtonGroup?.getElement()).toBeInTheDocument();
  });
});
