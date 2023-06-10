import { Box, Button, Divider, Typography } from "@mui/material";
import { BoxTile } from "../BoxTile";
import { LineDivider } from "../LineDivider";
import { useTheme } from "@emotion/react";
import { DoneAll, Email, EmailOutlined, EmailRounded, EmailSharp, PasswordOutlined, VerifiedOutlined } from "@mui/icons-material";
import { TypographyWithIcon } from "../TypographyWithIcon";
import { useContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { modalContext } from "../header.layout";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase.config";

export function LoginWindow(){
    const setModalOpen = useContext(modalContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordControl, setPasswordControl] = useState('')
    const [loading, setLoading] = useState(false)
    const theme = useTheme()

    const createUser = ()=>{
        const auth = getAuth()
            setLoading(true)
            signInWithEmailAndPassword(auth,email,password).then((value)=>{
                setLoading(false)
                setModalOpen(false)
                const userRefdoc = doc(db,'users', auth.currentUser.uid)
                getDoc(userRefdoc).then(docSnap=>{
                    if(docSnap.exists()){
                        let data = docSnap.data()
                        localStorage.setItem('bookmarked', JSON.stringify(data.bookmarked))
                        window.location.reload()
                    }
                })
            }).catch((reason)=>{
                setLoading(false)
                console.log(reason)
            })
    }
    return(
        <Box>
            <Box sx={{marginTop:'15px',display:'flex', justifyContent:'center', flexDirection:'column',gap:'5px'}}>
                <TypographyWithIcon title="Электронная почта" icon={<EmailOutlined sx={{width:'20px',height:'20px',opacity:'0.5'}}/>} />
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Введите адрес электронной почты" style={{fontSize: '15px', color: theme.palette.text.primary, background: theme.palette.action.selected, outline: 'none', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
            </Box>
            <Box sx={{marginTop:'15px',display:'flex', justifyContent:'center', flexDirection:'column',gap:'5px'}}>
                <TypographyWithIcon title="Пароль" icon={<PasswordOutlined sx={{width:'20px',height:'20px',opacity:'0.5'}}/>} />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Введите пароль" style={{fontSize: '15px', color: theme.palette.text.primary, background: theme.palette.action.selected, outline: 'none', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
            </Box>
            <Button disabled={loading} onClick={createUser} sx={{opacity: loading? '0.5' : '1',marginTop:'15px',color: theme.custom.textColored, border:`1px solid ${theme.custom.textColored}`}}>Войти</Button>
       </Box>
    )
}