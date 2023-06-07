import { fontSize } from "@mui/system";
import { ButtonBase } from "@mui/material";
export default function InfoButtonCarousel({title, callback, index, current}){
    return(
        <ButtonBase disableRipple onClick={()=>{callback(index)}}>
            <div className="info-butn" style={index==current ? {transition:'0.4s',borderTop:'3px solid rgb(255, 104, 14)',padding:'5px',overflow:'hidden',textOverflow:'ellipsis',color:'white',height:'50px', maxWidth:'200px', background:'#515762', fontSize:'14px'} : {transition:'0.4s',borderTop:'3px solid transparent',opacity:'0.9',padding:'5px',overflow:'hidden',textOverflow:'ellipsis',color:'white',height:'50px', maxWidth:'200px', background:'rgb(45, 52, 64)', fontSize:'14px'}}>
                <span>{title}</span>
            </div>
        </ButtonBase>
    )
}