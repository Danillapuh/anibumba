import { Bookmark, KeyboardArrowDownSharp, Settings } from "@mui/icons-material";
import { Box, Button, ButtonBase, Divider, Fade, Popper, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { BoxTile } from "../BoxTile";
import { ThemeContext } from "../../Theme/Theme.provider";
import { DarkTheme } from "../../Theme/Theme.provider";
import { useTheme } from "@emotion/react";
import { ThemeToggler } from "./ThemeToggler";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { LineDivider } from "../LineDivider";

export function ExtendSettingsMenu(){
    const user = useSelector(state=>state.user)
    const theme = useTheme()
    const toggleTheme = useContext(ThemeContext)
    const [isopen, setIsOpen] = useState(false)
    const anchorRef = useRef(null)

    const handleclick = (e)=>{
        setIsOpen(!isopen)
    }


    return(
        <>
            <Box sx={{position:'relative',display:'flex', alignItems:'center'}}>
                <ButtonBase disableRipple ref={anchorRef} onClick={handleclick}>
                    <KeyboardArrowDownSharp sx={{ color: 'white',transition:'0.2s', transform: isopen? 'rotate(180deg)' : 'rotate(0)' }} />
                </ButtonBase>
                {isopen ? <Fade in={isopen}><Box sx={{ boxShadow:'2px 5px 8px 0px rgb(0 0 0 / 44%)',height: isopen ? 'fit-content' : '0px',overflow:'hidden',opacity: isopen ? '1' : '0', transition:'opacity 0.1s',transform:'translateY(30%) translateX(-70%)',zIndex: '20000', position: 'absolute', left:'0', top:'0'}}>
                    <BoxTile style={{ margin: '0', padding:'10px' , background: theme.custom.contrastBg}}>
                        <Typography>{user.user.displayName}</Typography>
                        <Divider sx={{margin:'3px 0px'}}/>
                        <ButtonBase sx={{borderRadius: theme.shape.tileRadius,padding:'5px',display:'flex',gap:'5px',transition:'0.2s','&:hover': {background:theme.custom.hoverLighter}}}>
                            <Bookmark sx={{color: theme.palette.mode == 'dark' ? theme.palette.error.dark : theme.palette.error.light}}/>
                            <Typography sx={{whiteSpace:'nowrap'}}>Мои закладки</Typography>
                        </ButtonBase>
                        <Divider sx={{margin:'3px 0px'}}>
                            <Typography sx={{opacity:'0.7', fontSize:'14px'}}>тема</Typography>
                        </Divider>
                        <Box sx={{margin:'10px 10px'}}>
                            <ThemeToggler/>
                        </Box>
                        <Divider sx={{margin:'3px 0px'}}/>
                        <ButtonBase sx={{borderRadius: theme.shape.tileRadius,padding:'5px',display:'flex',gap:'5px',transition:'0.2s','&:hover': {background:theme.custom.hoverLighter}}}>
                            <Settings/>
                            <Typography sx={{whiteSpace:'nowrap'}}>Настройки</Typography>
                        </ButtonBase>
                        <Divider/>
                        <Box sx={{display:'flex', justifyContent:'center'}}>
                            <Button size="small" color="error" onClick={() => {
                                let auth = getAuth()
                                signOut(auth).then(() => {
                                    localStorage.clear()
                                })
                            }}>Выйти</Button>
                        </Box>
                    </BoxTile>
                </Box></Fade> : ''}
            </Box>
        </>
    )
}