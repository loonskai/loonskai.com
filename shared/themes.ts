export const mainColor = '#86ff6d';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const themeValues = {
  [THEMES.LIGHT]: {
    mainColor,
    textPrimary: '#414142',
    backgroundPrimary: '#eae9e5',
    backgroundSecondary: '#ffffff',
    buttons: {
      background: '#414142',
      color: '#ffffff',
    },
    code: {
      background: '#414142',
    },
  },
  [THEMES.DARK]: {
    mainColor,
    textPrimary: '#eae9e5',
    backgroundPrimary: '#414142',
    backgroundSecondary: '#2f2f2f',
    buttons: {
      background: mainColor,
      color: '#414142',
    },
    code: {
      background: '#414142',
    },
  },
};
