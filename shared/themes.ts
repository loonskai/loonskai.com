import { Theme } from '@emotion/react';

export const mainColor = '#51e8a7';
export const secondaryColor = '#00e0e0';
export const darkColor = '#414142';
export const errorColor = '#ff3783';
export const whiteColor = '#ffffff';
export const blackColor ='#2f2f2f';

export enum THEME {
  LIGHT,
  DARK,
}

export const themeValues = {
  [THEME.LIGHT]: {
    mainColor,
    secondaryColor,
    errorColor,
    text: {
      primary: darkColor,
      description: '#747474',
    },
    background: {
      primary: '#eae9e5',
      secondary: whiteColor,
    },
    menu: {
      activeLink: {
        color: blackColor,
        background: whiteColor,
      },
    },
    buttons: {
      default: {
        background: darkColor,
        color: whiteColor,
      },
      hover: {
        background: mainColor,
        color: blackColor,
      },
      disabled: {
        background: '#bababa',
        color: '#747474',
      },
    },
    inputs: {
      text: {
        color: darkColor,
      },
    },
    snippet: {
      background: darkColor,
    },
  },
  [THEME.DARK]: {
    mainColor,
    secondaryColor,
    errorColor,
    text: {
      primary: '#eae9e5',
      description: '#d1d1d1',
    },
    background: {
      primary: darkColor,
      secondary: blackColor,
    },
    menu: {
      activeLink: {
        color: whiteColor,
        background: blackColor,
      },
    },
    buttons: {
      default: {
        background: mainColor,
        color: darkColor,
      },
      hover: {
        background: darkColor,
        color: mainColor,
      },
      disabled: {
        background: '#bababa',
        color: '#747474',
      },
    },
    inputs: {
      text: {
        color: darkColor,
      },
    },
    snippet: {
      background: darkColor,
    },
  },
} as { [T in THEME]: Theme };
