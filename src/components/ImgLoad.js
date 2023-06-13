import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export function ImgLoad({src, sx, onLoaded}){
    const [loaded, setLoaded] = useState(false)
    let imgRef = useRef(null)
    let loadRef = useRef(null)
    let parentref = useRef(null)
    const [curSrc, setSrc] = useState(null)
    const [startLoading, setStartLoading] = useState(false)

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
         if(entry.isIntersecting){
            setStartLoading(true)
            setSrc(src)
         }
        });
      };
    let options = {
        rootMargin: "0px",
        threshold: 0.1,
      };
      
      let observer = new IntersectionObserver(callback, options);

      useEffect(()=>{
        if(curSrc){
            observer.disconnect()
        }
      },[curSrc])

      useEffect(()=>{
        if(imgRef.current){
            observer.observe(imgRef.current)
        }
      },[imgRef])

    const handleLaoded = ()=>{
        setLoaded(true)
        if(onLoaded){
            onLoaded()
        }
    }
    return(
        <>
            {<Skeleton variant="rounded" sx={{width:'100%',height:'100%',left:0, top:0,position:'absolute',display: !loaded && startLoading ? 'block' : 'none'}}/>}
            <img ref={imgRef} onLoad={handleLaoded} src={curSrc} style={sx}/>
            <Box ref={parentref} sx={{display: loaded ? 'none' : 'block',position:'absolute', left:'0', top:'0', height:'100%',width:'100%', backdropFilter:'brightness(0.90)'}}/>
        </>
    )
}