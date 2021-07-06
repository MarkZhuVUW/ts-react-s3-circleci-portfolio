import React, { FC } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme, Typography, Button } from "@material-ui/core";
import { useSnackbar } from "./useSnackbarReducer";
import { SnackbarTypes } from "./types";

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
  const { open, message, severity, label, type } = snackbarStates;
  const Alert: FC<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const renderingSwitch = () => {
    switch (type) {
      case SnackbarTypes.newVersion:
        return (
          <Alert
            onClose={handleSnackbarClose}
            severity={severity}
            action={
              <Button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
              </Button>
            }
          >
            <Typography>{message}</Typography>
          </Alert>
        );
      default:
        return null;
    }
  };
  return (
    <div className={classes.root}>
      {open && (
        <Snackbar
          aria-label={label}
          key={label}
          open={open}
          onClose={handleSnackbarClose}
        >
          <>{renderingSwitch()}</>
        </Snackbar>
      )}
    </div>
  );
};

export default SnackbarView;
