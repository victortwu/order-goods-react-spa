import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { GoodsContentPage } from "./GoodsContentPage";
import { Product } from "../../constants/types/product";

// --- Mocks ---

const mockAddItem = vi.fn();
const mockIsInList = vi.fn<(id: string) => boolean>();

vi.mock("../../api/hooks/useGetGoods", () => ({
  useGetGoods: vi.fn(),
}));

vi.mock("../../hooks/useOrderList", () => ({
  useOrderList: () => ({
    addItem: mockAddItem,
    isInList: mockIsInList,
    orderList: [],
    updateItem: vi.fn(),
    removeItem: vi.fn(),
    clearList: vi.fn(),
  }),
}));

import { useGetGoods } from "../../api/hooks/useGetGoods";
const mockUseGetGoods = vi.mocked(useGetGoods);

// --- Test data ---

const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Chicken",
    category: "Meat",
    vendorID: "RESTAURANT_DEPOT",
    upc: "20795020000",
    vendorProductName: "CHX HAL THIGH MEAT",
  },
  {
    id: "prod-2",
    name: "Tomatoes",
    category: "Produce",
    vendorID: "RESTAURANT_DEPOT",
    upc: "2060079278",
    vendorProductName: "PD TOMATO ROMA XL",
  },
  {
    id: "prod-3",
    name: "Mayo",
    category: "Condiments",
    vendorID: "RESTAURANT_DEPOT",
    upc: "76069500351",
    vendorProductName: "MAYO CHEFS QUALITY 4GL",
  },
];

// --- Tests ---

describe("<GoodsContentPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsInList.mockReturnValue(false);
  });

  test("shows spinner while loading", () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useGetGoods>);

    // act
    const { container } = render(<GoodsContentPage />);
    const wrapper = createWrapper(container);

    // assert
    expect(wrapper.findSpinner()).not.toBeNull();
  });

  test("renders product cards when data is loaded", () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetGoods>);

    // act
    render(<GoodsContentPage />);

    // assert
    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.getByText("Tomatoes")).toBeInTheDocument();
    expect(screen.getByText("Mayo")).toBeInTheDocument();
  });

  test("renders empty state when data is an empty array", () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useGetGoods>);

    // act
    render(<GoodsContentPage />);

    // assert
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  test("filters products by name when typing in the search bar", async () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetGoods>);
    const user = userEvent.setup();
    const { container } = render(<GoodsContentPage />);
    const wrapper = createWrapper(container);
    const filterInput = wrapper
      .findTextFilter()!
      .findInput()!
      .findNativeInput()!
      .getElement();

    // act
    await user.type(filterInput, "chick");

    // assert
    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.queryByText("Tomatoes")).not.toBeInTheDocument();
    expect(screen.queryByText("Mayo")).not.toBeInTheDocument();
  });

  test("filter is case-insensitive", async () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetGoods>);
    const user = userEvent.setup();
    const { container } = render(<GoodsContentPage />);
    const wrapper = createWrapper(container);
    const filterInput = wrapper
      .findTextFilter()!
      .findInput()!
      .findNativeInput()!
      .getElement();

    // act
    await user.type(filterInput, "MAYO");

    // assert
    expect(screen.getByText("Mayo")).toBeInTheDocument();
    expect(screen.queryByText("Chicken")).not.toBeInTheDocument();
  });

  test("shows 'Added' status for items already in the order list", () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetGoods>);
    mockIsInList.mockImplementation((id: string) => id === "prod-1");

    // act
    render(<GoodsContentPage />);

    // assert
    expect(screen.getByText("Added")).toBeInTheDocument();
  });

  test("renders all products when filter is cleared", async () => {
    // arrange
    mockUseGetGoods.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetGoods>);
    const user = userEvent.setup();
    const { container } = render(<GoodsContentPage />);
    const wrapper = createWrapper(container);
    const filterInput = wrapper
      .findTextFilter()!
      .findInput()!
      .findNativeInput()!
      .getElement();

    // act — type to filter, then clear
    await user.type(filterInput, "chick");
    await user.clear(filterInput);

    // assert
    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.getByText("Tomatoes")).toBeInTheDocument();
    expect(screen.getByText("Mayo")).toBeInTheDocument();
  });
});
