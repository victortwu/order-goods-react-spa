import { render } from "@testing-library/react";
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

    const wrapper = createWrapper(container);
    const buttonDropdown = wrapper.findButtonDropdown()?.getElement();

    expect(buttonDropdown).toBeInTheDocument();
    expect(buttonDropdown?.innerHTML?.includes("Account")).toBeTruthy();
  });

  it("opens the dropdown menu when button is clicked", () => {
    const { container } = render(
      <CustomTopNavigation identity={testIdentity} signOut={mockSignOut} />
    );

    const wrapper = createWrapper(container);
    const buttonDropdown = wrapper.findButtonDropdown();
    buttonDropdown?.openDropdown();

    const portal = createWrapper(document.body);
    const openMenu = portal.findButtonDropdown()?.findOpenDropdown();
    expect(openMenu).toBeTruthy();
    expect(openMenu!.getElement().textContent).toMatch(/sign out/i);
  });
});
