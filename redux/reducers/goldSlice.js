/*
 * @Date: 2022-09-04 00:26:19
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-04 00:31:44
 * @FilePath: /KingdomRush/Client/redux/reducers/goldSlice.js
 */
import { createSlice } from "@reduxjs/toolkit";

export const goldSlice = createSlice({
  name: 'gold',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, } = goldSlice.actions

export default goldSlice.reducer