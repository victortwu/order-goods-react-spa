import { Button, SpaceBetween } from "@cloudscape-design/components";
import { CardItems } from "./components/CardItems/CardItems";
import { Product } from "./constants/types/product";
import { createOrderItem } from "./utils/createOrderItem";

const mockProducts: Product[] = [
  {
    id: "a8960022-b23d-4d95-bfbe-10d8d74827bb",
    name: "Chicken",
    category: "Food COGS",
    vendorID: "Restaurant Depot",
    upc: "abc123",
    vendorProductName: "SOUR CREAM BULK JF",
    hide: false,
  },
  {
    id: "ec4e85fb-f38b-4561-96fb-9104f7af00dc",
    name: "Beef",
    category: "Food COGS",
    vendorID: "Restaurant Depot",
    upc: "76069522997",
    vendorProductName: "SOUR CREAM BULK JF",
    hide: false,
  },
  {
    id: "259991a1-8007-48ae-89d7-fc160dcf6d36",
    name: "Lamb",
    category: "Food COGS",
    vendorID: "Restaurant Depot",
    upc: "72906299119",
    vendorProductName: "PDU ITALIAN PARSLE Y",
    hide: true,
  },
];

const mockOrderItems = mockProducts.map(createOrderItem);

export const TestPage = () => {
  return (
    <main>
      <SpaceBetween direction="horizontal" size="xs">
        <Button>Normal</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="link">Link</Button>
        <Button variant="icon" iconName="settings" />
        <Button iconName="calendar">Normal w Icon</Button>
      </SpaceBetween>
      <br />
      <CardItems items={mockOrderItems} isList={false} />
    </main>
  );
};
