import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CustomSideNavigation } from "./CustomSideNavigation";
import {
  APP_NAME,
  DEFAULT_SIDE_NAV_ITEMS,
} from "../../constants/globalConstants";
import { SideNavigationProps } from "@cloudscape-design/components";

describe("<CustomSideNavigation />", () => {
  it("renders with default items", () => {
    const { getByText } = render(<CustomSideNavigation />);

    // Check if the header text is rendered
    expect(getByText(APP_NAME)).toBeInTheDocument();

    // Check if the default items are rendered
    DEFAULT_SIDE_NAV_ITEMS.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });

  it("renders with custom items", () => {
    const customItems: SideNavigationProps.Item[] = [
      { type: "link", text: "Custom Item 1", href: "/custom1" },
      { type: "link", text: "Custom Item 2", href: "/custom2" },
    ];

    const { getByText } = render(<CustomSideNavigation items={customItems} />);

    // Check if the custom items are rendered
    customItems.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });
});
