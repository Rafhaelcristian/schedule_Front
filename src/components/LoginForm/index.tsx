import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";
import { TLogin, loginSchema } from "../../pages/Login/validator";

function LoginForm() {
  const { register, handleSubmit } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });
  const { userLogin } = useContext(UserContext);

  const submit: SubmitHandler<TLogin> = async (data) => {
    userLogin(data);
  };

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

export default LoginForm;
