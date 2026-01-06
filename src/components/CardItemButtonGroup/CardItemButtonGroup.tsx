import { ButtonGroup, ButtonGroupProps } from "@cloudscape-design/components";
import { Product } from "../../constants/types/product";
import { ListItem } from "../../constants/types/list";

type CardItemButtonGroupProps = {
  item: Product | ListItem;
  setNewItems: React.Dispatch<React.SetStateAction<Product[] | ListItem[]>>;
  isList: boolean;
};

export const CardItemButtonGroup = ({
  item,
  setNewItems,
  isList,
}: CardItemButtonGroupProps) => {
  const getCurrentIndexAndItem = (itemsCopy: Product[] | ListItem[]) => {
    const currentItem = itemsCopy.find((prevItem) => item.id === prevItem.id);
    return { idx: itemsCopy.indexOf(currentItem as ListItem), currentItem };
  };

  // TODO: instead of these logs, methods from create list context hook
  const handleClick = (detailId: string) => {
    switch (detailId) {
      case "increment":
        setNewItems((prevItems) => {
          const copyPrevItems: Product[] | ListItem[] = [...prevItems];
          const { idx, currentItem } = getCurrentIndexAndItem(copyPrevItems);
          copyPrevItems[idx] = {
            ...currentItem,
            qty: (currentItem?.qty ?? 0) + 1,
            unitType: !currentItem?.unitType ? "case" : currentItem.unitType,
          } as Product;
          return copyPrevItems;
        });
        break;
      case "decrement":
        setNewItems((prevItems) => {
          const copyPrevItems: Product[] | ListItem[] = [...prevItems];
          const { idx, currentItem } = getCurrentIndexAndItem(copyPrevItems);

          if ((currentItem?.qty as number) > 0) {
            copyPrevItems[idx] = {
              ...currentItem,
              qty: (currentItem?.qty ?? 0) - 1,
            } as Product;
          }
          return copyPrevItems;
        });
        break;
      case "case":
        setNewItems((prevItems) => {
          const copyPrevItems: Product[] | ListItem[] = [...prevItems];
          const { idx, currentItem } = getCurrentIndexAndItem(copyPrevItems);
          copyPrevItems[idx] = {
            ...currentItem,
            unitType: "case",
          } as Product;
          return copyPrevItems;
        });
        break;
      case "unit":
        setNewItems((prevItems) => {
          const copyPrevItems: Product[] | ListItem[] = [...prevItems];
          const { idx, currentItem } = getCurrentIndexAndItem(copyPrevItems);
          copyPrevItems[idx] = {
            ...currentItem,
            unitType: "unit",
          } as Product;
          return copyPrevItems;
        });
        break;
      case "remove":
        console.log("Remove from list");
        break;
      default:
        break;
    }
  };

  return (
    <ButtonGroup
      onItemClick={({ detail }) => {
        handleClick(detail.id);
      }}
      ariaLabel="Creating list actions"
      items={[
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
          text: "Add",
        },
        {
          type: "menu-dropdown",
          id: "selectUnit",
          text: "Select unit type",
          items: [
            { itemType: "action", text: "Case", id: "case" },
            { itemType: "action", text: "Unit", id: "unit" },
          ],
        },
        ...(isList
          ? [
              {
                type: "icon-button",
                id: "remove",
                iconName: "remove",
                text: "Remove",
              } as ButtonGroupProps.ItemOrGroup,
            ]
          : []),
      ]}
      variant="icon"
    />
  );
};
