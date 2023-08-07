import { createContext, useContext, useState } from "react";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ClientContext";
import { toast } from "react-toastify";

export interface IContact {
  name: string;
  email: string;
  second_email: string;
  telephone: string;
  second_telephone: string;
}

export interface IContactProviderProps {
  children: React.ReactNode;
}

export interface IContactContext {
  ContactRegister: (formData: IContact) => Promise<void>;
  isOpenModalCreateCont: boolean;
  toggleModalCreateCont: () => void;
  ContactEdit: (formData: object, id: number) => Promise<void>;
  isOpenModalEditCont: boolean;
  toggleModalEditCont: () => void;
}

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const { userLoad, contacts } = useContext(UserContext);
  const token = localStorage.getItem("schedule:token");
  const navigate = useNavigate();

  const [isOpenModalCreateCont, setIsOpenModalCreateCont] = useState(false);
  const [isOpenModalEditCont, setIsOpenModalEditCont] = useState(false);

  const toggleModalCreateCont = () =>
    setIsOpenModalCreateCont(!isOpenModalCreateCont);

  const toggleModalEditCont = () =>
    setIsOpenModalEditCont(!isOpenModalEditCont);

  const ContactRegister = async (formData: IContact) => {
    try {
      const response = await api.post("/contact", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userLoad();
    } catch (error) {
      const currentError = error as AxiosError<string>;
      console.log(currentError.response?.data);
      if (currentError.response?.data === "Email already exists") {
        toast.error(currentError.response?.data, {
          autoClose: 1000,
        });
      } else {
        toast.error("Ocorreu um erro!", {
          autoClose: 1000,
        });
      }
    }
  };

  const ContactEdit = async (formData: object, id: number) => {
    try {
      const response = await api.patch(`/contacts${id}}`, formData, {
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
    <ContactContext.Provider
      value={{
        ContactRegister,
        isOpenModalCreateCont,
        toggleModalCreateCont,
        ContactEdit,
        isOpenModalEditCont,
        toggleModalEditCont,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
