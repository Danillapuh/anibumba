import { IconButton } from "@mui/material"
export default function Buttoncarousel({callback, idx, current}){
    return(
        <IconButton onClick={()=>{callback(idx)}} sx={{flexGrow:'1'}} disableRipple={1}>
             <span style={idx==current ? {transition:'0.3s',height:'5px',minWidth:'10px',width:'75%',background:'#ff941a', borderRadius:'5px'}: {transition:'0.3s',height:'5px',minWidth:'10px',width:'100%',background:'white', borderRadius:'0px'}}></span>
        </IconButton>
    )
}