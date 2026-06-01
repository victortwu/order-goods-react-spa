import { Route, Routes } from "react-router";
import { GoodsContentPage } from "../../contentPages/GoodsContentPage/GoodsContentPage";
import { ListsContentPage } from "../../contentPages/ListContentPage/ListContentPage";
import { OrdersContentPage } from "../../contentPages/OrdersContentPage/OrdersContentPage";
import { OrderDetailPage } from "../../contentPages/OrderDetailPage/OrderDetailPage";
import { AdminProductsPage } from "../../contentPages/AdminProductsPage/AdminProductsPage";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";

export const PageContentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsContentPage />} />
      <Route path="/crate" element={<ListsContentPage />} />
      <Route path="/orders" element={<OrdersContentPage />} />
      <Route path="/orders/:orderId" element={<OrderDetailPage />} />
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
