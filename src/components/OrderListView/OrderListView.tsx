import { useCallback, useState } from "react";
import { Box, Button, Modal, List, SpaceBetween } from "@cloudscape-design/components";
import { OrderItem } from "../../constants/types/orderItem";
import { ListButtonGroup } from "../ListButtonGroup/ListButtonGroup";

interface OrderListViewProps {
  items: OrderItem[];
  onUpdate: (id: string, changes: Partial<Pick<OrderItem, "qty" | "unitType">>) => void;
  onRemove: (id: string) => void;
}

export const OrderListView = ({ items, onUpdate, onRemove }: OrderListViewProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = editingId ? items.find((i) => i.id === editingId) : null;

  const handleRemove = useCallback(
    (id: string) => {
      onRemove(id);
      setEditingId(null);
    },
    [onRemove],
  );

  const qtyLabel = editingItem
    ? `${editingItem.qty} ${editingItem.unitType}${editingItem.qty !== 1 ? "s" : ""}`
    : "";

  return (
    <>
      <List
        items={items}
        ariaLabel="Order list"
        renderItem={(item) => ({
          id: item.id,
          content: (
            <Box>
              {item.productName} | {item.qty} {item.unitType}
              {item.qty !== 1 ? "s" : ""}
            </Box>
          ),
          actions: (
            <Button
              variant="inline-icon"
              iconName="edit"
              ariaLabel={`Edit ${item.productName}`}
              onClick={() => setEditingId(item.id)}
            />
          ),
        })}
      />
      {editingItem && (
        <Modal
          visible={true}
          onDismiss={() => setEditingId(null)}
          header={"Update item"}
          footer={
            <Box float="right">
              <Button onClick={() => setEditingId(null)}>Done</Button>
            </Box>
          }
        >
          <SpaceBetween size={"s"}>
            <ListButtonGroup item={editingItem} onUpdate={onUpdate} onRemove={handleRemove} />
            {`${editingItem.productName} | ${qtyLabel}`}
          </SpaceBetween>
        </Modal>
      )}
    </>
  );
};
