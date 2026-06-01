import {
  Cards,
  Header,
  SpaceBetween,
  StatusIndicator,
  Box,
  Link,
} from "@cloudscape-design/components";
import { useGetRecentLists } from "../../api/hooks/useGetRecentLists";
import { OrderRecord, VendorStatus } from "../../constants/types/orderRecord";
import { useNavigate } from "react-router";
import { CopyableId } from "../../components/CopyableId/CopyableId";

const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const formatVendorName = (vendorId: string): string =>
  vendorId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const getStatusType = (
  status: VendorStatus,
): "success" | "warning" | "error" | "info" | "in-progress" | "pending" => {
  switch (status) {
    case "success":
    case "email_sent":
      return "success";
    case "partial_success":
      return "warning";
    case "pending":
      return "in-progress";
    case "not_configured":
      return "info";
    default:
      return "error";
  }
};

export const OrdersContentPage = () => {
  const { data, isLoading } = useGetRecentLists(10);
  const navigate = useNavigate();

  return (
    <Cards
      loading={isLoading}
      loadingText="Loading orders..."
      empty={
        <Box textAlign="center" color="text-body-secondary">
          No orders yet.
        </Box>
      }
      header={<Header variant="h1">Orders</Header>}
      cardDefinition={{
        header: (item) => (
          <Link onFollow={() => navigate(`/orders/${item.id}`)}>
            {`Order — ${formatDate(item.timestamp)}`}
          </Link>
        ),
        sections: [
          {
            id: "orderId",
            header: "Order ID",
            content: (item) => (
              <CopyableId value={item.id} onClick={() => navigate(`/orders/${item.id}`)} />
            ),
          },
          {
            id: "items",
            header: "Items",
            content: (item) => `${item.list.length} item${item.list.length !== 1 ? "s" : ""}`,
          },
          {
            id: "vendorStatuses",
            header: "Vendor Statuses",
            content: (item) => {
              if (!item.vendorStatuses)
                return <StatusIndicator type="pending">Pending</StatusIndicator>;
              return (
                <SpaceBetween size="xs">
                  {Object.entries(item.vendorStatuses).map(([vendorId, entry]) => (
                    <StatusIndicator key={vendorId} type={getStatusType(entry.status)}>
                      {formatVendorName(vendorId)} — {entry.status.replace(/_/g, " ")}
                    </StatusIndicator>
                  ))}
                </SpaceBetween>
              );
            },
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }]}
      items={data ?? []}
    />
  );
};
