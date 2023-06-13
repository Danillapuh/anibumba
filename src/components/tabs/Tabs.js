import { useTheme } from "@emotion/react";
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";

export function Tabs({children, mainTab}){
    const theme = useTheme()
    const tabs = []
    const [currentTab, setCurrenttab] = useState(mainTab || null)
    return(
     <>
     <Box>
     <Box sx={{display:'flex',gap:'5px'}}>
         { children.map(child => {
        if (React.isValidElement(child)) {
          console.log('tab`s child props: ', child.props);
          tabs.push({id: child.props.idx, body: child})
          return <ButtonBase sx={{background: currentTab == child.props.idx ? theme.custom.hoverLighter : '' ,transition:'0.2s',borderRadius: theme.shape.tileRadius,'&:hover':{background: theme.custom.hoverLighter},flexGrow:isMobile ? '1' : '', padding:'8px 16px', opacity: currentTab == child.props.idx ? 1 : 0.6}} size="small" disabled={currentTab == child.props.idx} onClick={()=>setCurrenttab(child.props.idx)}>
            <Typography variant="h8" sx={{}}>{child.props.title}</Typography>
          </ButtonBase>
        }
        return null;
      })}
      </Box>
        {tabs.map(tab=>(
            <Box sx={{overflowX:'auto',transition:'opacity 0.2s',overflow:'hidden',display:'flex', opacity: currentTab == tab.id ? 1 : 0, maxHeight: currentTab == tab.id ? '20000px' : '0px',maxWidth: currentTab == tab.id ? '20000px' : '0px'}} >
                {tab.body}
            </Box>
        ))}
      </Box>
     </>
    )
}