import logo from './logo.svg';
import './App.css';
import { HeaderLayout } from './components/header.layout';
import { AnimeTimetable } from './components/AnimeTimetable';
import { Avatar, Box, Divider, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
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
import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from './firebase/firebase.config';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { LightTheme, DarkTheme, ThemeContext } from './Theme/Theme.provider';
import animes_norm from './animes_norm_full'

function App() {
  let a = 0
  animes_norm.forEach(anime => {
    a++
    if(a>10){
      break
    }
    alert(anime.id)
  });
  

  const getTheme = ()=>{
    let theme = localStorage.getItem('theme')
    if(theme){
      document.documentElement.dataset.theme = theme == 'light' ? 'light' : 'dark'
      return theme == 'light' ? LightTheme : DarkTheme
    }
    return LightTheme
  }
  const [currentTheme, setcurrentTheme] = useState(getTheme())

  useEffect(()=>{
    let theme = currentTheme?.palette?.mode
    if(theme){
      document.documentElement.dataset.theme = theme == 'light' ? 'light' : 'dark'
      localStorage.setItem('theme', theme)
    }
  },[currentTheme])
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
    <ThemeContext.Provider value={setcurrentTheme}>
      <Provider store={store}>
      <ThemeProvider theme={currentTheme}>
     <HeaderLayout isDark={currentTheme.palette.mode == 'dark'} toggleTheme={toggleTheme}>
      <Grid item container justifyContent={'center'} sx={{ gap: '20px', marginTop: '15px' }}>
        <Grid item xs={12} sm={11} md={8} lg={8}>
            <SearchAnime/>
          <BoxTile>
            <AnimeListSwipe title="Популярное" sizeFactor={175} />
          </BoxTile>
          <Grid item container sx={{justifyContent:'center',gap:'10px', flexWrap:{md:'nowrap', sm:'wrap'}}}>
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
          <BoxTile >
            <AnimeTimetable/>
          </BoxTile>
          <BoxTile >
            <Typography variant='h6'>Недавно вышедшие тайтлы</Typography>
            <Divider></Divider>
            <Box sx={{marginTop: '15px',display:'grid', 
            gridTemplateColumns:{lg:'repeat(7, 1fr)', md:'repeat(4, 1fr)', sm:'repeat(4, 1fr)', xs:'repeat(2, 1fr)'}, gap:'10px', rowGap:'25px'}}>
              {newReleasedAnimes.map((anime=>(
                <AnimeBox key={anime.id} anime={anime} sizeFactor={isMobile ? 220 : 170}/>
              )))}
            </Box>
          </BoxTile>
       </Grid>
        <Grid item xs={12} sm={11} md={3} lg={2} sx={{ }}>
          <SideBars/>
          <BoxTile>
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
    </Provider>
    </ThemeContext.Provider>
  
  );
}

export default App;
