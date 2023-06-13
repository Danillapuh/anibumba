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

export function Indexpage(){
    return(
      
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

    )
}