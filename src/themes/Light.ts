import { blue, green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const muiThemeLight = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: blue[500]
    },
    secondary: {
      main: green[500]
    },
    background: {
      default: "#E9EAED" // set the blank background color of all components to be light grey
    }
  }
});

export default muiThemeLight;
