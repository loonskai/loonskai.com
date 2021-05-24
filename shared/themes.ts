import { Theme } from '@emotion/react';

export const mainColor = '#86ff6d';

export enum THEME {
  LIGHT,
  DARK,
}

export const themeValues = {
  [THEME.LIGHT]: {
    mainColor,
    text: {
      primary: '#414142',
      description: '#747474',
    },
    background: {
      primary: '#eae9e5',
      secondary: '#ffffff',
    },
    buttons: {
      background: '#414142',
      color: '#ffffff',
    },
    buttonsHover: {
      background: mainColor,
      color: '#2f2f2f',
    },
    snippet: {
      background: '#414142',
    },
  },
  [THEME.DARK]: {
    mainColor,
    text: {
      primary: '#eae9e5',
      description: '#d1d1d1',
    },
    background: {
      primary: '#414142',
      secondary: '#2f2f2f',
    },
    buttons: {
      background: mainColor,
      color: '#414142',
    },
    buttonsHover: {
      background: '#414142',
      color: mainColor,
    },
    snippet: {
      background: '#414142',
    },
  },
} as { [T in THEME]: Theme };
