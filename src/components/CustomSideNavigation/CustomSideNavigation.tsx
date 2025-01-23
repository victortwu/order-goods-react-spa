import {
  SideNavigation,
  SideNavigationProps,
} from "@cloudscape-design/components";
import {
  APP_NAME,
  DEFAULT_SIDE_NAV_ITEMS,
} from "../../constants/globalConstants";

interface CustomSideNavigationProps extends SideNavigationProps {
  items?: SideNavigationProps.Item[];
}

export const CustomSideNavigation = ({
  items = DEFAULT_SIDE_NAV_ITEMS,
}: CustomSideNavigationProps) => {
  return (
    <SideNavigation
      header={{
        href: "/",
        text: APP_NAME,
      }}
      items={items}
    />
  );
};
