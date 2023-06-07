import { Box, Typography } from "@mui/material";
import { AnimesArray, ShikiDomain } from "../constants/mock.anime";
import { isMobile } from "react-device-detect";
import { LineDivider } from "./LineDivider";
import { AnimeBox } from "./Animebox";

export function AnimeListSwipe({sizeFactor, title}){
    const animes = AnimesArray.filter((anime, idx)=>idx<=20)
    return(
        <>
        <Typography variant="h6">{title}</Typography>
        <LineDivider/>
           <Box sx={{transition:'0.3s',paddingBottom:'15px',marginTop:'10px',position:'relative',display:'flex', gap:'25px', overflowX:'auto'}}>
                {animes.map(anime=>(
                   <AnimeBox anime={anime} sizeFactor={sizeFactor}/>
                ))}
           </Box>
        </>
    )
}