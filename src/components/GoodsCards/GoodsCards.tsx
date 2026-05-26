import { ReactNode, useState } from "react";
import {
  Box,
  Button,
  Cards,
  Header,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";
import { OrderItem, UnitType } from "../../constants/types/orderItem";
import { GoodsButtonGroup } from "../GoodsButtonGroup/GoodsButtonGroup";

type StagedState = Record<string, { qty: number; unitType: UnitType }>;

interface GoodsCardsProps {
  items: OrderItem[];
  listIds: Set<string>;
  onAdd: (item: OrderItem) => void;
  filter?: ReactNode;
  headerActions?: ReactNode;
}

export const GoodsCards = ({
  items,
  listIds,
  onAdd,
  filter,
  headerActions,
}: GoodsCardsProps) => {
  const [staged, setStaged] = useState<StagedState>({});

  const getStaged = (item: OrderItem) =>
    staged[item.id] ?? { qty: 0, unitType: item.productData.defaultToUnit ? "unit" as UnitType : "case" as UnitType };

  const stageQty = (item: OrderItem, qty: number) =>
    setStaged((prev) => ({ ...prev, [item.id]: { ...getStaged(item), qty } }));

  const stageUnitType = (item: OrderItem, unitType: UnitType) =>
    setStaged((prev) => ({ ...prev, [item.id]: { ...getStaged(item), unitType } }));

  return (
    <Cards
      header={
        <Header actions={headerActions}>Goods</Header>
      }
      filter={filter}
      ariaLabels={{
        itemSelectionLabel: (_, t) => `select ${t.productName}`,
        selectionGroupLabel: "Item selection",
      }}
      cardDefinition={{
        header: (item) => item.productName,
        sections: [
          {
            id: "actions",
            content: (item) => {
              if (listIds.has(item.id)) {
                return <StatusIndicator type="success">Added</StatusIndicator>;
              }

              const { qty, unitType } = getStaged(item);
              const hasQty = qty > 0;
              const qtyLabel = `${qty} ${unitType}${qty !== 1 ? "s" : ""}`;

              return (
                <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                  {hasQty ? (
                    <Button
                      variant="primary"
                      onClick={() => onAdd({ ...item, qty, unitType })}
                    >
                      Add {qtyLabel}
                    </Button>
                  ) : (
                    <Box />
                  )}
                  <GoodsButtonGroup
                    qty={qty}
                    onQtyChange={(q) => stageQty(item, q)}
                    onUnitTypeChange={(u) => stageUnitType(item, u)}
                  />
                </SpaceBetween>
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
