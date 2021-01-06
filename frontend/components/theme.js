import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EB961F',
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
    gray: {
      main: red.A400,
    },
    background: {
      primary: '#252525',
      default: '#fff',
      gray: '#cecece',
      lightGray: '#fefefe',
      darkGray: 'rgb(52,56,59)',
    },
  },
});

export default theme;
