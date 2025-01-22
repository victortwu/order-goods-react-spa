import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

vi.mock("@aws-amplify/ui-react", async () => {
  const actual = await vi.importActual("@aws-amplify/ui-react");
  return {
    ...actual,
    Authenticator: ({ children }: object | any) =>
      typeof children === "function"
        ? children({ signOut: vi.fn(), user: {} })
        : children,
  };
});

afterEach(() => {
  cleanup();
});
