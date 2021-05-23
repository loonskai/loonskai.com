import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    mainColor: string
    textPrimary: string
    backgroundPrimary: string
    backgroundSecondary: string
    buttons: {
      background: string
      color: string
    }
    code: {
      background: string
    }
  }
}
