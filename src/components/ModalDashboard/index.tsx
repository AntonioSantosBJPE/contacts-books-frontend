import { ContactsContext } from "@/contexts/ContactsContext";
import { useContext } from "react";
import Modal from "react-modal";
import { ModalCreateContact } from "./ModalCreateContact";
import { ModalEditContact } from "./ModalEditContact";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
  },
};

interface ImodalDashboard {}

export const ModalDashboard = ({}: ImodalDashboard) => {
  const { closeModal, modalIsOpen, modalType } = useContext(ContactsContext);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {modalType == "registerContact" && <ModalCreateContact />}
      {modalType == "editContact" && <ModalEditContact />}
    </Modal>
  );
};
