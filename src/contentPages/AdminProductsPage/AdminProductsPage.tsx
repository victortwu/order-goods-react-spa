import { Header, SpaceBetween, Spinner, Table } from "@cloudscape-design/components";
import { useGetGoods } from "../../api/hooks/useGetGoods";
import { useUpdateProduct } from "../../api/hooks/useUpdateProduct";
import { Product, VendorID } from "../../constants/types/product";
import { getColumnDefinitions } from "./columnDefinitions";

const VENDOR_OPTIONS: { label: string; value: VendorID }[] = [
  { label: "Restaurant Depot", value: "RESTAURANT_DEPOT" },
  { label: "Westcoast Pita", value: "WESTCOAST_PITA" },
  { label: "Franz Bakery", value: "FRANZ_BAKERY" },
  { label: "Amazon", value: "AMAZON" },
  { label: "Instacart US Foods", value: "INSTACART_US_FOODS" },
  { label: "Unknown", value: "UNKNOWN" },
];

export const AdminProductsPage = () => {
  const { data, isLoading } = useGetGoods();
  const { mutate, isPending } = useUpdateProduct();

  if (isLoading) return <Spinner size="large" />;

  const products = data ?? [];

  const handleSubmit = (item: Product, column: { id?: string }, value: unknown) => {
    const field = column.id as keyof Product;
    if (!field || item[field] === value) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      mutate(
        { id: item.id, [field]: value },
        { onSuccess: () => resolve(), onError: () => reject() },
      );
    });
  };

  return (
    <SpaceBetween size="m">
      <Header variant="h1" counter={`(${products.length})`}>
        Product Management
      </Header>
      <Table
        columnDefinitions={getColumnDefinitions(VENDOR_OPTIONS)}
        items={products}
        trackBy="id"
        loading={isPending}
        submitEdit={handleSubmit as any}
        empty="No products"
        variant="container"
        resizableColumns
        ariaLabels={{
          activateEditLabel: (column) => `Edit ${column.header}`,
          cancelEditLabel: () => "Cancel edit",
          submitEditLabel: () => "Submit edit",
          successfulEditLabel: () => "Edit successful",
          submittingEditText: () => "Saving...",
        }}
      />
    </SpaceBetween>
  );
};
