import { DashboardContext } from "@/contexts/ContactsContext";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { ModalCreateContact } from "./ModalCreateContact";
import { ModalDeleteContact } from "./ModalDeleteContact";
import { ModalEditClient } from "./ModalEditClient";
import { ModalEditContact } from "./ModalEditContact";
import { style } from "./styleMui";

interface ImodalDashboard {}

export const ModalDashboard = ({}: ImodalDashboard) => {
  const { closeModal, modalIsOpen, modalType } = useContext(DashboardContext);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        open={modalIsOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalIsOpen}>
          <Box sx={style}>
            {modalType == "registerContact" && <ModalCreateContact />}
            {modalType == "editContact" && <ModalEditContact />}
            {modalType == "deleteContact" && <ModalDeleteContact />}
            {modalType == "editClient" && <ModalEditClient />}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
