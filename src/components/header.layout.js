import { Box, Button, Grid, Input, MenuItem, Select, Typography } from "@mui/material";
import CringeCarousel from "./CringeCarousel";
import { isMobile } from "react-device-detect";
import { AnimeListSwipe } from "./AnimeListSwipe";
import { Book, ExitToApp, LiveTv, Movie, Person, Search, Shuffle } from "@mui/icons-material";
import { SearchAnime } from "./search.comp";
import { useTheme } from "@emotion/react";

export function HeaderLayout({ children, isDark, toggleTheme }) {
    const theme = useTheme()
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa',theme)
    const navLinks = [
        { href: '#', name: 'Аниме', icon: <LiveTv/> },
        { href: '#', name: 'Манга', icon: <Book/> },
        { href: '#', name: 'Персонажи', icon: <Person/> },
        { href: '#', name: 'Случайное Аниме', icon: <Shuffle/> }
    ]
    return (
        <>
            <Grid container justifyContent={"center"} sx={{gap:'20px',paddingTop:'65px',position: 'relative'}}>
                {/* <Box sx={{ filter: 'saturate(0.3)', position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', background: 'url("https://i.etsystatic.com/34721648/r/il/be9f1b/4675756154/il_fullxfull.4675756154_l17y.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' }} />
                <Box sx={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', backdropFilter: 'blur(0px) brightness(0.32)' }} /> */}
                <Grid xs={12} md={12} item sx={{ zIndex: '20000000', position: 'fixed', left:0,top:0,background: theme.custom.headerBg, overflow: 'hidden', width:'100%',padding: '10px', display: 'flex', justifyContent: 'space-between', gap: '25px', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant="h4">Anibuba</Typography>
                        <Box sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                            {navLinks.map(link => (
                                <Typography component={'a'} variant="h12" sx={{ display:'flex',gap:'5px', alignItems:'center',padding: '5px 10px', transition: '0.3s', color: 'white', opacity: '0.85', '&:hover': { cursor: 'pointer', backdropFilter: 'brightness(0.85)', opacity: '1', borderRadius: '5px' } }}>
                                    {link.icon}{link.name}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <Button onClick={()=>toggleTheme(!isDark)} startIcon={<ExitToApp sx={{color:'white'}}/>} size={isMobile ? '' : 'small'} sx={{borderColor:'#e03f3f', color:'white'}}>Войти</Button>
                </Grid>
                {children}
            </Grid>
        </>
    )
}