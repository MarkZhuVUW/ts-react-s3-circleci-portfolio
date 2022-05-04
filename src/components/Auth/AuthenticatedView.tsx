import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Zoom
} from "@material-ui/core";
import React, { FC } from "react";
import { WebscraperPageView } from ".";
import { APIProvider } from "../API";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "100%" },
    container: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      }
    },
    icon: {
      height: "100%"
    }
  })
);

const AuthenticatedView: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" fixed className={classes.container}>
        <Zoom timeout={500} in={true}>
          <APIProvider>
            <WebscraperPageView />
          </APIProvider>
        </Zoom>
      </Container>
    </div>
  );
};
export default AuthenticatedView;
