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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: "25%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "5%",
      paddingBottom: "5%",
      paddingLeft: "15%",
      paddingRight: "15%"
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
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
    },
    logo: {
      width: "200px",
      padding: "10px",
      marginLeft: "20%"
      // marginRight: "10px",
      // display: "flex",
    },
    topBar: {
      backgroundColor: "white",
      justifyContent: "flex-start"
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

type LoginProps = {
  // theme: Theme;
};
const Login: FC<LoginProps> = ({}: LoginProps) => {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "#E9EAED" }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.topBar}>
          <Slide direction="right" in={true} timeout={500}>
            <div>111</div>
          </Slide>

          <Typography variant="h5" noWrap></Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" className={classes.content}>
        <Zoom timeout={500} in={true}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              moon baboon
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
                  <p style={{ fontWeight: "bold" }}>register</p>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Zoom>
      </Container>
    </div>
  );
};
export default Login;
