import { Button, Input, MenuItem, Popover, Select, Box, CircularProgress, Typography, ButtonBase } from "@mui/material";
import { useRef, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { AnimeBox } from "./Animebox";
import { isMobile } from "react-device-detect";
import { Search } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { BoxTile } from "./BoxTile";

export function SearchAnime({ maxWidth, style }) {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const [isOpen, setIspone] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [animes, setAnimes] = useState([])
    const strSearch = useRef('')

    const handleClose = () => {
        setAnchorEl(null)
    }

    const fetchAnime = async () => {
        if (strSearch.current.length >= 3) {
            setAnimes([])
            setIsLoading(true)
            let resp = await fetch(`https://shikimori.me/api/animes?limit=35&order=ranked&search=${strSearch.current}`)
            if (resp.status >= 200 && resp.status < 300) {
                setAnimes(await resp.json())
            }
            setIsLoading(false)
        }
    }
    const focusHandler = (e) => {
        if (animes.length) {
            setIspone(true)
        }
    }
    return (
        <>
            <Box sx={{opacity: isOpen ? '0.75' : '0', transition: ' opacity 0.1s', zIndex: '100', position: 'fixed', left: 0, top: 0, height: '150%', width: isOpen? '100%' : '0px', background: 'black'}}></Box>
            <BoxTile style={{ position: 'relative', zIndex: '100' }}>
                <ClickAwayListener onClickAway={() => setIspone(false)}>
                    <Box sx={{ alignItems:'center',display: 'flex', width: '100%', maxWidth, justifyContent: 'center' }}>
                        {/*  <Select defaultValue={1} sx={{ color: 'white', background: '#1d354c' }}>
                    <MenuItem value={1}>Аниме</MenuItem>
                    <MenuItem value={2}>Манга</MenuItem>
                    <MenuItem value={3}>Персонажи</MenuItem>
                </Select> */}
                        <input type="text" onFocus={focusHandler} onChange={(e) => { strSearch.current = e.target.value }} fullWidth placeholder="Поиск по ключевому слову или названию" style={{ fontSize: '15px', color: theme.palette.text.primary, background: theme.custom.tileBg, outline: 'none', width: '100%', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
                        <ButtonBase onClick={() => { fetchAnime(); setIspone(true) }} variant="contained" sx={{borderRadius: theme.shape.tileRadius,transition:'0.1s','&:hover':{background:theme.palette.action.hover},padding:'5px',height:'fit-content',background: theme.custom.tileBg, color: theme.palette.text.primary}}><Search sx={{transition:'0.2s'}}/></ButtonBase>
                        <Box sx={{ zIndex: '100000', justifyContent: isMobile ? 'center' : 'left', padding: isMobile ? '10px 0px' : '10px 0px', background: theme.custom.tileBg, display: 'flex', flexWrap: 'wrap', zIndex: '10000', gap: '15px', width: '100%',position: 'absolute', left: '0', bottom: '-10px', minHeight: isOpen ? '350px' : '0px',minWidth: isOpen ? '350px' : '0px',maxHeight: isOpen ? '4000px' : '0px',opacity: isOpen ? '1' : '0', transition: ' opacity max-height 0.1s', overflowY: 'auto', transform:'translateY(100%)'}}>
                            {isLoading ? <CircularProgress sx={{ margin: '0 auto' }} /> : ''}
                            {animes.length ? animes.map(anime => (
                                <AnimeBox key={anime.id} sizeFactor={isMobile ? 190 : 200} anime={anime} />
                            )) : ''}
                        </Box>
                    </Box>
                </ClickAwayListener>
            </BoxTile>
        </>
    )
}