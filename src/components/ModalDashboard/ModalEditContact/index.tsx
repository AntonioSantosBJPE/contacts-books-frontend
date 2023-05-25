import { handlePhone } from "@/app/register/utils";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { ContactsContext } from "@/contexts/ContactsContext";
import { Icontacts } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { schemaEditContact, TeditContact } from "./schema";

interface ImodalEditContact {}

export const ModalEditContact = ({}: ImodalEditContact) => {
  const { contacts, setContacts, closeModal, contactIsEdit } =
    useContext(ContactsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeditContact>({
    resolver: zodResolver(schemaEditContact),
    defaultValues: {
      name: contactIsEdit.name,
      email: contactIsEdit.email,
      phone: contactIsEdit.phone,
    },
  });

  const editContactSubmit = async (data: TeditContact) => {
    try {
      const response = await api.patch<Icontacts>(
        `/contacts/${contactIsEdit.id}`,
        data
      );

      const newContacts = contacts.map((contact) =>
        contact.id === response.data.id ? response.data : contact
      );
      setContacts(newContacts);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={closeModal}>close</button>
      <Form onSubmit={handleSubmit(editContactSubmit)}>
        <Input
          id="input-name"
          labelName="Nome"
          type="text"
          linkForm={register("name", { required: false })}
          error={errors.name?.message}
          placeholder={"Digite seu nome"}
        />

        <Input
          id="input-email"
          labelName="Email"
          type="email"
          linkForm={register("email", { required: false })}
          error={errors.email?.message}
          placeholder={"Digite seu email"}
        />

        <Input
          id="input-phone"
          labelName="Telefone"
          type="text"
          linkForm={register("phone", { required: false })}
          error={errors.phone?.message}
          placeholder={"(xx)xxxxx-xxxx"}
          onChange={(event) => handlePhone(event)}
          maxLength={14}
        />
        <button type="submit">Editar</button>
      </Form>
    </>
  );
};
