import { ThemeContext, useTheme } from "@emotion/react";
import { More, MoreHorizRounded } from "@mui/icons-material";
import { Box, ButtonBase, Divider } from "@mui/material";
import React, { useState } from "react";

export function HideText({children}){
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const childrenCount = React.Children.count(children);
    return(
       <>
        {childrenCount ?  <Box>
        <Box sx={{display: open ? 'block' : 'none'}}>
            <Divider sx={{margin:'5px'}}/>
            {children}
        </Box>
        <ButtonBase disableRipple sx={{borderRadius: theme.shape.tileRadius, transition:'0.2s','&:hover':{background: theme.custom.hoverLighter},display:'inline-block'}} onClick={()=>setOpen(!open)}><MoreHorizRounded/></ButtonBase>
    </Box> : ''}
       </>
    )
}