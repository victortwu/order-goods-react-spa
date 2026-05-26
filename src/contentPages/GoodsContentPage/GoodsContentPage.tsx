import { Spinner, TextFilter } from "@cloudscape-design/components";
import { useGetGoods } from "../../api/hooks/useGetGoods";
import { GoodsCards } from "../../components/GoodsCards/GoodsCards";
import { OrderListPopover } from "../../components/OrderListPopover/OrderListPopover";
import { useOrderList } from "../../hooks/useOrderList";
import { createOrderItem } from "../../utils/createOrderItem";
import { useState } from "react";

export const GoodsContentPage = () => {
  const { data, isLoading } = useGetGoods();
  const { addItem, isInList } = useOrderList();
  const [filterText, setFilterText] = useState("");

  if (isLoading) return <Spinner size="large" />;

  const orderItems = (data ?? []).map(createOrderItem);
  const listIds = new Set(orderItems.filter((i) => isInList(i.id)).map((i) => i.id));

  const filteredItems = filterText
    ? orderItems.filter((item) => item.productName.toLowerCase().includes(filterText.toLowerCase()))
    : orderItems;

  return (
    <GoodsCards
      items={filteredItems}
      listIds={listIds}
      onAdd={addItem}
      headerActions={<OrderListPopover />}
      filter={
        <TextFilter
          filteringText={filterText}
          filteringPlaceholder="Search goods"
          filteringAriaLabel="Filter goods"
          onChange={({ detail }) => setFilterText(detail.filteringText)}
        />
      }
    />
  );
};
