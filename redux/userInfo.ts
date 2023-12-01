import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfo } from '../constants/interfaces'

const initialState: UserInfo = {
  tasksAmount: 60,
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state = action.payload
    },
  },
})

export const { updateUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer
