import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Zoom,
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";

import React, { FC } from "react";

import { useAuth } from "./useAuthReducer";
import GithubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "100%" },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10vh",
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10)
      },
      [theme.breakpoints.down("md")]: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    avatar: {
      margin: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },

    headerText: {
      marginLeft: "20%"
    },
    topBar: {
      justifyContent: "flex-start"
    },
    container: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      }
    },
    appBar: {
      display: "flex",
      justifyContent: "center"
    },
    icon: {
      height: "100%"
    }
  })
);

const LoginView: FC = () => {
  const classes = useStyles();
  const { authStates, handleSkipButtonClick } = useAuth();

  const { skipButtonLabel, githubAuthLabel } = authStates;

  return (
    <div className={classes.root}>
      <Container maxWidth="md" fixed className={classes.container}>
        <Zoom timeout={500} in={true}>
          <Paper className={classes.paper}>
            <Typography>
              Cache-first content served from service worker or CloudFront or S3
            </Typography>

            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Tooltip title={githubAuthLabel}>
                  <IconButton>
                    <GithubIcon className={classes.icon} fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Tooltip title={skipButtonLabel}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSkipButtonClick}
                  >
                    Skip Login
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      </Container>
    </div>
  );
};
export default LoginView;
