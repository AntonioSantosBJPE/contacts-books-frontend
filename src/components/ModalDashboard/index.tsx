import Modal from "react-modal";
import { ModalCreateContact } from "./ModalCreateContact";
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

interface ImodalDashboard {
  modalIsOpen: boolean;
  closeModal: () => void;
}

export const ModalDashboard = ({
  modalIsOpen,
  closeModal,
}: ImodalDashboard) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <ModalCreateContact closeModal={closeModal} />
    </Modal>
  );
};
