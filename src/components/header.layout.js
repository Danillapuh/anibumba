import { Avatar, Box, Button, ButtonBase, Dialog, DialogContent, DialogTitle, Fade, Grid, Input, MenuItem, Popper, Select, Typography } from "@mui/material";
import CringeCarousel from "./CringeCarousel";
import { isMobile } from "react-device-detect";
import { AnimeListSwipe } from "./AnimeListSwipe";
import { Book, ExitToApp, KeyboardArrowDownSharp, LiveTv, Movie, Person, Search, Shuffle, ToggleOff } from "@mui/icons-material";
import { SearchAnime } from "./search.comp";
import { useTheme } from "@emotion/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { BoxTile } from "./BoxTile";
import Modal from '@mui/material/Modal';
import { AuthWindow } from "./Auth/AuthWindow";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarked, setUser } from "../redux/user.slice";
import { ExtendSettingsMenu } from "./header/ExtendSettingsMenu";
export const modalContext = createContext()

export function HeaderLayout({ children, isDark, toggleTheme }) {
    const user = useSelector((state)=>state.user.user)
    const dispatch = useDispatch()
    const auth = getAuth();
   onAuthStateChanged(auth,(user)=>{
    if(user){
        /* alert('user1',JSON.stringify(user)) */
    }
    dispatch(setUser(user))
   })
    const [modalOpen, setModalOpen] = useState(false)
    const call = useCallback(()=>{
        alert('a')
    },[])
    const theme = useTheme()
    const navLinks = [
        { href: '#', name: 'Аниме', icon: <LiveTv/> },
        { href: '#', name: 'Манга', icon: <Book/> },
        { href: '#', name: 'Персонажи', icon: <Person/> },
        { href: '#', name: 'Случайное Аниме', icon: <Shuffle/> }
    ]
    useEffect(()=>{
        const liked = localStorage.getItem('liked')
        const bookmarked = localStorage.getItem('bookmarked')
        try{
                if(bookmarked){
                    let bookmark = JSON.parse(bookmarked)
                    dispatch(setBookmarked(bookmark))
                }
                else{
                    localStorage.removeItem('bookmarked')
                }
        }
        catch{
            localStorage.removeItem('bookmarked')
        }
    },[])
    return (
        <>
            <Grid container justifyContent={"center"} sx={{gap:'20px',paddingTop:{md:'65px', xs:'30px'},position: 'relative'}}>
                <Modal onClose={()=>setModalOpen(false)} open={modalOpen} sx={{background:'rgb(0 0 0 / 70%)',zIndex:'1000',justifyContent:'center', alignItems:'center', display:'flex'}}>
                      <modalContext.Provider value={setModalOpen}>
                         <AuthWindow/>
                      </modalContext.Provider>
                </Modal>
                <Grid xs={12} md={12} item sx={{ zIndex: '1000', position: 'fixed', left:0,top:0,background: theme.custom.headerBg, width:'100%',padding: '7px', display: 'flex', justifyContent: 'space-between', gap: '25px', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Typography sx={{ fontSize:{xs:'1.75rem',md:'2.125rem'},color: 'white', fontWeight: 'bold' }} variant="h4">Anibuba</Typography>
                        <Box sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                            {navLinks.map(link => (
                                <Typography component={'a'} variant="h12" sx={{ display:'flex',gap:'5px', alignItems:'center',padding: '5px 10px', transition: '0.3s', color: 'white', opacity: '0.85', '&:hover': { cursor: 'pointer', backdropFilter: 'brightness(0.85)', opacity: '1', borderRadius: theme.shape.tileRadius}}}>
                                    {link.icon}{link.name}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    {user
                        ?
                        <Fade in={Boolean(user)}>
                            <Box sx={{ display: 'flex', gap: '5px' }}>
                            <ExtendSettingsMenu />
                            <Avatar sx={{ width:{xs:'35px',md:'45px'},height:{xs:'35px',md:'45px'},borderRadius: theme.shape.tileRadius, background: '#ffff', color: 'black' }} src={user?.photoURL} />
                        </Box>
                        </Fade>
                        :
                        !(user === undefined) ?
                            <Fade in={!Boolean(user)}>
                                <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Button onClick={() => setModalOpen(true)} startIcon={<ExitToApp sx={{ color: 'white' }} />} size={isMobile ? '' : 'small'} sx={{ transition: '0.2s', borderColor: '#e03f3f', color: 'white', '&:hover': { cursor: 'pointer', backdropFilter: 'brightness(0.85)', opacity: '1', borderRadius: theme.shape.tileRadius } }}>Войти</Button>
                                <Button onClick={() => toggleTheme(!isDark)} startIcon={<ToggleOff sx={{ color: 'white' }} />} size={isMobile ? '' : 'small'} sx={{ transition: '0.2s', borderColor: '#e03f3f', color: 'white', '&:hover': { cursor: 'pointer', backdropFilter: 'brightness(0.85)', opacity: '1', borderRadius: theme.shape.tileRadius } }}>Смена темы</Button>
                            </Box>
                            </Fade>
                            : ''}
                </Grid>
                {children}
            </Grid>
        </>
    )
}