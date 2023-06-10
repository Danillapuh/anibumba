import { Box, Button, ButtonBase, Grid, Typography } from "@mui/material";
import { BoxTile } from "../BoxTile";
import { RegisterWindow } from "./ReqisterWindow";
import { LineDivider } from "../LineDivider";
import { LoginWindow } from "./LoginWindow";
import { useState } from "react";

export function AuthWindow(){
    const authWindows = {
        register:{
            title: 'Регистрация',
            comp: <RegisterWindow/>,
            label: <Typography sx={{marginTop:'10px'}} variant="h8">Уже есть аккаунт?<Button size="small" onClick={()=>setCurrentWindow(authWindows.login)}>войти</Button></Typography>
        },
        login:{
            title: 'Вход',
            comp: <LoginWindow/>,
            label: <Typography sx={{marginTop:'10px'}} variant="h8">Нет аккаунта?<Button size="small" onClick={()=>setCurrentWindow(authWindows.register)}>создать</Button></Typography>
        }
    }
    const [currentWindow, setCurrentWindow] = useState(authWindows.login)
    return(
            <Grid lg={4} md={5} sm={8} xs={12}>
                <BoxTile style={{padding:'15px'}}>
                <Box sx={{display: 'flex', gap:'0px'}}>
                    <ButtonBase>
                        <Typography variant="h5">{currentWindow.title}</Typography>
                    </ButtonBase>
                </Box>
                <LineDivider/>
                {currentWindow.comp}
                {currentWindow.label}
            </BoxTile>
            </Grid>
    )
}