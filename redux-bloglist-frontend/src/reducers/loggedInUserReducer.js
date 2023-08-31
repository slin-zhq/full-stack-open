import { createSlice } from '@reduxjs/toolkit'

const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload
    },
    clearLoggedInUser() {
      return null
    }
  }
})

export const { setLoggedInUser, clearLoggedInUser } = loggedInUserSlice.actions
export default loggedInUserSlice.reducer