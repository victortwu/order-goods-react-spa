import {
  SideNavigation,
  SideNavigationProps,
} from "@cloudscape-design/components";
import {
  APP_NAME,
  DEFAULT_SIDE_NAV_ITEMS,
} from "../../constants/globalConstants";
import { useNavigate, useLocation } from "react-router";

interface CustomSideNavigationProps extends SideNavigationProps {
  items?: SideNavigationProps.Item[];
}

export const CustomSideNavigation = ({
  items = DEFAULT_SIDE_NAV_ITEMS,
}: CustomSideNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SideNavigation
      activeHref={location.pathname}
      header={{
        href: "/",
        text: APP_NAME,
      }}
      onFollow={(event) => {
        event.preventDefault();
        navigate(event.detail.href);
      }}
      items={items}
    />
  );
};
