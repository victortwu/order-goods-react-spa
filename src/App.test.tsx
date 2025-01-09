import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the button", () => {
  render(<App />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
