import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TClientRequest, clientSchemaRequest } from "./validator";
import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<TClientRequest>({
    resolver: zodResolver(clientSchemaRequest),
  });

  const { userRegister } = useContext(UserContext);

  const submit: SubmitHandler<TClientRequest> = (formData) => {
    userRegister(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="name">Nome</label>
        <input {...register("name")} type="text" id="name" />
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" id="email" />
        <label htmlFor="password">Senha</label>
        <input {...register("password")} type="password" id="password" />
        <label htmlFor="telephone">Telefone</label>
        <input {...register("telephone")} type="text" id="telephone" />
        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
};

export default RegisterForm;
