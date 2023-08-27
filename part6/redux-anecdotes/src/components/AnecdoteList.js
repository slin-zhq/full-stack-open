import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const compareFn = (a, b) => {
		if (a.votes < b.votes) {
			return 1
		} else if (a.votes > b.votes) {
			return -1
		}
		return 0
	}
	const anecdotes = useSelector(state => {
		const anecdotes = state.anecdotes
														.filter(
															anec => anec.content.toLowerCase()
																				.includes(state.filter.toLowerCase())
														)
		return anecdotes.sort(compareFn)
	})

	const handleVoteChange = (id) => {
		dispatch(voteForAnecdote(id))
		const anecdote = anecdotes.find(anec => anec.id === id)
		dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteChange(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
		</div>
	)	
}

export default AnecdoteList