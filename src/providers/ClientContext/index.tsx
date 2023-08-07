import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  TClientUpdateRequest,
} from "./@types";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<Client | null>(null);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);

  const toggleModalEditUser = () => setIsOpenModalUser(!isOpenModalUser);

  const token = localStorage.getItem("schedule:token");

  const navigate = useNavigate();

  const userRegister = async (formData: TClientRequest) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.post<TClientRequest>("/client", formData);
      setLoading(true);
      toast.success("Cadastro realizado com sucesso!", {
        autoClose: 1000,
      });
      navigate("/");
    } catch (error) {
      const currentError = error as AxiosError<string>;
      if (currentError.response?.data.message === "Email already exists") {
        toast.error(currentError.response?.data.message, {
          autoClose: 1000,
        });
      } else {
        toast.error(
          "Ocorreu um erro, preencha os campos corretamente e tente novamente!",
          {
            autoClose: 1000,
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const response = await api.get<Client>("/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setContacts(response.data.contact);
      })();
    }
  }, []);

  const userLoad = async () => {
    if (token) {
      try {
        const response = await api.get<Client>("/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(true);

        setUser(response.data);
        setContacts(response.data.contact);
        navigate("dashboard");
      } catch (error) {
        const currentError = error as AxiosError<string>;
        console.error(currentError.response?.data);
        setLoading(false);
        setUser(null);
        localStorage.removeItem("schedule:token");
        navigate("/");
        setContacts([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setUser(null);
      localStorage.removeItem("schedule:token");
      // navigate("/");
      setContacts([]);
      return;
    }
    userLoad();
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const userLogin = async (formData: TLogin) => {
    try {
      const response = await api.post<LoginResponse>("/login", formData);
      const { token } = response.data;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      localStorage.setItem("schedule:token", token);

      const responseLogin = await api.get<Client>("/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(true);
      setUser(responseLogin.data);
      setContacts(responseLogin.data.contact);
      navigate("dashboard");
    } catch (error) {
      const currentError = error as AxiosError<string>;
      console.error(currentError.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem("schedule:token");
    navigate("/");
    setLoading(false);
  };

  const editUser = async (formData: TClientUpdateRequest) => {
    const token = localStorage.getItem("schedule:token");

    if (formData.email?.length === 0 && formData.telephone?.length === 0) {
      formData.email = undefined;
      formData.telephone = undefined;
    } else if (formData.telephone?.length === 0) {
      formData.telephone = undefined;
    } else if (formData.email?.length === 0) {
      formData.email = undefined;
    }

    try {
      const newUser = { ...user, ...formData };
      console.log(newUser);
      const response = await api.patch("/client", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userLoad();
      toggleModalEditUser();
    } catch (error) {
      const currentError = error as AxiosError<string>;
      console.error(currentError.response?.data);
      toast.error(currentError.response?.data.message, {
        autoClose: 1000,
      });
    }
  };

  const deleteUser = async () => {
    try {
      const response = api.delete("/client", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userLoad();
    } catch (error) {
      const currentError = error as AxiosError<string>;
      console.error(currentError.response?.data);
    }
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
        editUser,
        toggleModalEditUser,
        isOpenModalUser,
        userLoad,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
