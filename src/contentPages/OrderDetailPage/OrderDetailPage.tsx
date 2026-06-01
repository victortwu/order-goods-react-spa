import { useParams, useNavigate } from "react-router";
import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
  Table,
} from "@cloudscape-design/components";
import { useGetListById } from "../../api/hooks/useGetListById";
import { VendorStatus } from "../../constants/types/orderRecord";
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

export const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetListById(orderId);

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (!data) {
    return (
      <Box textAlign="center" color="text-body-secondary">
        Order not found.
      </Box>
    );
  }

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        actions={<Button onClick={() => navigate("/orders")}>Back to Orders</Button>}
      >
        Order Details
      </Header>

      <Container header={<Header variant="h2">Summary</Header>}>
        <ColumnLayout columns={3} variant="text-grid">
          <div>
            <Box variant="awsui-key-label">Order ID</Box>
            <CopyableId value={data.id} />
          </div>
          <div>
            <Box variant="awsui-key-label">Date</Box>
            <Box>{formatDate(data.timestamp)}</Box>
          </div>
          <div>
            <Box variant="awsui-key-label">Total Items</Box>
            <Box>{data.list.length}</Box>
          </div>
        </ColumnLayout>
      </Container>

      {data.vendorStatuses && (
        <Container header={<Header variant="h2">Vendor Statuses</Header>}>
          <SpaceBetween size="xs">
            {Object.entries(data.vendorStatuses).map(([vendorId, entry]) => (
              <StatusIndicator key={vendorId} type={getStatusType(entry.status)}>
                {formatVendorName(vendorId)} — {entry.status.replace(/_/g, " ")}
              </StatusIndicator>
            ))}
          </SpaceBetween>
        </Container>
      )}

      <Table
        header={<Header variant="h2">Items</Header>}
        columnDefinitions={[
          { id: "name", header: "Product", cell: (item) => item.productName },
          { id: "qty", header: "Qty", cell: (item) => item.qty },
          { id: "unit", header: "Unit", cell: (item) => item.unitType },
          {
            id: "vendor",
            header: "Vendor",
            cell: (item) => item.productData?.vendorID ?? "—",
          },
        ]}
        items={data.list}
      />
    </SpaceBetween>
  );
};
