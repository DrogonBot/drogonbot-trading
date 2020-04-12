import { createMuiTheme } from '@material-ui/core';

import { colors } from './Colors.constant';

// Check the default theme object at: https://material-ui.com/customization/default-theme/
// here we're just overwriting some values...
export const MUITheme = createMuiTheme({
  palette: {
    primary: {
      light: colors.lightBlue,
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: colors.white,
    },
    secondary: {
      light: colors.accentLight,
      main: colors.accent,
      dark: colors.accentDark,
      contrastText: colors.white,
    },
  },
});
