import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

const CustomizedSnackbar = ({ message, severity }) => {
  console.log("CustomizedSnackbar: ", message, severity);

  const [open, setOpen] = useState(false);
  const [state] = useState({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  useEffect(() => {
    if (message && severity) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 6000);
    } else {
      setOpen(false);
    }
  }, [message, severity]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (message && severity) {
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {/* <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert> */}
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  } else {
    return null;
  }
};

export default CustomizedSnackbar;
