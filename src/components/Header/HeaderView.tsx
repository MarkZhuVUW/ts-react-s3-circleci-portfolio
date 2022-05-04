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
  Link,
  Typography,
  Grid,
  useMediaQuery
} from "@material-ui/core";
import {
  MuiTheme,
  useMuiTheme
} from "@portfolio-ui/components/GlobalProviders";
import React, { FC } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EmailIcon from "@material-ui/icons/Email";
import { MenuView } from "@portfolio-ui/components";
import { useHeader } from "./useHeaderReducer";
import { MenuProvider } from "../Menu";

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
      display: "flex",
      justifyContent: "center",
      position: "relative"
    },
    icon: {
      height: "100%"
    }
  })
);

const HeaderView: FC = () => {
  const classes = useStyles();
  const { theme } = useMuiTheme();
  const { handleThemeSwitchClick } = useHeader();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Box flexWrap="nowrap" flexGrow="1">
          {/* For decorative icons, set aira-hidden to true */}

          {isSmallScreen && (
            <Slide direction="right" in={true} timeout={500}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.headerText}
              >
                <Typography>Code</Typography>
                <ArrowForwardIcon
                  aria-hidden="true"
                  fontSize="large"
                  className={classes.icon}
                />
              </Box>
            </Slide>
          )}
          {!isSmallScreen && (
            <Slide direction="right" in={true} timeout={500}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.headerText}
              >
                <Typography>
                  Source codes and contact can be found on the right.
                </Typography>
                <ArrowForwardIcon
                  aria-hidden="true"
                  fontSize="large"
                  className={classes.icon}
                />
                <ArrowForwardIcon
                  aria-hidden="true"
                  fontSize="large"
                  className={classes.icon}
                />
                <ArrowForwardIcon
                  aria-hidden="true"
                  fontSize="large"
                  className={classes.icon}
                />
              </Box>
            </Slide>
          )}
        </Box>
        <Box>
          <Tooltip title={`Toggle light/dark mode - Currently ${theme} mode.`}>
            <Switch
              checked={theme === MuiTheme.Dark}
              onChange={handleThemeSwitchClick}
              inputProps={{
                "aria-label": `Toggle light/dark mode - Currently ${theme} mode.`
              }}
            />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Contact the developer">
            <Link
              href="mailto:zdy120939259@outlook.com?subject=Interview Invitation"
              color="inherit"
            >
              <IconButton aria-label="Contact the developer" color="inherit">
                <EmailIcon className={classes.icon} fontSize="large" />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>

        <Grid>
          <MenuProvider>
            <MenuView />
          </MenuProvider>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderView;
