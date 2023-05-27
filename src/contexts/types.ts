import { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from "react";

export interface IauthContext {
  udpateClient: (data: Iclient) => void;
  client: Iclient | undefined;
  logoutClient: () => void;
  snackBar: boolean;
  openSnackBar: (type: TsnackBarTypes, message: string) => void;
  handleCloseSnackBar: (
    event?: Event | SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => void;
  snackBarType: TsnackBarTypes;
  snackBarMessage: string;
}
export interface IauthProviderProps {
  children: ReactNode;
}

export interface IloginClient {
  accessToken: string;
}

export interface IdashboardContext {
  contacts: Icontacts[];
  setContacts: Dispatch<SetStateAction<Icontacts[]>>;
  requestContacts: (id: string) => Promise<void>;
  contactIsEdit: Icontacts;
  setContactIsEdit: Dispatch<SetStateAction<Icontacts>>;
  modalIsOpen: boolean;
  openModal: (type: TmodalTypes, contact?: Icontacts | undefined) => void;
  closeModal: () => void;
  modalType: TmodalTypes;
}
export interface IdashboardProviderProps {
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

export type TmodalTypes =
  | "registerContact"
  | "editContact"
  | "deleteContact"
  | "editClient";

export type TsnackBarTypes = "success" | "error";
