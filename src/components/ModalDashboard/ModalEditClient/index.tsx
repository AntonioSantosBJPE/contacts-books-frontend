import { handlePhone } from "@/app/register/utils";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { schemaEditClient, TeditClient } from "./schema";

interface ImodalEditClient {}

export const ModalEditClient = ({}: ImodalEditClient) => {
  const { closeModal } = useContext(DashboardContext);
  const { client, udpateClient } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeditClient>({
    resolver: zodResolver(schemaEditClient),
    defaultValues: {
      name: client!.name,
      email: client!.email,
      phone: client!.phone,
    },
  });

  const editClientSubmit = async (data: TeditClient) => {
    try {
      const response = await api.patch<Iclient>(
        `/clients/profile/${client!.id}`,
        data
      );
      udpateClient(response.data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={closeModal}>close</button>
      <Form onSubmit={handleSubmit(editClientSubmit)}>
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
