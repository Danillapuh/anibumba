import { useTheme } from "@emotion/react"
import { Box, ButtonBase, Switch } from "@mui/material"
import { useContext } from "react"
import { DarkTheme, LightTheme, ThemeContext} from "../../Theme/Theme.provider"
import { NightsStay, WbTwilight } from "@mui/icons-material"

export function ThemeToggler(){
    const theme = useTheme()
    const toggle = useContext(ThemeContext)

    const toggleTheme = ()=>{
        if(theme.palette.mode == 'light'){
            toggle(DarkTheme)
            return
        }
        toggle(LightTheme)
            return
    }
    return(
       <Box sx={{display:'flex', justifyContent:'space-around'}}>
        <ButtonBase onClick={toggleTheme} disableRipple disabled={theme.palette.mode == 'dark'} sx={{opacity: theme.palette.mode == 'dark'? 0.6 : 1}}>
            <NightsStay sx={{background: theme.palette.action.hover, padding:'5px', borderRadius:theme.shape.tileRadius}}/>
        </ButtonBase>
        <ButtonBase onClick={toggleTheme} disableRipple disabled={theme.palette.mode == 'light'} sx={{opacity: theme.palette.mode == 'light'? 0.6 : 1}}>
            <WbTwilight sx={{background: theme.palette.action.hover, padding:'5px', borderRadius:theme.shape.tileRadius}}/>
        </ButtonBase>
       </Box>
    )
}