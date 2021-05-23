export const mainColor = '#86ff6d';

export enum THEME {
  LIGHT,
  DARK,
}

export type ThemeValue = keyof typeof THEME;

export const themeValues = {
  [THEME.LIGHT]: {
    mainColor,
    textPrimary: '#414142',
    backgroundPrimary: '#eae9e5',
    backgroundSecondary: '#ffffff',
    buttons: {
      background: '#414142',
      color: '#ffffff',
    },
    snippet: {
      background: '#414142',
    },
  },
  [THEME.DARK]: {
    mainColor,
    textPrimary: '#eae9e5',
    backgroundPrimary: '#414142',
    backgroundSecondary: '#2f2f2f',
    buttons: {
      background: mainColor,
      color: '#414142',
    },
    snippet: {
      background: '#414142',
    },
  },
};
