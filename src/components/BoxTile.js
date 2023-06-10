import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

export function BoxTile({children, style}){
    const theme = useTheme()
    let styles
    if(style){
        styles = {...{ marginTop: '25px', padding: '5px', background: theme.custom.tileBg, borderRadius: theme.shape.tileRadius,...style}}
    }
    else{
        styles = { marginTop: '25px', padding: '5px', background: theme.custom.tileBg, borderRadius: theme.shape.tileRadius}
    }
    return(
        <Box sx={styles}>
            {children}
        </Box>
    )
}