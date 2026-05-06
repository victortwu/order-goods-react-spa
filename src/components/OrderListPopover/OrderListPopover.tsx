import { memo } from "react";
import { Popover, Box } from "@cloudscape-design/components";
import { useOrderList } from "../../hooks/useOrderList";

export const OrderListPopover = memo(() => {
  const { orderList } = useOrderList();

  if (orderList.length === 0) return null;

  return (
    <Popover
      dismissButton={false}
      position="bottom"
      size="medium"
      triggerType="custom"
      content={
        <Box>
          {orderList.map((item) => (
            <Box key={item.id} padding={{ vertical: "xxs" }}>
              {item.productName} × {item.qty}
            </Box>
          ))}
        </Box>
      }
    >
      <span style={{ cursor: "pointer" }}>Items: {orderList.length}</span>
    </Popover>
  );
});
