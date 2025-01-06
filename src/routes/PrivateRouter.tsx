import { Navigate, Outlet } from "react-router";

const isAuth: () => boolean = () => !!sessionStorage.getItem("authToken") && sessionStorage.getItem("authToken") !== "ERR";

const PrivateRouter = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
