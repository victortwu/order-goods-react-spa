import { Route, Routes } from "react-router";
import { GoodsContentPage } from "../../contentPages/GoodsContentPage/GoodsContentPage";
import { ListsContentPage } from "../../contentPages/ListContentPage/ListContentPage";
import { AdminProductsPage } from "../../contentPages/AdminProductsPage/AdminProductsPage";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";

export const PageContentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsContentPage />} />
      <Route path="/list" element={<ListsContentPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
};
