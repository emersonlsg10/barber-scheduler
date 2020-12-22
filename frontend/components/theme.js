import { createMuiTheme } from '@material-ui/core/styles';
import { red, green, purple } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple.A700,
    },
    secondary: {
      main: '#fff',
    },
    success: {
      main: green.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
