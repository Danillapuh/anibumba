import React from "react"
import { Box } from "@mui/system"
export default class CarouselItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
              return    <Box sx={{minWidth: `${this.props.width}px`}}> <img draggable="false" className="img-anim" src={this.props.imgSrc}
                    style={{height:'auto', width:`${this.props.width}px`}}
                    ></img></Box>
    }
}