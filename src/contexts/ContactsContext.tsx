"use client";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import {
  Icontacts,
  IcontactsContext,
  IcontactsProviderProps,
  TmodalTypes,
} from "./types";

export const ContactsContext = createContext({} as IcontactsContext);

export const ContactsProvider = ({ children }: IcontactsProviderProps) => {
  const [contacts, setContacts] = useState<Icontacts[]>([]);
  const [contactIsEdit, setContactIsEdit] = useState<Icontacts>(
    {} as Icontacts
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<TmodalTypes>("registerContact");

  const openModal = (type: TmodalTypes, contact?: Icontacts) => {
    setModalType(type);
    if (contact) setContactIsEdit(contact);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  const requestContacts = async (id: string) => {
    try {
      const responseListContacts = await api.get<Icontacts[]>(
        `/clients/profile/${id}/contacts`
      );
      setContacts(responseListContacts.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        requestContacts,
        contactIsEdit,
        setContactIsEdit,
        modalIsOpen,
        openModal,
        closeModal,
        modalType,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
