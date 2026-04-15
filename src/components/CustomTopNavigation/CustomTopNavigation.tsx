import {
  TopNavigation,
  TopNavigationProps,
} from "@cloudscape-design/components";
import { APP_NAME } from "../../constants/globalConstants";
import { useDarkMode } from "../../contexts/ThemeProvider/ThemeContext";
import { useNavigate } from "react-router";

interface CustomTopNavigationProps {
  signOut: ((data?: any | undefined) => void) | undefined;
  identity?: TopNavigationProps.Identity;
}

export const CustomTopNavigation = ({
  signOut,
  identity = { href: "/", title: APP_NAME },
}: CustomTopNavigationProps) => {
  const { isDark, toggleTheme } = useDarkMode();
  const navigate = useNavigate();

  return (
    <TopNavigation
      identity={{
        ...identity,
        onFollow: (event) => {
          event.preventDefault();
          navigate(identity.href ?? "/");
        },
      }}
      utilities={[
        {
          type: "button",
          text: `${isDark ? "Light" : "Dark"}`,
          onClick: toggleTheme,
        },
        {
          type: "menu-dropdown",
          text: "Account",
          onItemClick: ({ detail }) => {
            if (detail.id === "signOutButton" && signOut) {
              signOut();
            }
          },
          onItemFollow: (event) => {
            event.preventDefault();
            if (event.detail.href) navigate(event.detail.href);
          },
          items: [
            {
              id: "link-group",
              text: "Go To",
              items: [
                {
                  id: "homeLink",
                  text: "Home",
                  href: "/",
                },
                {
                  id: "listLink",
                  text: "List",
                  href: "/list",
                },
              ],
            },
            {
              id: "signOutButton",
              text: "Sign Out",
            },
          ],
        },
      ]}
    />
  );
};
