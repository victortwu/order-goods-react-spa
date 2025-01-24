import {
  TopNavigation,
  TopNavigationProps,
} from "@cloudscape-design/components";
import { APP_NAME } from "../../constants/globalConstants";
import { useDarkMode } from "../../contexts/ThemeProvider/ThemeContext";

interface CustomTopNavigationProps {
  signOut: ((data?: any | undefined) => void) | undefined;
  identity?: TopNavigationProps.Identity;
}

export const CustomTopNavigation = ({
  signOut,
  identity = { href: "/", title: APP_NAME },
}: CustomTopNavigationProps) => {
  const { isDark, toggleTheme } = useDarkMode();
  return (
    <TopNavigation
      identity={identity}
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
          items: [
            {
              id: "link-group",
              text: "Go To",
              items: [
                {
                  id: "homeLind",
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
