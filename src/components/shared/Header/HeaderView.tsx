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
import EmailIcon from "@material-ui/icons/Email";
import Menu from "../Menu/MenuContainer";
import { menuMap } from "../../../Utils";
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

type HeaderViewHandlersMap = {
  handleThemeChange: () => void;
};
type HeaderViewProps = {
  theme: MuiTheme;
  handlersMap: HeaderViewHandlersMap;
};

const HeaderView: FC<HeaderViewProps> = ({
  theme,
  handlersMap
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
              <span>Source codes and contact can be found on the right.</span>
              {/* For decorative icons, set aira-hidden to true */}
              <ArrowForwardIcon aria-hidden="true" />
              <ArrowForwardIcon aria-hidden="true" />
              <ArrowForwardIcon aria-hidden="true" />
            </Box>
          </Slide>
        </Box>
        <Box>
          <Tooltip title={`Toggle light/dark mode - Currently ${theme} mode.`}>
            <Switch
              checked={theme === MuiTheme.Dark}
              onChange={handlersMap.handleThemeChange}
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
                <EmailIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>

        <Box>
          <Menu
            menuItemsList={menuMap.githubLinksMenu.menuItemsList}
            label={menuMap.githubLinksMenu.label}
            element={menuMap.githubLinksMenu.element}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderView;
