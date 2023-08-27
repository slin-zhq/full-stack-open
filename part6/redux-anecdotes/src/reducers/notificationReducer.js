import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
	name: 'notification',
	initialState: 'Awesome anecdotes!',
	reducers: {
		setNoti(state, action) {
			// state.push(action.payload)
			return action.payload
		},
		// clearFirstNotification(state, action) {
		// 	// return state.slice(1)
		// 	state.shift()
		// },
		clearNotification(state, action) {
			return ''
		}
	}
})

export const setNotification = (message, timeInSecs) => {
	return async (dispatch) => {
		dispatch(setNoti(message))
		setTimeout(() => {
			// console.log('Timeout is called')
			dispatch(clearNotification())
		}, timeInSecs*1000)
	}
}

export const { setNoti, clearNotification } = notificationReducer.actions
export default notificationReducer.reducer