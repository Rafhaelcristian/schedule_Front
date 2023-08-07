import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { Input } from "../Input";
import { ContactContext, IContact } from "../../providers/ContactContext";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>();

  const { ContactRegister } = useContext(ContactContext);

  const submit: SubmitHandler<IContact> = (formData) => {
    ContactRegister(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          placeholder=""
          error={errors.name}
          {...register("name")}
          label="Nome"
          id="name"
          type="text"
        />
        <Input
          placeholder=""
          error={errors.email}
          {...register("email")}
          label="E-mail"
          id="email"
          type="email"
        />
        <Input
          placeholder=""
          error={errors.telephone}
          {...register("telephone")}
          label="Telefone"
          id="telephone"
          type="text"
        />
        <button type="submit">Criar</button>
      </form>
    </main>
  );
};

export default ContactForm;
