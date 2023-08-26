import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
	name: 'notification',
	initialState: ['Awesome anecdotes!'],
	reducers: {
		setNotification(state, action) {
			state.push(action.payload)
		},
		clearFirstNotification(state, action) {
			// return state.slice(1)
			state.shift()
		},
	}
})

export const { setNotification, clearFirstNotification } = notificationReducer.actions
export default notificationReducer.reducer