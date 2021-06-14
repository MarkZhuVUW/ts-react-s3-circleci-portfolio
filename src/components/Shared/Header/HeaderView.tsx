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
import {
  MuiTheme,
  useMuiTheme
} from "@employer-tracker-ui/components/GlobalProviders";
import React, { FC } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EmailIcon from "@material-ui/icons/Email";
import { MenuView } from "@employer-tracker-ui/components/Shared";
import { useHeader } from "./useHeader";
import { menuMap } from "@employer-tracker-ui/Utils";

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

const HeaderView: FC = () => {
  const classes = useStyles();
  const { theme } = useMuiTheme();
  const { handleThemeSwitchClick } = useHeader();

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
              <span>Source codes and contact can be found on the right.</span>
              {/* For decorative icons, set aira-hidden to true */}
              <ArrowForwardIcon aria-hidden="true" fontSize="large" />
              <ArrowForwardIcon aria-hidden="true" fontSize="large" />
              <ArrowForwardIcon aria-hidden="true" fontSize="large" />
            </Box>
          </Slide>
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
                <EmailIcon fontSize="large" />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>

        <Box>
          <MenuView
            menuItemsList={menuMap.githubLinksMenu.menuItemsList}
            label={menuMap.githubLinksMenu.label}
            menuIconRenderer={menuMap.githubLinksMenu.menuIconRenderer}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderView;
