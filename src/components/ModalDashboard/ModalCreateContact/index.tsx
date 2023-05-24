import { handlePhone } from "@/app/register/utils";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { ContactsContext } from "@/contexts/ContactsContext";
import { Icontacts } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { schema, TcreateContact } from "./schema";

interface ImodalCreateContact {
  closeModal: () => void;
}

export const ModalCreateContact = ({ closeModal }: ImodalCreateContact) => {
  const { contacts, setContacts } = useContext(ContactsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TcreateContact>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const createContactSubmit = async (data: TcreateContact) => {
    console.log(data);
    try {
      const response = await api.post<Icontacts>("/contacts", data);

      setContacts((oldContacts) => [...oldContacts, response.data]);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={closeModal}>close</button>
      <Form onSubmit={handleSubmit(createContactSubmit)}>
        <Input
          id="input-name"
          labelName="Nome"
          type="text"
          linkForm={register("name")}
          error={errors.name?.message}
          placeholder={"Digite seu nome"}
        />

        <Input
          id="input-email"
          labelName="Email"
          type="email"
          linkForm={register("email")}
          error={errors.email?.message}
          placeholder={"Digite seu email"}
        />

        <Input
          id="input-phone"
          labelName="Telefone"
          type="text"
          linkForm={register("phone")}
          error={errors.phone?.message}
          placeholder={"(xx)xxxxx-xxxx"}
          onChange={(event) => handlePhone(event)}
          maxLength={14}
        />
        <button type="submit">Cadastrar</button>
      </Form>
    </>
  );
};
