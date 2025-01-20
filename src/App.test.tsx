import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { UserProvider } from "./contexts/UserContext/UserProvider";

test("renders <App />", () => {
  render(
    <UserProvider>
      <App />
    </UserProvider>
  );
  // const heading = screen.getByText("Welcome");
  // expect(heading).toBeInTheDocument();
});
