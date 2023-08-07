import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;
