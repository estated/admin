import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: red[300],
      main: '#d32f30',
      dark: red[900],
      contrastText: '#FFF'
    },
    secondary: {
      light: '#FFF',
      main: '#FFF',
      dark: '#F0F0F0',
      contrastText: '#000'
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: grey[900],
      secondary: '#000',
      disabled: grey[900],
      hint: grey[900],
    },
    action: {
      primary: grey[500],
      secondary: grey[900],
      disabled: grey[900],
      hint: grey[900],
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: '1px 0px 0px 1px ' + red[900],
      }
    },
    MuiTypography: {
      display1: {
        fontWeight: 200,
        paddingBottom: '30px',
        color: '#FFF!important'
      }
    }
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
