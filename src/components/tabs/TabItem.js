import { Box } from "@mui/material";

export function TabItem({children, title, idx}){
    return(
        <Box sx={{marginTop:'20px', width:'100%'}}>
            {children}
        </Box>
    )
}