import { handlePhone } from "@/app/register/utils";
import { AxiosInterceptor } from "@/components/AxiosInterceptor";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardContext } from "@/contexts/ContactsContext";
import { Iclient } from "@/contexts/types";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schemaEditClient, TeditClient } from "./schema";
import styles from "./styles.module.scss";

interface ImodalEditClient {}

export const ModalEditClient = ({}: ImodalEditClient) => {
  const { closeModal } = useContext(DashboardContext);
  const { client, udpateClient, openSnackBar } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await api.patch<Iclient>(
        `/clients/profile/${client!.id}`,
        data
      );
      udpateClient(response.data);
      openSnackBar("success", "Perfil atualizado!");
      closeModal();
    } catch (error: any) {
    } finally {
    }
  };
  return (
    <AxiosInterceptor
      closeModal={closeModal}
      isModal={true}
      setIsLoading={setIsLoading}
    >
      <div className={styles.containerModal}>
        <Button style="buttonIconSmall" type="button" actionClick={closeModal}>
          <Image
            src={"/icon-close.svg"}
            alt="close modal"
            width={25}
            height={25}
          />
        </Button>
        <h2 id="transition-modal-title">Editar perfil</h2>
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
          <Button type="submit" style="buttonLargeBlack" isDisabled={isLoading}>
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Confirmar Edição"
            )}
          </Button>
        </Form>
      </div>
    </AxiosInterceptor>
  );
};
