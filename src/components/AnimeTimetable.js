import {Avatar, Box, Button, ButtonGroup, Typography} from '@mui/material'
import { useEffect, useRef, useState } from "react";
import { DayTimeTable } from './DayTimetable';
import { DaysArray, ShikiDomain } from '../constants/mock.anime';
import { isMobile } from 'react-device-detect';
import styled from '@mui/material';
import { LineDivider } from './LineDivider';
import { useTheme } from '@emotion/react';

export function AnimeTimetable(){
    const [updated, setUpdated] = useState(false)
    const [AnimeTimetable, setTable] = useState(DaysArray)
    const [currentDay, setCurrentDay] = useState({key: new Date().getDay()})
    const [currentBtn, setCurrentBtn] = useState(null)

    const curbtn = useRef(null)
    const thumb = useRef(null)
    const theme = useTheme()

    useEffect(()=>{
        if(updated) localStorage.setItem('tb',JSON.stringify(AnimeTimetable))
    },[updated])

    useEffect(()=>{
        let table = localStorage.getItem('tb');
        if(table){
            setTable(JSON.parse(table))
            return
        }
        fetchTimetable()
    },[])

    useEffect(()=>{
        let currentDay = new Date().getDay()
        let dayinfo = AnimeTimetable.filter((day)=>day.key == currentDay)
        setCurrentDay(...dayinfo)
    },[AnimeTimetable])

    useEffect(()=>{
       if(curbtn || currentBtn){
        console.log(curbtn.current, currentBtn)
        let axis = currentBtn ? currentBtn.getBoundingClientRect() : curbtn.current?.getBoundingClientRect()
        console.log(axis)
        if(axis){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop
            thumb.current.style.left = `${axis.x}px`
            thumb.current.style.top = `${axis.y+scrollTop+axis.height}px`
            thumb.current.style.width = `${axis.width}px`
        }
       
       }
    },[curbtn, currentBtn])

    const fetchTimetable = async()=>{
        let resp = await fetch('https://shikimori.one/api/calendar')
        if(resp.status >=200 && resp.status <300){
            let animes = await resp.json()
            setTable(AnimeTimetable.map(day=>(
                {
                    name: day.name,
                    key: day.key,
                    animes: animes.filter(anime=>new Date(anime.next_episode_at).getDay() == day.key && new Date(anime.next_episode_at).getMonth() == new Date().getMonth())
                }
            )))
            setUpdated(true)
        }
    }

    return (
        <>
            <Typography variant='h6' sx={{textDecoration:'outline'}}>Расписание выхода серий</Typography>
            <LineDivider color={'gray'}/>
            <Box sx={{ display: 'flex',flexDirection: 'row', gap: '10px', maxWidth: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                <Box ref={thumb} sx={{ transition: '0.25s', position: 'absolute', zIndex: '1', width: '50px', height: '2px',background: theme.palette.warning.main, display: isMobile ? 'none' : 'block' }}></Box>
                {AnimeTimetable.map(day => (
                    <Box>
                        <Button
                            /* size='small' */
                            ref={currentDay?.key === day.key ? curbtn : null}
                            onClick={(e) => { setCurrentDay([]);setCurrentDay(day); setCurrentBtn(e.target) }}
                            sx={{ color: currentDay?.key === day.key ? theme.palette.warning.main : theme.palette.text.primary, background: currentDay?.key === day.key ? '' : ''}}
                        >
                            {day.name}
                        </Button>
                    </Box>
                ))}
            </Box>
            <Box>
                <Box sx={{ padding: '10px 0px', transition: '0.4s', display: 'grid', overflowX: 'hidden', justifyContent: { sm: 'center' }, gridTemplateColumns: { lg: '30% 30% 30%', sm: '50% 50%' }, flexDirection: 'row', gap: '15px' }}>
                    {currentDay?.animes?.map(animes => (
                       <div key={animes.anime.url} className='timetable-tile'>
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '150px' }}>
                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <Avatar src={ShikiDomain + animes.anime.image.x96} variant='square' sx={{ borderRadius: '3px', width: 40, height: 40 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h8" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '200px', overflow: 'hidden' }}>{animes.anime.russian || animes.anime.name}</Typography>
                                    <Typography variant="h8" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '200px', overflow: 'hidden' }}>{animes.next_episode} серия в {new Date(animes.next_episode_at).getHours()}:{new Date(animes.next_episode_at).getMinutes()}</Typography>
                                </Box>
                            </Box>
                        </Box>
                       </div>
                    ))}
                </Box>
            </Box>
        </>
    )
}