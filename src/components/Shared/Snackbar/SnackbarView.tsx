import React, { FC } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Collapse, IconButton, useMediaQuery } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme, Typography, Button, Box } from "@material-ui/core";
import { useSnackbar } from "./useSnackbarReducer";
import { SnackbarTypes } from "./types";
import CloseIcon from "@material-ui/icons/Close";
import { AlertTitle } from "@material-ui/lab";

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

  const { snackbarStates, handleSnackbarClose, handleReloadButtonClick } =
    useSnackbar();

  const { open, message, severity, label, type } = snackbarStates;
  const Alert: FC<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const actionRenderingSwitch = () => {
    switch (type) {
      case SnackbarTypes.newVersion:
        return (
          <Box display="flex" flexDirection="row">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReloadButtonClick}
            >
              Reload
            </Button>
            <IconButton
              aria-label="Snackbar close icon"
              color="inherit"
              size="small"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <div className={classes.root}>
      <Snackbar
        aria-label={label}
        open={open}
        onClose={handleSnackbarClose}
        TransitionComponent={Collapse}
        ClickAwayListenerProps={{ mouseEvent: false }}
        key={label}
      >
        <Alert
          severity={severity}
          onClose={handleSnackbarClose}
          action={actionRenderingSwitch()}
        >
          <AlertTitle>{type}</AlertTitle>
          <Typography>{message}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarView;
