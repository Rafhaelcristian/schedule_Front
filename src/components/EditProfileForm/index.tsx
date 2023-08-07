import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";
import {
  TClientUpdateRequest,
  updateClientRequestSchema,
} from "../../providers/ClientContext/@types";
import { Input } from "../Input";

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TClientUpdateRequest>({
    resolver: zodResolver(updateClientRequestSchema),
  });

  const { user, editUser } = useContext(UserContext);
  const submit: SubmitHandler<TClientUpdateRequest> = (formData) => {
    editUser(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          placeholder={user?.name}
          {...register("name", { required: false })}
          label="Nome"
          id="name"
          type="text"
          error={errors.name}
        />
        <Input
          placeholder={user?.email}
          {...register("email", { required: false })}
          label="E-mail"
          type="text"
          error={errors.email}
          id="E-mail"
        />
        <Input
          placeholder="*******"
          {...register("password", { required: false })}
          label="Senha"
          type="password"
          error={errors.password}
          id="Senha"
        />
        <Input
          placeholder={user?.telephone}
          {...register("telephone", { required: false })}
          label="Telefone"
          type="text"
          error={errors.telephone}
          id="Telefone"
        />
        <button type="submit">Atualizar</button>
      </form>
    </main>
  );
};

export default EditProfileForm;
