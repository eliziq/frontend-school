import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './courses/coursesSlice'

export const store = configureStore({
    reducer: {
      courses: coursesReducer,
    //   comments: commentsReducer,
    //   users: usersReducer,
    },
  })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch