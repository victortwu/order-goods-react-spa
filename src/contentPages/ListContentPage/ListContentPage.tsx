import { useEffect } from "react";
import { createList } from "../../api/data-fetching/createList";
import { ListPayload } from "../../constants/types/list";

export const ListsContentPage = () => {
  const testPayload: ListPayload = {
    list: [
      {
        id: "aa6cad82-f32e-4a0f-9310-25e28923538f",
        vendorProductName: "LAMB GROUND",
        upc: "20713500000",
        name: "TEST Ground Lamb",
        vendorID: "Restaurant Depot",
        category: "Food COGS",
        qty: 3,
        unitType: "unit",
      },

      {
        id: "f7c81939-980f-4403-8765-dc39124a1de9",
        vendorProductName: "CHX HAL THIGH CVP",
        upc: "20795020000",
        name: "TEST Chicken",
        vendorID: "Restaurant Depot",
        category: "Food COGS",
        qty: 7,
        unitType: "case",
      },
    ],
  };

  //   useEffect(() => {
  //     createList(testPayload);
  //   }, []);

  return <main>Lists Content Page</main>;
};
