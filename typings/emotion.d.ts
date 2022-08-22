import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    mainColor: string
    secondaryColor: string
    errorColor: string
    text: {
      primary: string
      description: string
    }
    background: {
      primary: string
      secondary: string
    }
    menu: {
      activeLink: {
        color: string
        background: string
      }
    }
    buttons: {
      default: {
        background: string
        color: string
      }
      hover: {
        background: string
        color: string
      }
      disabled: {
        background: string
        color: string
      }
    }
    inputs: {
      text: {
        color: string
      }
    }
    snippet: {
      background: string
    }
  }
}
