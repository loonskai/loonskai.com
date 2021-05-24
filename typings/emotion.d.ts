import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    mainColor: string
    text: {
      primary: string
      description: string
    }
    background: {
      primary: string
      secondary: string
    },
    buttons: {
      background: string
      color: string
    }
    buttonsHover: {
      background: string
      color: string
    },
    snippet: {
      background: string
    }
  }
}
