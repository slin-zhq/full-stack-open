import { createSlice } from '@reduxjs/toolkit'

const notificaionSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNoti(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const setNotification = (message, type) => {
  let timeOutDurationInMillisecs
  switch (type) {
  case 'error':
    timeOutDurationInMillisecs = 5000
    break
  default:
    timeOutDurationInMillisecs = 3000
  }
  return (dispatch) => {
    dispatch(setNoti({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeOutDurationInMillisecs)
  }
}

export const { setNoti, clearNotification } = notificaionSlice.actions
export default notificaionSlice.reducer