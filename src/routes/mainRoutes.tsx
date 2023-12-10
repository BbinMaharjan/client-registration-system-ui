import { Suspense, lazy } from "react";

// project imports
import Loadable from "../components/Loadable";
import Loader from "../components/Loader";
import MainLayout from "../layout/main-layout";
import * as routeUrl from "./routeUrl";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));

// page routing
const Products = Loadable(lazy(() => import("../views/products")));
const ProductsForm = Loadable(
  lazy(() => import("../views/products/productsForm"))
);

const Clients = Loadable(lazy(() => import("../views/clients")));
const ClientsForm = Loadable(
  lazy(() => import("../views/clients/clientsForm"))
);

import * as storage from "../utils/storage";
import { Navigate, Outlet } from "react-router-dom";
// ==============================|| MAIN ROUTING ||============================== //

const MainRouteView = () => {
  const isLogin = storage.get("user");
  if (!isLogin) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return <Outlet />;
};

const MainRoutes = {
  path: "/",
  element: (
    <MainLayout>
      <MainRouteView />
    </MainLayout>
  ),
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <DashboardDefault />
        </Suspense>
      ),
    },
    {
      path: routeUrl?.PRODUCTS.url,
      element: <Products />,
    },
    {
      path: routeUrl?.CREATE_PRODUCTS_FORM.url,
      element: <ProductsForm />,
    },
    {
      path: routeUrl?.UPDATE_PRODUCTS_FORM.url,
      element: <ProductsForm />,
    },
    {
      path: routeUrl?.CLIENT.url,
      element: <Clients />,
    },
    {
      path: routeUrl?.CREATE_CLIENT_FORM.url,
      element: <ClientsForm />,
    },
    {
      path: routeUrl?.UPDATE_CLIENT_FORM.url,
      element: <ClientsForm />,
    },
  ],
};

export default MainRoutes;
