import React, { FC } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useSnackbar } from "./useSnackbarReducer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const SnackbarView: FC = () => {
  const classes = useStyles();

  const { snackbarStates, handleSnackbarClose } = useSnackbar();
  const { open, message, severity, label } = snackbarStates;
  const Alert: FC<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  return (
    <div className={classes.root}>
      <Snackbar
        aria-label={label}
        key={label}
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarView;
