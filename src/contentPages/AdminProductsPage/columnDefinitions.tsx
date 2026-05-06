import { Input, Select, Toggle, TableProps } from "@cloudscape-design/components";
import { Product, VendorID } from "../../constants/types/product";

type VendorOption = { label: string; value: VendorID };

export const getColumnDefinitions = (
  vendorOptions: VendorOption[],
): TableProps.ColumnDefinition<Product>[] => [
  {
    id: "name",
    header: "Name",
    cell: (item) => item.name,
    sortingField: "name",
    minWidth: 150,
  },
  {
    id: "category",
    header: "Category",
    cell: (item) => item.category,
    minWidth: 120,
    editConfig: {
      editingCell: (item, { currentValue, setValue }) => (
        <Input
          value={currentValue ?? item.category}
          onChange={({ detail }) => setValue(detail.value)}
        />
      ),
    },
  },
  {
    id: "vendorID",
    header: "Vendor",
    cell: (item) => item.vendorID,
    minWidth: 150,
    editConfig: {
      editingCell: (item, { currentValue, setValue }) => (
        <Select
          selectedOption={
            vendorOptions.find((o) => o.value === (currentValue ?? item.vendorID)) ?? null
          }
          options={vendorOptions}
          onChange={({ detail }) => setValue(detail.selectedOption.value)}
        />
      ),
    },
  },
  {
    id: "vendorProductName",
    header: "Vendor Product Name",
    cell: (item) => item.vendorProductName ?? "—",
    minWidth: 200,
    editConfig: {
      editingCell: (item, { currentValue, setValue }) => (
        <Input
          value={currentValue ?? item.vendorProductName ?? ""}
          onChange={({ detail }) => setValue(detail.value)}
        />
      ),
    },
  },
  {
    id: "upc",
    header: "UPC",
    cell: (item) => item.upc ?? "—",
    minWidth: 130,
    editConfig: {
      editingCell: (item, { currentValue, setValue }) => (
        <Input
          value={currentValue ?? item.upc ?? ""}
          onChange={({ detail }) => setValue(detail.value)}
        />
      ),
    },
  },
  {
    id: "hide",
    header: "Hidden",
    cell: (item) => (item.hide ? "Yes" : "No"),
    minWidth: 80,
    editConfig: {
      editingCell: (item, { currentValue, setValue }) => (
        <Toggle
          checked={currentValue ?? item.hide ?? false}
          onChange={({ detail }) => setValue(detail.checked)}
        />
      ),
    },
  },
];
