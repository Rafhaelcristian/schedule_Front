import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { TLogin } from "../../pages/Login/validator";
import {
  Client,
  Contacts,
  IUserContext,
  IUserProviderProps,
  LoginResponse,
  TClientRequest,
} from "./@types";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<Client | null>(null);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userRegister = async (formData: TClientRequest) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.post("/client", formData);
      setLoading(true);
      navigate("/");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const currentError = error as AxiosError<string>;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await api.get<Client>("/contact");

      setUser(response.data);
      setContacts(response.data.contact);
    })();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("schedule:token");

    if (!token) {
      setLoading(false);
      setUser(null);
      localStorage.removeItem("schedule:token");
      // navigate("/");
      setContacts([]);
      return;
    }

    (async () => {
      try {
        const response = await api.get<Client>("/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setContacts(response.data.contact);
        navigate("dashboard");
      } catch (error) {
        setLoading(false);
        setUser(null);
        localStorage.removeItem("schedule:token");
        navigate("/");
        setContacts([]);
      }
    })();

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const userLogin = async (data: TLogin) => {
    try {
      const response = await api.post<LoginResponse>("/login", data);
      const { token } = response.data;
      setLoading(true);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      localStorage.setItem("schedule:token", token);

      const responseLogin = await api.get<Client>("/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(responseLogin.data);
      setContacts(responseLogin.data.contact);
      setLoading(false);
      navigate("dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    navigate("/");
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        userRegister,
        userLogin,
        userLogout,
        setContacts,
        contacts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
