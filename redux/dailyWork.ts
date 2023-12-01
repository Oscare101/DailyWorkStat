import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DailyWork } from '../constants/interfaces'

const initialState: DailyWork[] | [] = []

const dailyWorkSlice = createSlice({
  name: 'dailyWork',
  initialState,
  reducers: {
    updateDailyWork: (state, action: PayloadAction<DailyWork[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateDailyWork } = dailyWorkSlice.actions
export default dailyWorkSlice.reducer
