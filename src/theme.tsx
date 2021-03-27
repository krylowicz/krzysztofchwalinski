import { theme as chakraTheme } from '@chakra-ui/core'

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` }

const breakpoints = ['40em', '52em', '64em']

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
  },
  fonts,
  breakpoints,
  styles: {
    global: {
      "body": {
        width: "100vw",
        height: "100vh",
      },
      "#__next": {
        width: "100vw",
        height: "100vh",
      }
    }
  }
}

export default theme
