import { Box, ButtonBase, CircularProgress, Fade, Typography } from "@mui/material"
import { isMobile } from "react-device-detect"
import { ShikiDomain } from "../constants/mock.anime"
import { useContext, useEffect, useState } from "react"
import { BookmarkAdd, BookmarkAdded, CheckCircle, FavoriteBorder, TimeToLeave, Timelapse, Tv, Visibility } from "@mui/icons-material";
import { ImgLoad } from "./ImgLoad";
import { useTheme } from "@emotion/react";
import { Liked } from "./Liked";
import { auth } from "../firebase/firebase.config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function AnimeBox({anime, sizeFactor}){
    const theme = useTheme()
    const user = useSelector((state)=>state.user.user)
    const [loading, setLoading] = useState(true);

    const handleLoading = ()=>{
        setLoading(false)
    }
    return(
       <div style={{flexGrow:'1', display:'flex', justifyContent:'center'}}>
         <Box sx={{ userSelect:'none',fontSize:'14px','&:hover': {  cursor: 'pointer' },'&:hover button': { opacity:'1' }, '&:hover img': { filter: 'brightness(0.55)', cursor: 'pointer' }, borderRadius: theme.shape.tileRadius, display: 'flex',flexDirection: 'column', gap: '5px', overflow: 'hidden',width: `${(71 * sizeFactor) / 100}px` }}>
            <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'space-between',position: 'relative', height: `${sizeFactor}px` }}>
                {!loading ? <Fade in={!loading }>
                    <Box sx={{boxShadow: isMobile ? 'inset 3px 20px 20px 0px rgb(0 0 0 / 79%)' : '',display:'flex',justifyContent:'right',padding:'5px',position:'relative',zIndex:10}}>
                   <Liked id={anime.id}/>
                </Box>
                </Fade> : ''}
                <ImgLoad onLoaded={()=>setLoading(false)} src={ShikiDomain + anime.image.preview} sx={{transition:'0.4s',opacity: loading ? '0' : '1',width:'100%',borderRadius: theme.shape.tileRadius, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
                <Box sx={{transition:'0.4s',opacity: loading ? '0' : '1',display:'flex', alignItems:'flex-end',color:'white',position:'relative',zIndex:10,width:'100%',boxShadow:'0px -40px 30px -10px rgb(9 12 15 / 68%) inset', height:'100%'}}>
                    <Typography variant="h10" sx={{ padding:'3px',color:'white',overflow: 'hidden', 
                    whiteSpace: 'nowrap', textOverflow: 'ellipsis', 
                    maxWidth: '140px' }}>
                        {anime.episodes} серий/я
                    </Typography>
                </Box>
            </Box>
            <Link to={`/anime/${anime.id}`} style={{textDecoration:'none'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ textDecoration:'none',color:theme.palette.text.primary,'-webkit-box-orient': 'vertical', display:'-webkit-box','-webkit-line-clamp': '2',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }} variant="h8">{anime.russian || anime.name}</Typography>
                
            </Box>
            </Link>
        </Box>
       </div>
    )
}