import { useGetGoods } from "../../api/hooks/useGetGoods";

export const GoodsContentPage = () => {
  const { data, isLoading } = useGetGoods();

  return (
    <main>
      Goods Content Page{" "}
      <pre>{isLoading ? "...loading data" : JSON.stringify(data, null, 2)}</pre>
    </main>
  );
};
