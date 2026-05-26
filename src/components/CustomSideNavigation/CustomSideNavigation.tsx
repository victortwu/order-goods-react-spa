import { SideNavigation, SideNavigationProps } from "@cloudscape-design/components";
import { APP_NAME, DEFAULT_SIDE_NAV_ITEMS } from "../../constants/globalConstants";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "../../contexts/UserContext/UserProvider";

export const CustomSideNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useUser();

  const items: SideNavigationProps.Item[] = [
    ...DEFAULT_SIDE_NAV_ITEMS,
    ...(isAdmin ? [{ type: "link" as const, text: "Admin", href: "/admin" }] : []),
  ];

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
