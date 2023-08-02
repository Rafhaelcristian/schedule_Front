import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import Register from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
