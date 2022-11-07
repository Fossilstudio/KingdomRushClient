/*
 * @Date: 2022-07-22 13:19:27
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-25 00:46:35
 * @FilePath: /kingdomRush/client/redux/reducers/playerSlice.js
 */
import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    campaign: 1,
    heroic:0,
    iron:0,
    gems:0
  },
  reducers: {
    initialPlayer: (state,action) => {
      state.campaign = action.payload.campaign
      state.heroic = action.payload.heroic
      state.iron = action.payload.iron
      state.gems = action.payload.gems
    },
    incrementCampaign: (state) => {
      state.campaign += 1
    },
    incrementHeroic: (state) => {
      state.heroic += 1
    },
    incrementIron: (state) => {
      state.iron += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { initialPlayer,incrementCampaign, incrementHeroic, incrementIron } = playerSlice.actions

export default playerSlice.reducer