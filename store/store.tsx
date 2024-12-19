// filepath: /c:/Najot Ta'lim/8- OY/green-shop/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './counterSlice'

export const store = configureStore({
  reducer: {
    order: orderSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch