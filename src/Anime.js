import { doc, getDoc, setDoc } from "@firebase/firestore"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "./firebase/firebase.config"
import { Box, Divider, Grid, Typography } from "@mui/material"
import { ImgLoad } from "./components/ImgLoad"
import { ShikiDomain } from "./constants/mock.anime"
import { useTheme } from "@emotion/react"
import { BoxTile } from "./components/BoxTile"
import { isMobile } from "react-device-detect"
import { Liked } from "./components/Liked"
import { Tabs } from "./components/tabs/Tabs"
import { TabItem } from "./components/tabs/TabItem"
import { AnimeListSwipe } from "./components/AnimeListSwipe"
import { Star } from "@mui/icons-material"
import { HideText } from "./components/HideText"
import { useScroll } from "./components/hooks/useScroll"
import { HeaderContext } from "./components/header.layout"
import { Comments } from "./components/Comments"

export function AnimePage(){
    const {headerRef} = useContext(HeaderContext)
    const [animeData, setAnimeData] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const renderRef = useRef(0)
    const theme = useTheme()
    /* const scroll = useScroll() */
    const scrollref = useRef(0)

    const fetchAnime = ()=>{
        getDoc(doc(db, 'anime', `${id}`)).then(docSnap=>{
            if(docSnap.exists()){
                setAnimeData(docSnap.data())
                setLoading(false)
                return
            }
            fetch(`https://shikimori.one/api/animes/${id}`)
            .then(resp=>{if(resp.status == 200) return resp.json()})
            .then(data=>{
                setAnimeData(data)
                setLoading(false)
                setDoc(doc(db, 'anime', `${id}`), data)
            })
        })
    }
    /* useEffect(()=>{
        if(renderRef.current>1){
            window.location.reload()
        }
    },[id]) */
    useEffect(()=>{
        if(isMobile){
            if(loading) {
                headerRef.current.style.opacity = 0
                return
            }
            headerRef.current.style.background = 'transparent'
            headerRef.current.style.opacity = 1
            return ()=>{
                headerRef.current.style.background = theme.custom.headerBg
                headerRef.current.style.opacity = 1
            }
        }
    },[headerRef, loading])
    useEffect(()=>{
        if(isMobile){
            function handleScroll(){
                console.log('SCROLL is: ', window.scrollY)
                scrollref.current = window.scrollY;
                if(window.scrollY < 90){
                    headerRef.current.style.background = 'transparent'
                    return
                }
                console.log(theme.palette.mode)
                headerRef.current.style.background = theme.custom.headerBg
            }
            document.addEventListener('scroll', handleScroll)
            return ()=>{
                document.removeEventListener('scroll', handleScroll)
            }
        }
    },[])
    useEffect(()=>{
        renderRef.current = renderRef.current+1
        if(renderRef.current<=1)
            fetchAnime()
    },[])
    return(
      <>
      {animeData ? <>
                <Grid container justifyContent={'center'} sx={{marginTop: '60px',gap:{sm:'0px',md:'25px'}}}>
                    <Grid item xs={12} sm={4} md={3} lg={2} sx={{ display:'flex', justifyContent:'center',position:'relative'}}>
                       <Grid xs={8} sm={12} sx={{justifyContent:'center', overflow:'hidden'}}>
                       <Box sx={{height:'fit-content'}}>
                            <ImgLoad src={ShikiDomain + animeData.image.original} sx={{width:'100%', borderRadius: theme.shape.tileRadius}}/>
                        </Box>
                        <Box sx={{opacity:{xs:'1', sm:0},position:'absolute', left:0, bottom:0, width:'100%', minHeight:'70vh',zIndex:'-2'}}>
                            <img src={ShikiDomain + animeData.image.original} style={{top:'5px',position:'relative', filter: 'brightness(0.4)',width:'100%', height:'100%'}}></img>
                        </Box>
                        <Box sx={{backdropFilter:'blur(3px)',position:'absolute', left:0, bottom:0, width:'100%', minHeight:'80vh',zIndex:'-1'}}>
                        </Box>
                       </Grid>
                    </Grid>
                    <Grid item xs={12} sm={11} md={7} lg={8} sx={{ zIndex:'5',position:'relative',boxShadow:{xs: '-5px -14px 20px 0px rgb(36 36 36 / 60%)',sm:'-5px -14px 20px 0px rgb(36 36 36 / 0%)'} }}>
                        <Box sx={{ display: isMobile?'none' : 'flex', justifyContent:'space-between', marginBottom: '20px'}}>
                        <Box sx={{textAlign: 'left' }}>
                            <Typography variant="h6">{animeData.russian}</Typography>
                            <Typography variant="h8">{animeData.name}</Typography>
                            <HideText>
                                {animeData.synonyms?.map((syn)=>(
                                    <Typography sx={{display:'block'}} variant="h8">{syn}</Typography>
                                ))}
                                {animeData.japanese ? <Typography sx={{display:'block'}} variant="h8">{animeData.japanese}</Typography> : ''}
                            </HideText>
                        </Box>
                        <Box sx={{display:'flex', alignItems: 'flex-end'}}>
                        <Typography variant="h6" sx={{display:'flex', alignItems:'center'}}><Star sx={{color:theme.palette.warning.light,width:'28px', height:'28px'}}/>{animeData.score}</Typography>
                        </Box>
                        </Box>
                        <BoxTile style={{margin:0, position:'relative', top:'-5px', borderTop:isMobile? `1px solid ${theme.palette.action.disabledBackground}` : ''}}>
                            <Box sx={{display: isMobile?'flex' : 'none',textAlign:'center',flexDirection:'column', marginBottom:'15px'}}>
                                <Typography variant="h6">{animeData.russian}</Typography>
                                <Typography variant="h8">{animeData.name}</Typography>
                                <HideText>
                                {animeData.synonyms?.map((syn)=>(
                                    <Typography sx={{display:'block'}} variant="h8">{syn}</Typography>
                                ))}
                                {animeData.japanese ? <Typography sx={{display:'block'}} variant="h8">{animeData.japanese}</Typography> : ''}
                            </HideText>
                                <Box sx={{display:'flex', justifyContent:'center',gap:'15px'}}>
                                    <Typography variant="h8">{animeData.rating.replace('_','-').toUpperCase()}</Typography>
                                    <Typography variant="h8">{animeData.kind.toUpperCase()}</Typography>
                                    <Typography variant="h8" sx={{display:'flex', alignItems:'center'}}><Star sx={{color:theme.palette.warning.light,width:'22px', height:'22px'}}/>{animeData.score}</Typography>
                                </Box>
                            </Box>
                            <Divider/>
                            <Box>
                                <Tabs mainTab={1}>
                                    <TabItem title={`Информация`} idx={1}>
                                        <Typography>{`Информация о «${animeData.russian}»`}</Typography>
                                    </TabItem>
                                    <TabItem title={`Комметарии`} idx={2}>
                                        <Comments thread_id={animeData.thread_id}/>
                                    </TabItem>
                                    <TabItem title={`Обсуждения`} idx={3}>
                                     <AnimeListSwipe title="Популярное" sizeFactor={115} />
                                    </TabItem>
                                </Tabs>
                            </Box>
                        </BoxTile>
                    </Grid>
                </Grid>
      </> : ''}
      </>
    )
}