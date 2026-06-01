import { memo } from "react";
import { Popover, Box } from "@cloudscape-design/components";
import { useOrderList } from "../../hooks/useOrderList";
import { PackageOpen } from "lucide-react";

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
      <span style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <PackageOpen size={24} />
        <strong>{orderList.length}</strong>
      </span>
    </Popover>
  );
});
