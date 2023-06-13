import { useTheme } from "@emotion/react";
import { BookmarkAdd, CheckCircle } from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addBookmarked, deleteBookmarked } from "../redux/user.slice";
import { auth, db } from "../firebase/firebase.config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { isMobile } from "react-device-detect";
import { useContext } from "react";
import { HeaderContext, modalContext } from "./header.layout";

export function Liked({id}){
    const user = useSelector((state)=>state.user.user)
    const {setModal} = useContext(HeaderContext)
    const theme = useTheme()
    const dispatch = useDispatch()
    const bookmarked = useSelector(state=>{
        console.log(typeof(state.user.bookmarked),JSON.stringify(state.user.bookmarked))
        return state.user.bookmarked
    })

    const handleMarked = ()=>{
        if(!user){
            setModal(true)
            return
        }
        if(bookmarked.indexOf(id) == -1){
            dispatch(addBookmarked(id))
            let docref = doc(db, 'users', auth.currentUser.uid)
            updateDoc(docref,{
                bookmarked: arrayUnion(id)
            })
            return
        }
        dispatch(deleteBookmarked(id))
        let docref = doc(db, 'users', auth.currentUser.uid)
            updateDoc(docref,{
                bookmarked: arrayRemove(id)
            })
        return
    }
    return(
        <ButtonBase onClick={handleMarked} sx={{width: '30%', opacity: isMobile ? 1 : 0, transition: '0.2s' }}>
            {bookmarked.indexOf(id) != -1 ? <CheckCircle sx={{ transition: '0.1s', '&:hover': { transform: isMobile ? '' : 'scale(1.2)', color: theme.palette.error.main }, color: theme.palette.error.dark, overflow: 'hidden' }} /> :
            <BookmarkAdd sx={{ transition: '0.1s', '&:hover': { transform: isMobile ? '' : 'scale(1.2)', color: theme.palette.error.main }, color: theme.palette.error.dark, overflow: 'hidden' }} />}
        </ButtonBase>
    )
}