import { Box, Button, Divider, Typography } from "@mui/material";
import { BoxTile } from "../BoxTile";
import { LineDivider } from "../LineDivider";
import { useTheme } from "@emotion/react";
import { Chat, DoneAll, Email, EmailOutlined, EmailRounded, EmailSharp, PasswordOutlined, VerifiedOutlined } from "@mui/icons-material";
import { TypographyWithIcon } from "../TypographyWithIcon";
import { useContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { HeaderContext, modalContext } from "../header.layout";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase.config";

export function RegisterWindow(){
    const {setModal} = useContext(HeaderContext)
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordControl, setPasswordControl] = useState('')
    const [loading, setLoading] = useState(false)
    const theme = useTheme()

    const createUser = ()=>{
        const auth = getAuth()
        if(password.length>=6 && password == passwordControl & login.length>=3){
            setLoading(true)
            createUserWithEmailAndPassword(auth,email,password).then((user)=>{
                setDoc(doc(db, 'users', user.user.uid),{
                    likedAnimes: []
                })
                localStorage.setItem('likedAnimes', [])
                updateProfile(user.user,{
                    displayName: login
                })
                setLoading(false)
                setModal(false)
            }).catch((reason)=>{
                setLoading(false)
                console.log(reason)
            })
        }
    }
    return(
        <Box>
            <Box sx={{marginTop:'15px',display:'flex', justifyContent:'center', flexDirection:'column',gap:'5px'}}>
                <TypographyWithIcon title="Электронная почта" icon={<EmailOutlined sx={{width:'20px',height:'20px',opacity:'0.5'}}/>} />
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Введите адрес электронной почты" style={{fontSize: '15px', color: theme.palette.text.primary, background: theme.palette.action.selected, outline: 'none', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
            </Box>
            <Box sx={{marginTop:'15px',display:'flex', justifyContent:'center', flexDirection:'column',gap:'5px'}}>
                <TypographyWithIcon title="Логин" icon={<Chat sx={{width:'20px',height:'20px',opacity:'0.5'}}/>} />
            <input type="email" onChange={(e)=>setLogin(e.target.value)} placeholder="Будет виден всем на сайте" style={{fontSize: '15px', color: theme.palette.text.primary, background: theme.palette.action.selected, outline: 'none', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
            </Box>
            <Box sx={{marginTop:'15px',display:'flex', justifyContent:'center', flexDirection:'column',gap:'5px'}}>
                <TypographyWithIcon title="Пароль" icon={<PasswordOutlined sx={{width:'20px',height:'20px',opacity:'0.5'}}/>} />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Введите пароль" style={{fontSize: '15px', color: theme.palette.text.primary, background: theme.palette.action.selected, outline: 'none', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
            </Box>
            <Box sx={{marginTop:'15px',display:'flex', justifyContent:'center', flexDirection:'column',gap:'5px'}}>
            <TypographyWithIcon title="Подтверждение пароля" icon={<DoneAll sx={{width:'20px',height:'20px',opacity:'0.5'}}/>} />
            <input type="password" onChange={(e)=>setPasswordControl(e.target.value)} placeholder="Введите пароль повторно" style={{fontSize: '15px', color: theme.palette.text.primary, background: theme.palette.action.selected, outline: 'none', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
            </Box>
            <Button disabled={loading} onClick={createUser} sx={{opacity: loading? '0.5' : '1',marginTop:'15px',color: theme.custom.textColored, border:`1px solid ${theme.custom.textColored}`}}>Зарегестрироваться</Button>
       </Box>
    )
}