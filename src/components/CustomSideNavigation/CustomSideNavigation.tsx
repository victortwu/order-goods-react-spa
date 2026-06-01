import { SideNavigation, SideNavigationProps } from "@cloudscape-design/components";
import { APP_NAME, DEFAULT_SIDE_NAV_ITEMS } from "../../constants/globalConstants";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "../../contexts/UserContext/UserProvider";
import { Package, PackageOpen, ClipboardList, Settings } from "lucide-react";
import { createElement } from "react";

const ICON_SIZE = 16;

const iconMap: Record<string, React.ReactNode> = {
  "/": createElement(Package, { size: ICON_SIZE }),
  "/crate": createElement(PackageOpen, { size: ICON_SIZE }),
  "/orders": createElement(ClipboardList, { size: ICON_SIZE }),
  "/admin": createElement(Settings, { size: ICON_SIZE }),
};

export const CustomSideNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useUser();

  const items: SideNavigationProps.Item[] = [
    ...DEFAULT_SIDE_NAV_ITEMS,
    ...(isAdmin ? [{ type: "link" as const, text: "Admin", href: "/admin" }] : []),
  ].map((item) => ({
    ...item,
    info: item.type === "link" ? iconMap[item.href] : undefined,
  }));

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
