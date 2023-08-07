import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";
import { TLogin, loginSchema } from "../../pages/Login/validator";
import { Input } from "../Input";

function LoginForm() {
  const { register, handleSubmit } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });
  const { userLogin } = useContext(UserContext);

  const submit: SubmitHandler<TLogin> = async (data) => {
    userLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input label="Email" type="email" id="email" {...register("email")} />
      <Input
        label="Senha"
        type="password"
        id="password"
        {...register("password")}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
