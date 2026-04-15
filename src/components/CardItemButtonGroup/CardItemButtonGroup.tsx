import { ButtonGroup, ButtonGroupProps } from "@cloudscape-design/components";
import { OrderItem, UnitType } from "../../constants/types/orderItem";

type CardItemButtonGroupProps = {
  item: OrderItem;
  isList: boolean;
  stagedQty: number;
  stagedUnitType: UnitType;
  onStageQty: (qty: number) => void;
  onStageUnitType: (unitType: UnitType) => void;
  onUpdate: (
    id: string,
    changes: Partial<Pick<OrderItem, "qty" | "unitType">>,
  ) => void;
  onRemove?: (id: string) => void;
};

export const CardItemButtonGroup = ({
  item,
  isList,
  stagedQty,
  stagedUnitType,
  onStageQty,
  onStageUnitType,
  onUpdate,
  onRemove,
}: CardItemButtonGroupProps) => {
  const handleClick = (detailId: string) => {
    switch (detailId) {
      case "increment":
        if (isList) onUpdate(item.id, { qty: item.qty + 1 });
        else onStageQty(stagedQty + 1);
        break;
      case "decrement":
        if (isList) onUpdate(item.id, { qty: Math.max(0, item.qty - 1) });
        else onStageQty(Math.max(0, stagedQty - 1));
        break;
      case "case":
        if (isList) onUpdate(item.id, { unitType: "case" });
        else onStageUnitType("case");
        break;
      case "unit":
        if (isList) onUpdate(item.id, { unitType: "unit" });
        else onStageUnitType("unit");
        break;
      case "remove":
        onRemove?.(item.id);
        break;
      default:
        break;
    }
  };

  return (
    <ButtonGroup
      onItemClick={({ detail }) => handleClick(detail.id)}
      ariaLabel="Order item actions"
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
        ...(isList
          ? [
              {
                type: "icon-button",
                id: "remove",
                iconName: "remove",
                text: "Remove from list",
              } as ButtonGroupProps.ItemOrGroup,
            ]
          : []),
      ]}
      variant="icon"
    />
  );
};
