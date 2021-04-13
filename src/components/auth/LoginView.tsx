import {
  AppBar,
  Button,
  Container,
  createStyles,
  CssBaseline,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  Zoom
} from "@material-ui/core";
import React, { FC } from "react";
import CodeIcon from "@material-ui/icons/Code";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      marginTop: "30vh"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.,
      marginTop: theme.spacing(1),
      flexDirection: "column"
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    root: {
      backgroundColor: "#E9EAED"
    },
    logo: {
      // width: "200px",
      // padding: "10px",
      marginLeft: "20%"
      // display: "flex"
      // marginRight: "10px",
      // display: "flex",
    },
    topBar: {
      justifyContent: "flex-start"
    },
    container: {
      // display: "flex",
      // margin: "auto",
      // alignItems: "center",
      // justifyContent: "center",
      height: "64vh"
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
        // borderColor: "#0084ff",
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
  // theme: Theme;
};
const LoginView: FC<LoginViewProps> = ({}: LoginViewProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.topBar}>
          <Slide direction="left" in={true} timeout={500}>
            <span className={classes.logo}>
              <CodeIcon />
            </span>
          </Slide>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" fixed className={classes.container}>
        <Zoom timeout={500} in={true}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Moon Baboon1
            </Typography>

            <form className={classes.form} noValidate>
              <FormControl margin="normal" fullWidth>
                <ValidationTextField
                  variant="outlined"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <ValidationTextField
                  variant="outlined"
                  // margin="normal"
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  type="password"
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
