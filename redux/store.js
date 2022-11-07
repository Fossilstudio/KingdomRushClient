/*
 * @Date: 2022-08-30 13:13:40
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-04 00:31:33
 * @FilePath: /KingdomRush/Client/redux/store.js
 */
import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './reducers/playerSlice'
import goldReducer from './reducers/goldSlice'

export default configureStore({
  reducer: {
    player: playerReducer,
    gold: goldReducer,
  },
})
