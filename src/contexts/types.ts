import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IauthContext {
  udpateClient: (data: Iclient) => void;
  client: Iclient | undefined;
  logoutClient: () => void;
}
export interface IauthProviderProps {
  children: ReactNode;
}

export interface IloginClient {
  accessToken: string;
}

export interface IcontactsContext {
  contacts: Icontacts[];
  setContacts: Dispatch<SetStateAction<Icontacts[]>>;
  requestContacts: (id: string) => Promise<void>;
}
export interface IcontactsProviderProps {
  children: ReactNode;
}

export interface Iclient {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Icontacts extends Iclient {}
