import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./mainRoutes";
import AuthenticationRoutes from "./authenticationRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
