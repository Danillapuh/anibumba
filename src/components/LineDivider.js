import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

export function LineDivider({color}){
    const theme = useTheme()
    const colors = {
        gray: '#c8c8c8'
    }
    return(
        <Box sx={{height:'1px', background: theme.palette.divider}}></Box>
    )
}