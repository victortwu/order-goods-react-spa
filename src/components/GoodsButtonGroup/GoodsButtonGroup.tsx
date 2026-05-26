import { ButtonGroup } from "@cloudscape-design/components";
import { UnitType } from "../../constants/types/orderItem";

interface GoodsButtonGroupProps {
  qty: number;
  onQtyChange: (qty: number) => void;
  onUnitTypeChange: (unitType: UnitType) => void;
}

export const GoodsButtonGroup = ({ qty, onQtyChange, onUnitTypeChange }: GoodsButtonGroupProps) => (
  <ButtonGroup
    onItemClick={({ detail }) => {
      switch (detail.id) {
        case "increment":
          onQtyChange(qty + 1);
          break;
        case "decrement":
          onQtyChange(Math.max(0, qty - 1));
          break;
        case "case":
          onUnitTypeChange("case");
          break;
        case "unit":
          onUnitTypeChange("unit");
          break;
      }
    }}
    ariaLabel="Set quantity and unit type"
    variant="icon"
    items={[
      {
        type: "menu-dropdown",
        id: "selectUnit",
        text: "Select unit type",
        items: [
          { itemType: "action", text: "Case", id: "case" },
          { itemType: "action", text: "Unit", id: "unit" },
        ],
      },
      {
        type: "icon-button",
        id: "decrement",
        iconName: "subtract-minus",
        text: "Decrement",
      },
      {
        type: "icon-button",
        id: "increment",
        iconName: "add-plus",
        text: "Increment",
      },
    ]}
  />
);
