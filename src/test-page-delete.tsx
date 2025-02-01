import { Button, SpaceBetween } from "@cloudscape-design/components";
import { CardItems } from "./components/CardItems/CardItems";
import { Product } from "./constants/types/product";

const mockProductItems = [
  {
    upc: "abc123",
    category: "Food COGS",
    vendorID: "Restaurant Depot",
    id: "a8960022-b23d-4d95-bfbe-10d8d74827bb",
    hide: false,
    name: "Chicken",
    vendorProductName: "SOUR CREAM BULK JF",
    qty: 1,
    unitType: "case",
  },
  {
    category: "Food COGS",
    vendorID: "Restaurant Depot",
    id: "ec4e85fb-f38b-4561-96fb-9104f7af00dc",
    name: "Beef",
    upc: "76069522997",
    vendorProductName: "SOUR CREAM BULK JF",
    hide: false,
    // qty: 2,
    // unitType: "case",
  },
  {
    category: "Food COGS",
    vendorID: "Restaurant Depot",
    id: "259991a1-8007-48ae-89d7-fc160dcf6d36",
    name: "Lamb",
    upc: "72906299119",
    vendorProductName: "PDU ITALIAN PARSLE Y",
    hide: true,
    // qty: 2,
    // unitType: "case",
  },
] as Product[];

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
      <CardItems items={mockProductItems} isList={false} />
    </main>
  );
};
