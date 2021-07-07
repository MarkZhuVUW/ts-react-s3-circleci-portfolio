import {
  Button,
  Container,
  createStyles,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Theme,
  withStyles,
  Zoom,
  Typography
} from "@material-ui/core";

import React, { FC } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { HeaderView } from "@employer-tracker-ui/components/Shared";
import { HeaderProvider } from "../Shared/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "100vh" },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "23vh",
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
    form: {
      width: "100%", // Fix IE 11 issue.,
      marginTop: theme.spacing(1),
      flexDirection: "column"
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
    }
  })
);
const ValidationTextField = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "& input:valid + fieldset": {
        borderWidth: 1
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 1
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderDownWidth: 6,
        padding: "4px !important", // override inline-style
        borderColor: "#73A7FF"
      },
      appBarSpacer: theme.mixins.toolbar
    }
  })
)(TextField);

type LoginViewProps = {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};
const LoginView: FC<LoginViewProps> = ({
  showPassword,
  setShowPassword
}: LoginViewProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderProvider>
        <HeaderView />
      </HeaderProvider>
      <Container maxWidth="md" fixed className={classes.container}>
        <Zoom timeout={500} in={true}>
          <Paper className={classes.paper}>
            <Typography>
              Cache-first content served from service worker or CloudFront or S3
              123
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <FormControl margin="normal" fullWidth>
                <ValidationTextField
                  variant="outlined"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={{ "aria-label": "Email Address" }}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <ValidationTextField
                  variant="outlined"
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  inputProps={{ "aria-label": "Password" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle login password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>

              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <p style={{ fontWeight: "bold" }}>Register</p>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Zoom>
      </Container>
    </div>
  );
};
export default LoginView;
