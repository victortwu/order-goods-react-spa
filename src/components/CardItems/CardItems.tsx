import { Button, Cards, StatusIndicator } from "@cloudscape-design/components";
import { CardItemButtonGroup } from "../CardItemButtonGroup/CardItemButtonGroup";
import { OrderItem, UnitType } from "../../constants/types/orderItem";
import { ReactNode, useState } from "react";

type StagedState = Record<string, { qty: number; unitType: UnitType }>;

const DEFAULT_STAGED = { qty: 0, unitType: "case" as UnitType };

type GoodsModeProps = {
  isList: false;
  onAdd: (item: OrderItem) => void;
  listIds: Set<string>;
  filter?: ReactNode;
};

type ListModeProps = {
  isList: true;
  onUpdate: (
    id: string,
    changes: Partial<Pick<OrderItem, "qty" | "unitType">>,
  ) => void;
  onRemove: (id: string) => void;
  filter?: never;
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
      filter={!isList ? (props as GoodsModeProps).filter : undefined}
      ariaLabels={{
        itemSelectionLabel: (_, t) => `select ${t.productName}`,
        selectionGroupLabel: "Item selection",
      }}
      cardDefinition={{
        header: (item) => {
          // List mode: name + qty label
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

          // Goods mode: just the name
          return <span>{item.productName}</span>;
        },
        sections: [
          {
            id: "buttonGroup",
            content: (item) => {
              // List mode: button group only (no add/badge)
              if (isList) {
                return (
                  <CardItemButtonGroup
                    item={item}
                    isList={true}
                    stagedQty={item.qty}
                    stagedUnitType={item.unitType}
                    onStageQty={() => {}}
                    onStageUnitType={() => {}}
                    onUpdate={(props as ListModeProps).onUpdate}
                    onRemove={(props as ListModeProps).onRemove}
                  />
                );
              }

              // Goods mode
              const alreadyAdded = (props as GoodsModeProps).listIds.has(
                item.id,
              );

              if (alreadyAdded) {
                return <StatusIndicator type="success">Added</StatusIndicator>;
              }

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
                  {hasQty ? (
                    <Button
                      variant="primary"
                      onClick={() =>
                        (props as GoodsModeProps).onAdd({
                          ...item,
                          qty,
                          unitType,
                        })
                      }
                    >
                      {`Add ${qtyLabel}`}
                    </Button>
                  ) : (
                    <span />
                  )}
                  <CardItemButtonGroup
                    item={item}
                    isList={false}
                    stagedQty={qty}
                    stagedUnitType={unitType}
                    onStageQty={(q) => stageQty(item.id, q)}
                    onStageUnitType={(u) => stageUnitType(item.id, u)}
                    onUpdate={() => {}}
                    onRemove={undefined}
                  />
                </div>
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
