import { createSlice } from '@reduxjs/toolkit'

const initialState = { user: undefined, theme: true, bookmarked: [], liked: []}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    setBookmarked(state, action) {
      state.bookmarked = action.payload
    },
    addBookmarked(state, action) {
      state.bookmarked.push(action.payload)
      localStorage.setItem('bookmarked', JSON.stringify(state.bookmarked))
    },
    addLiked(state, action) {
      state.liked.push(action.payload)
      localStorage.setItem('liked', state.liked)
    },
    setLiked(state, action) {
      state.liked = action.payload
    },
    deleteBookmarked(state, action) {
      state.bookmarked = state.bookmarked.filter(bookmark=>bookmark != action.payload)
      localStorage.setItem('bookmarked', JSON.stringify(state.bookmarked))
    },
    deleteLiked(state, action) {
      state.liked.filter(like=>action.payload.indexOf(like) == 1)
      localStorage.setItem('liked', state.liked)
    }
  },
})

export const { setUser, setTheme, setBookmarked, setLiked, deleteBookmarked, deleteLiked, addBookmarked, addLiked } = userSlice.actions
export default userSlice.reducer