import { DashboardContext } from "@/contexts/ContactsContext";
import { Icontacts } from "@/contexts/types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "../Button";

const theme = createTheme({
  palette: {
    primary: {
      main: "#41aeb5",
    },
  },
  typography: {
    fontSize: 24,
  },
});
interface ItableContactsProps {
  contacts: Icontacts[];
}
export const TableContacts = ({ contacts }: ItableContactsProps) => {
  const { openModal } = useContext(DashboardContext);
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      width: 200,
      disableColumnMenu: true,
      hideSortIcons: true,
    },

    {
      field: "email",
      headerName: "Email",
      width: 200,
      disableColumnMenu: true,
      hideSortIcons: true,
    },
    {
      field: "phone",
      headerName: "Telefone",
      width: 120,
      disableColumnMenu: true,
      hideSortIcons: true,
    },
    {
      field: "createdAt",
      headerName: "Registro",
      width: 100,
      disableColumnMenu: true,
      hideSortIcons: true,
    },

    {
      field: "edit",
      headerName: "Editar",
      width: 80,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params: GridCellParams) => (
        <Button
          type="button"
          style="buttonIcon"
          actionClick={() => openModal("editContact", params.row)}
        >
          <Image
            src={"/icon-edit.svg"}
            alt="edit contact"
            width={25}
            height={25}
          />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Excluir",
      width: 80,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params: GridCellParams) => (
        <Button
          type="button"
          style="buttonIcon"
          actionClick={() => openModal("deleteContact", params.row)}
        >
          <Image
            src={"/icon-delete.svg"}
            alt="delete contact"
            width={25}
            height={25}
          />
        </Button>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 300,
      disableColumnMenu: true,
      hideSortIcons: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: 400, width: "100%" }}>
        <DataGrid
          style={{ fontSize: "1.4rem" }}
          rows={contacts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </ThemeProvider>
  );
};
