import { render, screen, fireEvent } from "@testing-library/react";
import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { CustomTopNavigation } from "./CustomTopNavigation";
import { describe, it, expect, vi } from "vitest";

const testIdentity = { href: "", title: "Test Title" };
const mockSignOut = vi.fn();

describe("<CustomTopNavigation />", () => {
  it("renders the title", () => {
    const { container } = render(
      <CustomTopNavigation identity={testIdentity} signOut={mockSignOut} />
    );
    const wrapper = createWrapper(container);
    const nav = wrapper.findTopNavigation()?.getElement();

    expect(nav?.innerHTML.includes(testIdentity.title)).toBeTruthy();
  });

  it("renders the dropdown button", () => {
    const { container } = render(
      <CustomTopNavigation identity={testIdentity} signOut={mockSignOut} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens the dropdown menu when button is clicked", () => {
    render(
      <CustomTopNavigation identity={testIdentity} signOut={mockSignOut} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });
});
