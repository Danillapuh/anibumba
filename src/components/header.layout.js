import { Avatar, Box, Button, ButtonBase, Dialog, DialogContent, DialogTitle, Fade, Grid, Input, MenuItem, Popper, Select, Typography } from "@mui/material";
import CringeCarousel from "./CringeCarousel";
import { isMobile } from "react-device-detect";
import { AnimeListSwipe } from "./AnimeListSwipe";
import { Book, ExitToApp, KeyboardArrowDownSharp, LiveTv, Movie, Person, Search, Shuffle, ToggleOff } from "@mui/icons-material";
import { SearchAnime } from "./search.comp";
import { useTheme } from "@emotion/react";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { BoxTile } from "./BoxTile";
import Modal from '@mui/material/Modal';
import { AuthWindow } from "./Auth/AuthWindow";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarked, setUser } from "../redux/user.slice";
import { ExtendSettingsMenu } from "./header/ExtendSettingsMenu";
import { Link } from "react-router-dom";
export const HeaderContext = createContext()

export function HeaderLayout({ children, isDark, toggleTheme }) {
    const headerRef = useRef(null)
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
    
    const theme = useTheme()
    const navLinks = [
        { href: '#', name: 'Аниме', icon: <LiveTv sx={{width:'20px', height:'20px'}}/> },
        { href: '#', name: 'Манга', icon: <Book  sx={{width:'20px', height:'20px'}}/> },
        { href: '#', name: 'Персонажи', icon: <Person sx={{width:'20px', height:'20px'}}/> },
        { href: '#', name: 'Случайное Аниме', icon: <Shuffle sx={{width:'20px', height:'20px'}}/> }
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
        <>  <HeaderContext.Provider value={{
            setModal: setModalOpen,
            headerRef
        }}>
          <Grid container justifyContent={"center"} sx={{gap:'20px',paddingTop:{md:'65px', xs:'30px'},position: 'relative'}}>
                <Modal onClose={()=>setModalOpen(false)} open={modalOpen} sx={{background:'rgb(0 0 0 / 70%)',zIndex:'1000',justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <AuthWindow open={modalOpen}/>
                </Modal>
                <Grid ref={headerRef} xs={12} md={12} item sx={{ transition:'0.2s',boxShadow:'rgb(24 24 24 / 0%) 2px 5px 8px 0px',zIndex: '1000', position: 'fixed', left:0,top:0,background: theme.custom.headerBg, width:'100%',padding: '7px', display: 'flex', justifyContent: 'space-between', gap: '25px', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Link to="/" style={{textDecoration:'none'}}><Typography sx={{ fontSize:{xs:'1.75rem',md:'1.9rem'},color: 'white', fontWeight: 'bold' }} variant="h4"><span style={{color: '#d76457'}}>A</span>nibuba</Typography></Link>
                        <Box sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' }, gap: '0px' }}>
                            {navLinks.map(link => (
                                <Typography component={'a'} variant="h8" sx={{ fontSize:'0.9rem',display:'flex',gap:'5px', alignItems:'center',padding: '5px 10px', transition: '0.3s', color: 'white', opacity: '0.85', '&:hover': { cursor: 'pointer', backdropFilter: 'brightness(0.85)', opacity: '1', borderRadius: theme.shape.tileRadius}}}>
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
            </HeaderContext.Provider>
        </>
    )
}