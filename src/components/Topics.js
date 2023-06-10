import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import { ShikiDomain, TopicArray } from "../constants/mock.anime";
import { LongTile } from "./LongTile";
import { LineDivider } from "./LineDivider";
import { ImgLoad } from "./ImgLoad";
import { More, MoreHoriz, Person } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { BoxTile } from "./BoxTile";

export function Topics({topics, title}){
    const theme = useTheme()
    console.log(theme)

    function contentBody ({username, time}){
        return (
            <Box sx={{display:'flex'}}>
                <Typography variant="h8">{username}</Typography>
                <Typography variant="h8">{time}</Typography>
            </Box>
        )
    }

    return(
        <>
       <BoxTile>
        <Box sx={{borderRadius:'5px'}}>
            <Typography variant="h6" sx={{paddingLeft:'10px'}}>{title}</Typography>
            <LineDivider color="gray"/>
            <Box sx={{fontSize:'15px',display:'flex', flexDirection:'column', gap:'0px', padding:'5px'}}>
                {topics.map(topic=>(
                    <LongTile title={topic.topic_title} content={<Box sx={{display:'flex', gap:'15px'}}>
                        <Box sx={{display: 'flex', gap:'3px', alignItems:'center'}}>
                            <Person sx={{width:'15px', height:'15px'}}/>
                            <Typography variant="h8">{topic.user.nickname}</Typography>
                        </Box>
                        <Typography variant="h8" sx={{opacity:'0.5'}}>{new Date(topic.created_at).toDateString()}</Typography>
                    </Box>}/>
                ))}
                <ButtonBase sx={{borderRadius: theme.shape.tileRadius,background: theme.custom.basicButton,transition:'0.3s','&:hover':{background:theme.custom.basicButtonHover},display:'flex'}}>
                    <Typography variant="h7" sx={{color:'white'}}>Читать ещё</Typography>
                    <MoreHoriz  sx={{color:'white'}}/>
                </ButtonBase>
            </Box>
            </Box>
       </BoxTile>
        </>
    )
}