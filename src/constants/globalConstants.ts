import { SideNavigationProps } from "@cloudscape-design/components";

export const APP_NAME = "Order Goods";

export const API_NAME = "OrderGoodsApi";

export const DEFAULT_SIDE_NAV_ITEMS: SideNavigationProps.Item[] = [
  { type: "link", text: `Goods`, href: `/` },
  { type: "link", text: `List`, href: `/list` },
];
