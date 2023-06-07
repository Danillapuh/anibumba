import { Box, CircularProgress, Typography } from "@mui/material"
import { isMobile } from "react-device-detect"
import { ShikiDomain } from "../constants/mock.anime"
import { useEffect, useState } from "react"
import { TimeToLeave, Timelapse, Tv, Visibility } from "@mui/icons-material";
import { ImgLoad } from "./ImgLoad";

export function AnimeBox({anime, sizeFactor}){
   
    const [loading, setLoading] = useState(true);

    const handleLoading = ()=>{
        setLoading(false)
    }
    return(
       <div style={{flexGrow:'1', display:'flex', justifyContent:'center'}}>
         <Box sx={{ userSelect:'none',fontSize:'14px','&:hover': { backdropFilter: 'brightness(0.9)', cursor: 'pointer' }, '&:hover img': { filter: 'brightness(0.9)', cursor: 'pointer' }, borderRadius: '5px', display: 'flex',flexDirection: 'column', gap: '5px', overflow: 'hidden',width: `${(71 * sizeFactor) / 100}px` }}>
            <Box sx={{ display:'flex', alignItems:'flex-end',position: 'relative', height: `${sizeFactor}px` }}>
                <ImgLoad onLoaded={()=>setLoading(false)} src={ShikiDomain + anime.image.preview} sx={{transition:'0.4s',opacity: loading ? '0' : '1',width:'100%',borderRadius: '5px', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
                <Box sx={{transition:'0.4s',opacity: loading ? '0' : '1',display:'flex', alignItems:'flex-end',color:'white',position:'relative',zIndex:10,width:'100%',boxShadow:'0px -40px 30px -10px rgb(9 12 15 / 68%) inset', height:'100%'}}>
                    <Typography variant="h10" sx={{ padding:'3px',color:'white',overflow: 'hidden', 
                    whiteSpace: 'nowrap', textOverflow: 'ellipsis', 
                    maxWidth: '140px' }}>
                        {anime.episodes} серий/я
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '140px' }} variant="h8">{anime.russian || anime.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{display:'flex', justifyContent:'center', gap:'3px'}}>
                        {/* <Tv sx={{width:'15px' ,height:'15px'}}/> */}
                        <Typography variant="h8" sx={{ textTransform: 'uppercase' }}>{anime.kind}</Typography>
                    </Box>
                    <Typography variant="h8">{anime.score}</Typography>
                </Box>
            </Box>
        </Box>
       </div>
    )
}