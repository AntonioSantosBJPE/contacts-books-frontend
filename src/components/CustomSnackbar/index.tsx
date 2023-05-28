import { AuthContext } from "@/contexts/AuthContext";
import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";

export const CustomSnackbar = ({}) => {
  const { snackBar, handleCloseSnackBar, snackBarType, snackBarMessage } =
    useContext(AuthContext);
  return (
    <Snackbar
      open={snackBar}
      autoHideDuration={2200}
      onClose={handleCloseSnackBar}
    >
      {snackBarType == "success" ? (
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%", fontSize: "2rem" }}
        >
          {snackBarMessage}
        </Alert>
      ) : (
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%", fontSize: "2rem" }}
        >
          {snackBarMessage}
        </Alert>
      )}
    </Snackbar>
  );
};
