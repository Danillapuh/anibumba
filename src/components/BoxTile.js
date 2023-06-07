import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

export function BoxTile({children}){
    const theme = useTheme()

    return(
        <Box sx={{ marginTop: '25px', padding: '5px', background: theme.custom.tileBg, borderRadius: '5px' }}>
            {children}
        </Box>
    )
}