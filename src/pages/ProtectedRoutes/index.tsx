import { Outlet } from "react-router-dom";
import { useLogin } from "../../hooks";

const ProtectedRoutes = () => {
  const { loading } = useLogin();

  return loading ? <div>Carregando...</div> : <Outlet />;
};

export default ProtectedRoutes;
