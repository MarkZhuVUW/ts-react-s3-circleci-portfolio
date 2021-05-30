import {
  AppBar,
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Slide,
  Switch,
  Toolbar,
  Theme,
  Tooltip,
  Link
} from "@material-ui/core";
import { Theme as MuiTheme } from "../../../contexts/ThemeContext";
import React, { FC } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1)
    },

    headerText: {
      marginLeft: "20%"
    },
    toolBar: {
      justifyContent: "flex-start"
    },
    appBar: {
      height: "6vh",
      display: "flex",
      justifyContent: "center",
      position: "relative"
    }
  })
);

type HeaderViewProps = {
  theme: MuiTheme;
  toggleLightDarkTheme: () => void;
};
const HeaderView: FC<HeaderViewProps> = ({
  theme,
  toggleLightDarkTheme
}: HeaderViewProps) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Box flexWrap="nowrap" flexGrow="1">
          <Slide direction="right" in={true} timeout={500}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              className={classes.headerText}
            >
              <span>Source codes and contact can be found here.</span>
              {/* For decorative icons, set aira-hidden to true */}
              <ArrowForwardIcon aria-hidden="true" />
              <ArrowForwardIcon aria-hidden="true" />
              <ArrowForwardIcon aria-hidden="true" />
            </Box>
          </Slide>
        </Box>
        <Box>
          <Tooltip title="Toggle light/dark mode">
            <Switch
              checked={theme === MuiTheme.Dark}
              onChange={toggleLightDarkTheme}
              aria-label="Toggle light/dark mode"
            />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Contact the developer">
            <IconButton aria-label="Contact the developer" color="inherit">
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Check out frontend source code" color="inherit">
            <Link
              href="https://github.com/MarkZhuVUW/spring-boot-aws-microservice"
              aria-label="Check out frontend source code"
            >
              <GitHubIcon />
            </Link>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Check out APLAKKA logging microservice source code">
            <IconButton color="inherit">
              <Link
                href="#"
                aria-label="Check out APLAKKA logging microservice source code"
              >
                <GitHubIcon />
              </Link>
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Check out general app backend microservice source code">
            <IconButton color="inherit">
              <Link
                href="#"
                aria-label="Check out general app backend microservice source code"
              >
                <GitHubIcon />
              </Link>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderView;
