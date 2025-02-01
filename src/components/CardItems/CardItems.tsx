import { Button, Cards } from "@cloudscape-design/components";
import { CardItemButtonGroup } from "../CardItemButtonGroup/CardItemButtonGroup";
import { Product } from "../../constants/types/product";
import { ListItem } from "../../constants/types/list";
import { useState } from "react";

type CardItemsProps = {
  items: Product[] | ListItem[];
  isList: boolean;
};

export const CardItems = ({ items, isList }: CardItemsProps) => {
  const [newItems, setNewItems] = useState(items);

  return (
    <Cards
      header={isList ? "Added Items" : "Order"}
      ariaLabels={{
        itemSelectionLabel: (e, t) => `select ${t.name}`,
        selectionGroupLabel: "Item selection",
      }}
      cardDefinition={{
        header: (item) => {
          const hasQuantity = (item.qty ?? 0) > 0;
          const isMoreThanOne = (item.qty ?? 0) > 1;
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {item.name}{" "}
              {hasQuantity &&
                (isList ? (
                  <span>{`${item.qty} ${item.unitType}${
                    isMoreThanOne ? "s" : ""
                  }`}</span>
                ) : (
                  <Button>{`Add ${item.qty} ${item.unitType}${
                    isMoreThanOne ? "s" : ""
                  }`}</Button>
                ))}
            </div>
          );
        },
        sections: [
          {
            id: "buttonGroup",
            content: (item) => {
              return (
                <CardItemButtonGroup
                  item={item}
                  setNewItems={setNewItems}
                  isList={isList}
                />
              );
            },
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
      items={newItems}
      loadingText="Loading resources"
      empty={"empty"}
    />
  );
};
