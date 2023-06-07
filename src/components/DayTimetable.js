import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { ShikiDomain } from "../constants/mock.anime";

export function DayTimeTable({day_info, isOpen, onChange}){
    const [open, setOpen] = useState(isOpen || false)


    return(
        <>
            <Button onClick={()=>onChange(day_info)} fullWidth variant="outlined" color='error' sx={{maxWidth:'250px'}}>{day_info.name}</Button>
        </>
    )
}