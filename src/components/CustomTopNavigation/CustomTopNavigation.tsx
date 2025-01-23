import { TopNavigation } from "@cloudscape-design/components";

type CustomTopNavigationProps = {
  signOut: ((data?: any | undefined) => void) | undefined;
  title: string;
};

export const CustomTopNavigation = ({
  signOut,
  title,
}: CustomTopNavigationProps) => {
  return (
    <TopNavigation
      identity={{ href: "/", title }}
      utilities={[
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
