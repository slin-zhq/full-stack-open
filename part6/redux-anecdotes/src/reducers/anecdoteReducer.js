import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		updateAnecdote(state, action) {
			const changedAnecdote = action.payload
			return state.map(anec => anec.id !== changedAnecdote.id ? anec : changedAnecdote)
		},
		setAnecdotes(state, action) {
			return action.payload
		}, 
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
	}
})

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnec = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnec))
	}
}

export const voteForAnecdote = (id) => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		const anecdote = anecdotes.find(anec => anec.id === id)
		const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
		await anecdoteService.update(changedAnecdote)
		dispatch(updateAnecdote(changedAnecdote))
	}
}

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer