import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";
import {
  TClientRequest,
  clientSchemaRequest,
} from "../../providers/ClientContext/@types";
import { Input } from "../Input";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TClientRequest>({
    resolver: zodResolver(clientSchemaRequest),
  });

  const { userRegister } = useContext(UserContext);

  const submit: SubmitHandler<TClientRequest> = (formData) => {
    userRegister(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        placeholder=""
        error={errors.name}
        {...register("name")}
        label="Nome"
        id="name"
        type="text"
        required
      />
      <Input
        placeholder=""
        error={errors.email}
        {...register("email")}
        label="E-mail"
        id="email"
        type="email"
        required
      />
      <Input
        placeholder=""
        error={errors.password}
        {...register("password")}
        label="Senha"
        id="password"
        type="password"
        required
      />
      <Input
        placeholder=""
        error={errors.telephone}
        {...register("telephone")}
        label="Telefone"
        id="telephone"
        type="text"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterForm;
