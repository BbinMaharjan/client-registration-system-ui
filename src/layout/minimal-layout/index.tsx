import { Navigate, Outlet } from "react-router-dom";
import * as storage from "../../utils/storage";
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const isLogin = storage.get("user");
  if (isLogin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default MinimalLayout;
