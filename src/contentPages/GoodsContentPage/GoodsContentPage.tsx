import { useEffect, useState } from "react";
import { getGoods } from "../../api/data-fetching/getGoods";

export const GoodsContentPage = () => {
  const [goods, setGoods] = useState([]);
  // just to test connection for now
  useEffect(() => {
    const loadData = async () => {
      const data = await getGoods();
      setGoods(data as any);
    };
    loadData();
  }, []);

  return (
    <main>
      Goods Content Page <pre>{JSON.stringify(goods, null, 2)}</pre>
    </main>
  );
};
