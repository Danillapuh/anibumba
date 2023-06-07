import logo from './logo.svg';
import './App.css';
import { HeaderLayout } from './components/header.layout';
import { AnimeTimetable } from './components/AnimeTimetable';
import { Avatar, Box, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import { AnimeListSwipe } from './components/AnimeListSwipe';
import { SearchAnime } from './components/search.comp';
import { AnimesArray, ClubsArray, ShikiDomain, TopicArray, UsersArray, newReleasedAnimes } from './constants/mock.anime';
import { AnimeBox } from './components/Animebox';
import { isMobile } from 'react-device-detect';
import { Topics } from './components/Topics';
import { LongTile } from './components/LongTile';
import { ImgLoad } from './components/ImgLoad';
import { LineDivider } from './components/LineDivider';
import { RemoveRedEye } from '@mui/icons-material';
import { SideBars } from './components/SideBars';
import { BoxTile } from './components/BoxTile';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from './firebase/firebase.config';

function App() {
  const auth = getAuth(app)
  console.log('auth',auth)
  
  const LightTheme = createTheme({
    custom: {
      tileBg: '#ffff',
      bodyBg: '#efefef',
      hoverLighter: '#efefef',
      headerBg: '#fd672b',
      basicButton: '#f47c36',
      basicButtonHover: '#f45936'
    }
  })

  const DarkTheme = createTheme({
    custom: {
      tileBg: '#252525',
      bodyBg: '#191919',
      hoverLighter: '#343434',
      headerBg: '#bf2b64',
      basicButton: '#673ab7',
      basicButtonHover: '#4b3ab7'
    },
    palette: {
      mode:'dark'
    }
  })
  const getTheme = ()=>{
    let theme = localStorage.getItem('theme')
    if(theme){
      document.documentElement.dataset.theme = theme == 'light' ? 'light' : 'dark'
      return theme == 'light' ? LightTheme : DarkTheme
    }
    return LightTheme
  }
  const [currentTheme, setcurrentTheme] = useState(getTheme())

  const toggleTheme = (isDark)=>{
    if(isDark){
      setcurrentTheme(DarkTheme)
      localStorage.setItem('theme', 'dark')
      return
    }
    setcurrentTheme(LightTheme)
    localStorage.setItem('theme', 'light')
  }
  document.body.style.background = currentTheme.custom.bodyBg
   return (
   <ThemeProvider theme={currentTheme}>
     <HeaderLayout isDark={currentTheme.palette.mode == 'dark'} toggleTheme={toggleTheme}>
      <Grid item container justifyContent={'center'} sx={{ gap: '20px', marginTop: '15px' }}>
        <Grid item xs={12} sm={11} md={7} lg={7}>
          <BoxTile>
            <SearchAnime/>
          </BoxTile>
          <BoxTile>
            <AnimeListSwipe title="Популярное" sizeFactor={175} />
          </BoxTile>
          <Grid item container sx={{gap:'15px', flexWrap:{md:'nowrap', sm:'wrap'}}}>
            <Grid item xs={12} md={6} sx={{  borderRadius: '5px',minHeight: '200px'}}>
                <Topics title="Последние новости" topics={TopicArray.filter((top,idx)=>idx<=5)}/>
            </Grid>
            <Grid item xs={12} md={6} sx={{ borderRadius: '5px',minHeight: '200px' }}>
               <Topics title="Новые обсуждения" topics={TopicArray.filter((top,idx)=>idx>=15 && idx<=20)}/>
            </Grid>
          </Grid>
          <BoxTile>
            <AnimeListSwipe title="Обновленное" sizeFactor={120} />
          </BoxTile>
          <BoxTile sx={{ marginTop: '25px', padding: '5px', background: '#ffff', borderRadius: '5px' }}>
            <AnimeTimetable/>
          </BoxTile>
          <Box sx={{ marginTop: '25px', borderRadius: '5px' }}>
            <SearchAnime/>
          </Box>
          <BoxTile sx={{overflow:'hidden',marginTop: '25px', padding: '20px', background: '#ffff', borderRadius: '5px'}}>
            <Typography variant='h6'>Недавно вышедшие тайтлы</Typography>
            <Box sx={{marginTop: '15px',display:'grid', 
            gridTemplateColumns:{lg:'repeat(6, 1fr)', md:'repeat(4, 1fr)', sm:'repeat(4, 1fr)', xs:'repeat(2, 1fr)'}, gap:'10px'}}>
              {newReleasedAnimes.map((anime=>(
                <AnimeBox key={anime.id} anime={anime} sizeFactor={isMobile ? 220 : 170}/>
              )))}
            </Box>
          </BoxTile>
       </Grid>
        <Grid item xs={12} sm={11} md={4} lg={2} sx={{ }}>
          <SideBars/>
          <BoxTile sx={{ marginTop:'25px',position: isMobile ? '' : 'sticky', top: '60px',display: 'flex', flexDirection: 'column', gap: '5px', padding: '5px', background: '#ffff', minHeight: '200px', borderRadius: '5px' }}>
                <Typography variant='h6'>Клубы</Typography>
                <LineDivider color="gray" />
                {ClubsArray.filter((_, idx) => idx <= 7).map(club => (
                    <LongTile content={club.name} img={<Avatar variant='square' sx={{ borderRadius: '3px', width: '35px', height: '35px' }}><ImgLoad src={ShikiDomain + club.logo.x96} /></Avatar>} />
                ))}
            </BoxTile>
        </Grid>
      </Grid>
    </HeaderLayout>
   </ThemeProvider>
  );
}

export default App;
