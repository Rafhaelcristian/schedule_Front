import { ReactNode } from "react";
import { z } from "zod";

export interface IUserProviderProps {
  children: React.ReactNode;
}

export const clientSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  telephone: z.string(),
  createdAt: z.string(),
});

export const clientSchemaRequest = clientSchema.omit({
  id: true,
  createdAt: true,
});

export const updateClientRequestSchema = clientSchemaRequest.partial();

export type TClientRequest = z.infer<typeof clientSchemaRequest>;

export type TClientUpdateRequest = z.infer<typeof updateClientRequestSchema>;

export interface LoginProviderProps {
  children: ReactNode;
}

export interface LoginResponse {
  token: string;
}

export interface Contacts {
  id: string;
  name: string;
  email: string;
  second_email?: string;
  telephone: string;
  second_telephone?: string;
  createdAt: string;
  clientId: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  telephone: string;
  createdAt: string;
  contact: Contacts[];
}

export const loginSchema = z.object({
  email: z
    .string()
    .email("Deve ser um e-mail válido.")
    .nonempty("E-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória."),
});

export type TLogin = z.infer<typeof loginSchema>;

export interface LoginContextValues {
  signIn: (data: TLogin) => void;
  loading: boolean;
}

export interface IUserContext {
  user: Client | null;
  setUser: React.Dispatch<React.SetStateAction<Client | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userRegister: (formData: TClientRequest) => Promise<void>;
  userLogin: (formData: TLogin) => Promise<void>;
  userLogout: () => void;
  setContacts: React.Dispatch<React.SetStateAction<Contacts[]>>;
  contacts: Contacts[];
  editUser: (formData: TClientUpdateRequest) => Promise<void>;
  toggleModalEditUser: () => void;
  isOpenModalUser: boolean;
  userLoad: () => Promise<void>;
  deleteUser: () => Promise<void>;
}
