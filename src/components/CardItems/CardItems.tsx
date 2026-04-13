import { Badge, Button, Cards } from "@cloudscape-design/components";
import { CardItemButtonGroup } from "../CardItemButtonGroup/CardItemButtonGroup";
import { OrderItem, UnitType } from "../../constants/types/orderItem";
import { useState } from "react";

type StagedState = Record<string, { qty: number; unitType: UnitType }>;

const DEFAULT_STAGED = { qty: 0, unitType: "case" as UnitType };

type GoodsModeProps = {
  isList: false;
  onAdd: (item: OrderItem) => void;
  listIds: Set<string>;
};

type ListModeProps = {
  isList: true;
  onUpdate: (
    id: string,
    changes: Partial<Pick<OrderItem, "qty" | "unitType">>,
  ) => void;
  onRemove: (id: string) => void;
};

type CardItemsProps = { items: OrderItem[] } & (GoodsModeProps | ListModeProps);

export const CardItems = (props: CardItemsProps) => {
  const { items, isList } = props;

  const [staged, setStaged] = useState<StagedState>({});

  const getStaged = (id: string) => staged[id] ?? DEFAULT_STAGED;

  const stageQty = (id: string, qty: number) =>
    setStaged((prev) => ({ ...prev, [id]: { ...getStaged(id), qty } }));

  const stageUnitType = (id: string, unitType: UnitType) =>
    setStaged((prev) => ({ ...prev, [id]: { ...getStaged(id), unitType } }));

  return (
    <Cards
      header={isList ? "Order List" : "Goods"}
      ariaLabels={{
        itemSelectionLabel: (_, t) => `select ${t.productName}`,
        selectionGroupLabel: "Item selection",
      }}
      cardDefinition={{
        header: (item) => {
          if (isList) {
            const qty = item.qty;
            const label = `${qty} ${item.unitType}${qty !== 1 ? "s" : ""}`;
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.productName}</span>
                <span>{label}</span>
              </div>
            );
          }

          const alreadyAdded = (props as GoodsModeProps).listIds.has(item.id);
          const { qty, unitType } = getStaged(item.id);
          const hasQty = qty > 0;
          const qtyLabel = `${qty} ${unitType}${qty !== 1 ? "s" : ""}`;

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.productName}</span>
              {alreadyAdded && <Badge color="green">Added</Badge>}
              {!alreadyAdded && hasQty && (
                <Button
                  variant="primary"
                  onClick={() =>
                    (props as GoodsModeProps).onAdd({ ...item, qty, unitType })
                  }
                >
                  {`Add ${qtyLabel}`}
                </Button>
              )}
            </div>
          );
        },
        sections: [
          {
            id: "buttonGroup",
            content: (item) => {
              const alreadyAdded =
                !isList && (props as GoodsModeProps).listIds.has(item.id);
              if (alreadyAdded) return null;

              const { qty, unitType } = getStaged(item.id);

              return (
                <CardItemButtonGroup
                  item={item}
                  isList={isList}
                  stagedQty={isList ? item.qty : qty}
                  stagedUnitType={isList ? item.unitType : unitType}
                  onStageQty={(q) => stageQty(item.id, q)}
                  onStageUnitType={(u) => stageUnitType(item.id, u)}
                  onUpdate={
                    isList ? (props as ListModeProps).onUpdate : () => {}
                  }
                  onRemove={
                    isList ? (props as ListModeProps).onRemove : undefined
                  }
                />
              );
            },
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
      items={items}
      loadingText="Loading resources"
      empty="No items"
    />
  );
};
