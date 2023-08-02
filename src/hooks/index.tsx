import { useContext } from "react";
import { LoginContext } from "../providers/loginProvider";

export const useLogin = () => {
  const loginContext = useContext(LoginContext);

  return loginContext;
};
