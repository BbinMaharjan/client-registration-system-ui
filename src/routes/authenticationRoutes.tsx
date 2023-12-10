import { lazy } from "react";

// project imports
import MinimalLayout from "../layout/minimal-layout";
import Loadable from "../components/Loadable";

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import("../views/authentication/login")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/auth/login",
      element: <AuthLogin />,
    },
  ],
};

export default AuthenticationRoutes;
