import { ButtonGroup } from "@cloudscape-design/components";
import { OrderItem, UnitType } from "../../constants/types/orderItem";

interface ListButtonGroupProps {
  item: OrderItem;
  onUpdate: (id: string, changes: Partial<Pick<OrderItem, "qty" | "unitType">>) => void;
  onRemove: (id: string) => void;
}

export const ListButtonGroup = ({
  item,
  onUpdate,
  onRemove,
}: ListButtonGroupProps) => (
  <ButtonGroup
    onItemClick={({ detail }) => {
      switch (detail.id) {
        case "increment":
          onUpdate(item.id, { qty: item.qty + 1 });
          break;
        case "decrement":
          onUpdate(item.id, { qty: Math.max(0, item.qty - 1) });
          break;
        case "case":
          onUpdate(item.id, { unitType: "case" as UnitType });
          break;
        case "unit":
          onUpdate(item.id, { unitType: "unit" as UnitType });
          break;
        case "remove":
          onRemove(item.id);
          break;
      }
    }}
    ariaLabel="Order item actions"
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
      {
        type: "icon-button",
        id: "remove",
        iconName: "remove",
        text: "Remove from list",
      },
    ]}
  />
);
