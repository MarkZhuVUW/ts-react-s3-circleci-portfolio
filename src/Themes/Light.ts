import { blue } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

const LightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: blue[500]
    },
    background: {
      default: "#E0E0E0" // set the blank background color of all components to be light grey
    }
  }
});

export default LightTheme;
