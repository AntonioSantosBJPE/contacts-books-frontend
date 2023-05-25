"use client";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import {
  Icontacts,
  IdashboardContext,
  IdashboardProviderProps,
  TmodalTypes,
} from "./types";

export const DashboardContext = createContext({} as IdashboardContext);

export const ContactsProvider = ({ children }: IdashboardProviderProps) => {
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
    <DashboardContext.Provider
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
    </DashboardContext.Provider>
  );
};
