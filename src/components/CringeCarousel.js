import './carousel.css'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CarouselItem from './CarouselItem'
import { useState } from 'react'
import {IconButton} from '@mui/material'
import { ArrowRight } from '@mui/icons-material'
import { useRef } from 'react'
import { useEffect } from 'react'
import {Button} from '@mui/material'
import { isMobile } from 'react-device-detect'
import Buttoncarousel from './Buttoncarousel'
import InfoButtonCarousel from './InfoButtonCarousel'
import ButtonBase from '@mui/material'

export default function CringeCarousel(){
    const resizeHandlers = []
    const titles = ['Может, я встречу тебя в подземелье?','Is It Wrong to Try to Pick Up Girls in a Dungeon?','Kamisama no Memochou','Heaven`s Memo Pad','Mawaru Penguindrum','buba','NIER: AUTOMATA']
    const [offsetScroll, setOffsetScroll] = useState([])
    const [offset, setOffset] = useState(0);
    const [urlImg, setUrlImg] = useState(['https://static.crunchyroll.com/fms/landscape_poster/960x540/afbb701e-6e94-4406-92c1-ee5431b21af8.png','https://static.crunchyroll.com/fms/landscape_poster/960x540/aa77246d-5c07-4749-8140-cf3c8980febb.png','https://static.crunchyroll.com/fms/landscape_poster/960x540/00309597-b5e9-451c-bc63-7af40a998381.png', 'https://static.crunchyroll.com/fms/landscape_poster/960x540/f499eac5-7e72-4f1e-bcdd-26a90cb9c06d.png','https://static.crunchyroll.com/fms/landscape_poster/960x540/6dd9eaca-6c5e-4d6a-98d7-2dbb11c1e373.png','https://static.crunchyroll.com/fms/landscape_poster/960x540/58f917a3-1526-464f-8cbd-fc4f4883a506.jpg','https://static.crunchyroll.com/fms/landscape_poster/960x540/91b64a2b-6cd6-4dc6-bd42-005f92deffb5.png'])
    const [carouselItem, setCarouselItem] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const boxRef = useRef(null);
    const widthref = useRef(null);
    const gap = 300;
    const [imgWidth, setImgWidth] = useState(0)
    const [swipeOffset, setSwipeOffset] = useState(0)
    const [swipeOffsetStart, setSwipeOffsetStart] = useState(0)
    const [isDrag, setIsDrag] = useState(false)

    const movehandler = (e)=>{
        setOffset((swipeOffsetStart-e.touches[0].clientX))
        boxRef.current.style.transform = `translateX(${-offsetScroll[currentItem]-(swipeOffsetStart-e.touches[0].clientX)}px)`
    }
    useEffect(()=>{
        if(isDrag){
            widthref.current.addEventListener('touchmove', movehandler)
        }
       else{
        widthref.current.removeEventListener('touchmove', movehandler)
       }
    },[isDrag,swipeOffsetStart,movehandler])


    useEffect(()=>{
        if(isDrag == false){
            if(offset>0){
                if(currentItem+1 == urlImg.length){
                    boxRef.current.style.transform = `translateX(${-offsetScroll[currentItem]}px)` 
                }
                else{
                    listNext()
                }
            }
            else{
                if(currentItem == 0){
                    boxRef.current.style.transform = `translateX(${0}px)`
                }
                else{
                  listPrev()
                }
            }
        }
        console.log('grag is ',isDrag)
    },[isDrag])
  
    const listNext = ()=>{
        if(currentItem+1 == urlImg.length){
            setCurrentItem(currentItem)
        }
        else{
            setCurrentItem(currentItem + 1)
        }
        
    }
    const listPrev = ()=>{
        if(currentItem == 0){
            setCurrentItem(currentItem)
        }
        else{
            setCurrentItem(currentItem - 1)
        }
    }
    const listCarousel = (idx)=>{
        console.log('bu')
        setCurrentItem(idx)
    }

    const listCarouselPrev = ()=>{
        console.log('BUBAA')
   }
   useEffect(()=>{
    boxRef.current.style.transform = `translateX(${-offsetScroll[currentItem]}px)`
   },[currentItem])
//при создании компонента
    useEffect(()=>{
        

        widthref.current.addEventListener('touchstart', function(e){
            setIsDrag(true)
            setSwipeOffsetStart(e.touches[0].clientX)
        })
        document.addEventListener('touchend', function(e){
            setIsDrag(false)
           
            
        })

        setImgWidth(widthref.current.getBoundingClientRect().width)
        let a = boxRef.current;
        let off = a.getBoundingClientRect().width+gap
        
        let carouselNodes = []
        a.childNodes.forEach((element, idx) => {
           
            carouselNodes.push(off*idx)
        });
        
        setOffsetScroll(carouselNodes)
        
        function onresize(){
            setImgWidth(widthref.current.getBoundingClientRect().width)
            boxRef.current.style.transform = `translateX(0px)`
            setCurrentItem(0)
            let newNodes = []
                setOffset(a.childNodes[0].getBoundingClientRect().width + gap)
                let off2 = a.childNodes[0].getBoundingClientRect().width+gap
                a.childNodes.forEach((element, idx) => {
            newNodes.push(off2*idx)
        });


        setOffsetScroll(newNodes)
        }

        window.addEventListener('resize', onresize) 
        resizeHandlers.push(onresize)
        return ()=>{
            resizeHandlers.forEach(e=>{
                window.removeEventListener('resize', e);
            })
        }

    },[])

    useEffect(() => {
        if(!isDrag){
            let sliderAnim = setInterval(() => {
                setCurrentItem((currentItem) => (currentItem + 1) % urlImg.length);
              }, 4000);
              return () => clearInterval(sliderAnim);
        }
      
      }, [currentItem, urlImg.length,isDrag]);


    return(
        <>
            <div className='main-carousel' style={isMobile ? {padding:'5px'} : {padding:'10px'}}>
                <Grid container sx={{zIndex:'30',display: 'flex', justifyContent:'center'}}>
                <Grid xs={12} sm={11} md={7} xl={6} sx={{paddingTop:'', overflow:'hidden'}} ref={widthref}>
                    <Box sx={isDrag ? {display:'flex', width:'100%', transition:'0s ease-in-out', gap:`${gap}px`} : {display:'flex', width:'100%', transition:'0.4s ease-in-out', gap:`${gap}px`}} ref={boxRef}>
                        {urlImg.map(img=>(
                            <CarouselItem key={img} imgSrc={img} width={parseInt(imgWidth)}/>
                        ))}
                    </Box>
                </Grid>
                </Grid>
            </div>
            <Box sx={!isMobile ? {zIndex:'30',justifyContent:'center',marginTop:'25px',color:'red',display: 'flex', gap:'10px'} : {zIndex:'30',justifyContent:'center',color:'red',margin:'5px',display: 'flex', width: `95%`, gap:'10px'}}>
                    {offsetScroll.map((img, idx)=>(
                        !isMobile ?  <InfoButtonCarousel title={titles[idx]} callback={listCarousel} index={idx} current={currentItem}/>: <Buttoncarousel callback={listCarousel} idx={idx} current={currentItem}/>
                    ))}
                    {(true) ? <></> : <> <Button variant='contained' onClick={listPrev} disabled={currentItem==0}>prev</Button>
                    <Button variant='contained' onClick={listNext} disabled={currentItem+1==urlImg.length}>next</Button></>}
                </Box>
        </>
    )
}