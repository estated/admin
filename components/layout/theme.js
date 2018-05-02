import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {

      light: red[800],
      main: red[900],
      dark: red[900],
      contrastText: grey[50]
    },
    secondary: {
      light: grey[50],
      main: '#FFFFFF',
      dark: grey[200],
      contrastText: red[900]
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: grey[900],
      secondary: grey[900],
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
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        // background: `linear-gradient(45deg, ${grey[200]} 30%, ${red[900]} 100%)`,
        borderRadius: 3,
        border: 0,
        color: grey[200],
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
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
