import { Route, Routes } from "react-router";
import { GoodsContentPage } from "../../contentPages/GoodsContentPage/GoodsContentPage";
import { ListsContentPage } from "../../contentPages/ListContentPage/ListContentPage";

export const PageContentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsContentPage />} />
      <Route path="/list" element={<ListsContentPage />} />
    </Routes>
  );
};
