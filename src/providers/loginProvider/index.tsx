import { ReactNode, createContext, useEffect, useState } from "react";
import { TLogin } from "../../pages/Login/validator";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface LoginProviderProps {
  children: ReactNode;
}

interface LoginContextValues {
  signIn: (data: TLogin) => void;
  loading: boolean;
}

interface LoginResponse {
  token: string;
}

export const LoginContext = createContext({} as LoginContextValues);

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const token = localStorage.getItem("schedule:token");

    if (!token) {
      setLoading(false);
      return;
    }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const signIn = async (data: TLogin) => {
    try {
      const response = await api.post<LoginResponse>("/login", data);
      const { token } = response.data;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("schedule:token", token);
      setLoading(false);
      navigate("dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContext.Provider value={{ signIn, loading }}>
      {children}
    </LoginContext.Provider>
  );
};
