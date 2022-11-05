import { configureStore, current } from '@reduxjs/toolkit'
import wordsReducer from './words/wordsSlice'

const store = configureStore({
  reducer: {
    words: wordsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store