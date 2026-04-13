import { Spinner } from "@cloudscape-design/components";
import { useGetGoods } from "../../api/hooks/useGetGoods";
import { CardItems } from "../../components/CardItems/CardItems";
import { useOrderList } from "../../hooks/useOrderList";
import { createOrderItem } from "../../utils/createOrderItem";

export const GoodsContentPage = () => {
  const { data, isLoading } = useGetGoods();
  const { addItem, isInList } = useOrderList();

  if (isLoading) return <Spinner size="large" />;

  const orderItems = (data ?? []).map(createOrderItem);
  const listIds = new Set(
    orderItems.filter((i) => isInList(i.id)).map((i) => i.id),
  );

  return (
    <CardItems
      items={orderItems}
      isList={false}
      onAdd={addItem}
      listIds={listIds}
    />
  );
};
