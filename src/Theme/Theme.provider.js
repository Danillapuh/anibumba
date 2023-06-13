import { createTheme } from "@mui/material"
import { createContext } from "react"

export const LightTheme = createTheme({
    custom: {
      tileBg: '#ffff',
      bodyBg: '#efefef',
      hoverLighter: 'rgba(0, 0, 0, 0.09)',
      headerBg: '#3f51b5',
      basicButton: '#3f51b5',
      basicButtonHover: '#3949a1',
      textColored: '#fd672b',
      contrastBg: '#ffffff'
    },
    shape:{
      tileRadius: '4px'
    }
  })

  export const DarkTheme = createTheme({
    custom: {
      tileBg: '#202020',
      bodyBg: '#141414',
      hoverLighter: '#2f2f2f', // #343434
      headerBg: '#343434',      // #673ab7
      basicButton: '#3f3e3e', // #673ab7'
      basicButtonHover: '#4b3ab7',
      textColored: '#8d58eb',
      contrastBg: '#343434'
    },
    palette: {
      mode:'dark'
    },
    shape:{
      tileRadius: '4px'
    }
  })

  export const ThemeContext = createContext(null)