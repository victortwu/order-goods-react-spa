import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router";
import { CustomSideNavigation } from "./CustomSideNavigation";
import { APP_NAME } from "../../constants/globalConstants";

// --- Mock ---

const mockUseUser = vi.fn();
vi.mock("../../contexts/UserContext/UserProvider", () => ({
  useUser: () => mockUseUser(),
}));

// --- Tests ---

describe("<CustomSideNavigation />", () => {
  it("renders default nav items for non-admin users", () => {
    // arrange
    mockUseUser.mockReturnValue({ isAdmin: false, loading: false, user: null });

    // act
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <CustomSideNavigation />
      </BrowserRouter>,
    );

    // assert
    expect(getByText(APP_NAME)).toBeInTheDocument();
    expect(getByText("Goods")).toBeInTheDocument();
    expect(getByText("Crate")).toBeInTheDocument();
    expect(getByText("Orders")).toBeInTheDocument();
    expect(queryByText("Admin")).not.toBeInTheDocument();
  });

  it("renders Admin link for admin users", () => {
    // arrange
    mockUseUser.mockReturnValue({ isAdmin: true, loading: false, user: null });

    // act
    const { getByText } = render(
      <BrowserRouter>
        <CustomSideNavigation />
      </BrowserRouter>,
    );

    // assert
    expect(getByText("Admin")).toBeInTheDocument();
  });
});
