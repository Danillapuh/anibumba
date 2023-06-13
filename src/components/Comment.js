
import { useTheme } from "@emotion/react"
import { Add, Replay, Reply } from "@mui/icons-material"
import { Avatar, Box, Button, ButtonBase, Typography } from "@mui/material"
import { useContext, useRef, useState } from "react"
import { isMobile } from "react-device-detect"
import { commentsContext } from "./Comments"


export function Comment({comment, onReply}){
    const commentRef = useRef(null)
    const [replyOpen, setReplyOpen] = useState(false)
    const {setReply, addComment} = useContext(commentsContext)
    const theme = useTheme()
    return(
        <>
        {comment ? <Box key={Math.random()} sx={{ borderRadius: theme.shape.tileRadius,padding:'5px',transition:'0.2s','&:hover':{background: theme.palette.action.hover},position:'relative',display: 'flex', gap: '10px', '&:hover svg':{opacity:1}}}>
            <ButtonBase onClick={()=>setReplyOpen(!replyOpen)} sx={{borderRadius: theme.shape.tileRadius,transition:'0.2s','&:hover':{background: theme.custom.hoverLighter},position:'absolute', bottom:0, right:0}}><Reply sx={{opacity: isMobile? 1 : 0,transition:'0.2s',color: theme.palette.action.disabled}}/></ButtonBase>
            <Box sx={{ borderRadius: theme.shape.tileRadius,/*  marginLeft: `${comment.level * 15}px`, borderLeft: comment.level ? `3px solid ${theme.palette.action.disabledBackground}` : 'none' */ }}>

            </Box>
            <Box sx={{width:'100%'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px' }}>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <Avatar variant="square" sx={{ width: '27px', height: '27px', borderRadius: theme.shape.tileRadius }} src={comment.user.imgURL} />
                        <Typography variant="h8" sx={{ fontSize: '14px' }}>{comment.user.displayName + ' - ' + comment.id + ' - '+ comment.replyTo}</Typography>
                        <Typography variant="h8" sx={{ fontSize: '14px', opacity: '0.7' }}>{new Date(comment.time).toLocaleDateString()}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h8">{comment.content}</Typography>
                    <Box sx={{ overflow:'hidden',transition:'0.3s', maxHeight: replyOpen ? '200px' : '0px',}}>
                    <input ref={commentRef} placeholder="Введите текст комментария" style={{ minHeight: replyOpen ? '30px' : '0px', 
                    background: theme.palette.action.hover, fontSize: '15px', color: theme.palette.text.primary, 
                    outline: 'none', width: '100%', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
                    <Button startIcon={<Add sx={{ color: theme.palette.text.secondary }} />} onClick={()=>addComment(commentRef.current.value, comment)} sx={{ '&:hover': { background: theme.custom.hoverLighter }, color: theme.palette.text.secondary, fontSize: '12px', background: theme.palette.action.hover, marginTop:'10px'}}>отправить</Button>
                    </Box>
                </Box>
            </Box>
        </Box> : ''}
        </>
    )
}