import { Box, Typography } from "@mui/material";

export function TypographyWithIcon({title, icon, variant}){
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'5px'}}>
            {icon}
            <Typography variant={variant || 'h8'}>{title}</Typography>
        </Box>
    )
}