import { Button, Input, MenuItem, Popover, Select, Box, CircularProgress, Typography, ButtonBase } from "@mui/material";
import { useRef, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { AnimeBox } from "./Animebox";
import { isMobile } from "react-device-detect";
import { Search } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export function SearchAnime({maxWidth, style}){
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const [isOpen, setIspone] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [animes, setAnimes] = useState([])
    const [strSearch, setStrSearch] = useState('')

    const handleClose = ()=>{
        setAnchorEl(null)
    }

    const fetchAnime = async()=>{
       if(strSearch.length >= 3){
        setAnimes([])
        setIsLoading(true)
        let resp = await fetch(`https://shikimori.me/api/animes?limit=20&search=${strSearch}`)
        if(resp.status >= 200 && resp.status<300){
            setAnimes(await resp.json())
        }
        setIsLoading(false)
       }
    }
    const focusHandler= (e)=>{
        if(animes.length){
            setIspone(true)
        }
       }
    return(
        <>
        <ClickAwayListener onClickAway={()=>setIspone(false)}>
            <Box sx={{ position:'relative',display: 'flex', width:'100%',maxWidth, justifyContent:'center'}}>
               {/*  <Select defaultValue={1} sx={{ color: 'white', background: '#1d354c' }}>
                    <MenuItem value={1}>Аниме</MenuItem>
                    <MenuItem value={2}>Манга</MenuItem>
                    <MenuItem value={3}>Персонажи</MenuItem>
                </Select> */}
                <input type="text" onFocus={focusHandler} onChange={(e) =>{setStrSearch(e.target.value)}} fullWidth placeholder="Поиск по ключевому слову или названию" style={{fontSize:'15px',color: theme.palette.text.primary,background:theme.custom.tileBg ,outline:'none',width:'100%',borderRadius: '5px',border:'none', padding: '15px', marginRight: '5px'}}></input>
                <ButtonBase onClick={()=>{fetchAnime();setIspone(true)}} variant="contained" sx={{ background: theme.custom.tileBg, color: theme.palette.text.primary }}><Search/></ButtonBase>
                    <Box sx={{zIndex:'100000',justifyContent:isMobile ? 'center' : 'left',padding: isMobile ? '10px 0px' : '10px 10px',background: theme.custom.tileBg,display: 'flex',flexWrap:'wrap',zIndex:'10000',gap:'15px',width:'100%',position:'absolute', left:'0',bottom:'-10px',minHeight: isOpen ? '350px' : '0px',maxHeight:isOpen ? '4000px' : '0px',opacity:isOpen ? '1' : '0',transition:'0.25s',overflowY:'auto', transform:'translateY(100%)'}}>
                        {isLoading ? <CircularProgress sx={{margin:'0 auto'}}/> : ''}
                        {animes.length ? animes.map(anime=>(
                           <AnimeBox sizeFactor={isMobile ? 190 : 200} anime={anime}/>
                        )) : ''}
                    </Box>
            </Box>
            </ClickAwayListener>
        </>
    )
}