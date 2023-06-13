import { useTheme } from "@emotion/react"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { createContext, useContext, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { HeaderContext } from "./header.layout"
import { auth, db } from "../firebase/firebase.config"
import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "@firebase/firestore"
import { Comment } from "./Comment"
import { Add, Download } from "@mui/icons-material"
import { CommentBranch } from "./CommentBranch"

export const commentsContext = createContext()
export function Comments({thread_id}){
    const [comments, setComments] = useState([])
    const [replyComment, setReplyComment] = useState()
    const [replyies, setReplyies] = useState([])
    const theme = useTheme()
    const user = useSelector(state=>{
        return state.user.user
    })
    const {setModal} = useContext(HeaderContext)
    const commentRef = useRef(null)
    
    const loadComments = ()=>{
        const collRef = collection(db, 'comments')
        const resp = query(collRef, orderBy('time', 'desc'), where('thread_id', '==', thread_id), limit(40))
        getDocs(resp).then((snap)=>{
            const commentsMain= []
            const commentsReply = []
            snap.forEach((e)=>{
                let data = e.data()
                data.id = e.id
                if(!data.parentComment){
                    console.log('1',data)
                    commentsMain.push(data)
                }
                else{
                    console.log('2',data)
                    commentsReply.push(data)
                }
            })
            setComments([...commentsMain])
            setReplyies([...commentsReply])
        })
    }

    const addComment = (commentBody, replyCommentTo)=>{
        if(!user){
            setModal(true)
            return
        }
       const newComment = {
        user:{
            displayName: auth.currentUser.displayName,
            imgURL: auth.currentUser.photoURL,
            uid: auth.currentUser.uid
        },
        content: commentBody,
        thread_id,
        time: new Date().getTime(),
        level: replyCommentTo? replyCommentTo.level+1 : 0,
        likes: [],
        dislikes: [],
        replyTo: replyCommentTo ? replyCommentTo.id || replyCommentTo.id   : null,
        parentComment: replyCommentTo ? replyCommentTo.parentComment || replyCommentTo.id : null
       }
       let docRef = doc(db, 'comments', `${new Date().getTime()}`)
       setDoc(docRef, newComment) 
       console.log('new comment', newComment)

       if(!replyCommentTo){
        setComments([...comments, newComment])
        return
       }
       setReplyies([...replyies, newComment])
    }

    const handleReply = (comment)=>{
        setReplyComment(comment)
    }


    useState(()=>{
        console.log('REP',replyies)
    },[replyies])

    return(
        <>
            <commentsContext.Provider value={{
                setReply: setReplyComment,
                addComment
            }}>
                <Box>
                    {JSON.stringify(replyies.length)} + {JSON.stringify(comments.length)}
                    <Comment comment={replyComment} />
                    <input ref={commentRef} placeholder="Введите текст комментария" style={{ minHeight: '30px', background: theme.palette.action.hover, fontSize: '15px', color: theme.palette.text.primary, outline: 'none', width: '100%', borderRadius: '5px', border: 'none', padding: '15px', marginRight: '5px' }}></input>
                    <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button startIcon={<Add sx={{ color: theme.palette.text.secondary }} />} onClick={addComment} sx={{ '&:hover': { background: theme.custom.hoverLighter }, color: theme.palette.text.secondary, fontSize: '12px', background: theme.palette.action.hover }}>отправить</Button>
                        <Button startIcon={<Download sx={{ color: theme.palette.text.secondary }} />} onClick={loadComments} sx={{ '&:hover': { background: theme.custom.hoverLighter }, color: theme.palette.text.secondary, fontSize: '12px', background: theme.palette.action.hover }}>загрузить</Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {comments?.map(comment => {
                        return (
                            <>
                                <CommentBranch key={comment.time} replies={replyies} currentComment={comment} />
                            </>
                        )
                    })}
                </Box>
            </commentsContext.Provider>
        </>
    )
}