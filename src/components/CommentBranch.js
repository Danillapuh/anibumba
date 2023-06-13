import { Box } from "@mui/material";
import { Comment } from "./Comment";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";

export function CommentBranch({replies, currentComment}){
    useEffect(()=>{console.log('brunch rerender')},[])
    const theme = useTheme()
    const repls = replies.filter((rep)=> rep.replyTo == currentComment.time)
    if(currentComment.time == 1686590978479){
        console.log('repls ', repls)
        console.log('replies ', replies)
    }
    console.log('CCCCCCCCc',currentComment)
    return(
        <>
        <Comment comment={currentComment}/>
        <Box sx={{transition:'0.2s',marginLeft:'15px', borderLeft:`1px solid ${theme.palette.action.disabledBackground}`, '&:hover':{borderLeft:`1px solid ${theme.custom.hoverLighter}`}}}>
            {repls.map(rep=>(
                <CommentBranch key={rep.time} currentComment={rep} replies={replies}/>
            ))}
        </Box>
        </>
    )
}