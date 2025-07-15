import { lazy } from "react";
import MainLayout from "../layout/MainLayout";
import Loadable from "../component/Loadable";
import AuthLayout from "../layout/AuthLayout";
import { ProtectedRoute } from "../layout/ProtectedRoute";

const DashboardDefault = Loadable(
  lazy(() => import("../views/Dashboard/Default"))
);

const AddCategory = Loadable(
  lazy(() => import("../component/pages/Products/Category/AddCategory"))
);
const CategoryList = Loadable(
  lazy(() => import("../component/pages/Products/Category/CategoryList"))
);
const EditCategory = Loadable(
  lazy(() => import("../component/pages/Products/Category/EditCategory"))
);
const ViewCategory = Loadable(
  lazy(() => import("../component/pages/Products/Category/ViewCategory"))
);

const AddProduct = Loadable(
  lazy(() => import("../component/pages/Products/Product/AddProduct"))
);
const EditProduct = Loadable(
  lazy(() => import("../component/pages/Products/Product/EditProduct"))
);
const ProductList = Loadable(
  lazy(() => import("../component/pages/Products/Product/ProductList"))
);
const ViewProduct = Loadable(
  lazy(() => import("../component/pages/Products/Product/ViewProduct"))
);

const MainRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <DashboardDefault />,
          },
        ],
      },
      {
        path: "/category",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute moduleName="Category" permissionType="can_read">
                <CategoryList />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute moduleName="Category" permissionType="can_update">
                <EditCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "view/:id",
            element: (
              <ProtectedRoute moduleName="Category" permissionType="can_read">
                <ViewCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute moduleName="Category" permissionType="can_add">
                <AddCategory />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/products",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute moduleName="Product" permissionType="can_read">
                <ProductList />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute moduleName="Product" permissionType="can_update">
                <EditProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "view/:id",
            element: (
              <ProtectedRoute moduleName="Product" permissionType="can_read">
                <ViewProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute moduleName="Product" permissionType="can_add">
                <AddProduct />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  };
};

export default MainRoutes;
