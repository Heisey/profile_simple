
import * as B from '@heisey/componentlib'

const defaultTheme: B.Core.I.Theme = B.Core.config.themes.light

const background = '#060c21'

export const theme: B.Core.I.Theme = {
  ...defaultTheme,
  app: {
    ...defaultTheme.app,
    backgroundColor: background
  },
  button: {
    ...defaultTheme.button,
    PRIMARY: {
      fg: background,
      bg: 'lime'
    },
    radius: '2px'
  },
  inputs: {
    ...defaultTheme.inputs,
    color: 'lime'
  },
  modal: {
    ...defaultTheme.modal,
    background: background
  },
  typography: {
    ...defaultTheme.typography,
    LIGHT: '#CCCCCC'
  }
}