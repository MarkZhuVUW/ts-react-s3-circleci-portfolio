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
  Zoom
} from "@material-ui/core";

import React, { FC } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { HeaderView } from "@employer-tracker-ui/components/Shared";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    root: {},
    headerText: {
      marginLeft: "20%"
    },
    topBar: {
      justifyContent: "flex-start"
    },
    container: {
      height: "71vh"
    },
    appBar: {
      height: "6vh",
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
      <HeaderView />

      <Container maxWidth="md" fixed className={classes.container}>
        <Zoom timeout={500} in={true}>
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate>
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
