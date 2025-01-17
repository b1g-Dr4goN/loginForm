import { Route, Routes } from "react-router";
import Dashboard from "../components/management/Dashboard";
import Login from "../components/login/Login";
import PrivateRouter from "./PrivateRouter";
import Users from "../components/management/userManagement/Users";
import Todo from "../components/management/todoManagement/Todo";

const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRouter />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/todos" element={<Todo />} />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
