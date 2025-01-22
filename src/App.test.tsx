import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { App } from "./App";

describe("<App />", () => {
  it("renders App.tsx and finds a button", () => {
    const { container } = render(<App />);
    const wrapper = createWrapper(container);
    const button = wrapper.findButton();

    expect(button?.getElement()).toBeInTheDocument();
  });
});
