import { configureStore } from '@reduxjs/toolkit'
import userreduser from './user.slice'

export default configureStore({
  reducer: {
    user: userreduser,
  },
})