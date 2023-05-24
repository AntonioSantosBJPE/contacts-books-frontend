"use client";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { Icontacts, IcontactsContext, IcontactsProviderProps } from "./types";

export const ContactsContext = createContext({} as IcontactsContext);

export const ContactsProvider = ({ children }: IcontactsProviderProps) => {
  const [contacts, setContacts] = useState<Icontacts[]>([]);

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
      value={{ contacts, setContacts, requestContacts }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
