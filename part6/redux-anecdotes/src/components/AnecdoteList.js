import { useDispatch, useSelector } from "react-redux"

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
	const anecdotes = useSelector(state => state.sort(compareFn))

	const vote = (id) => {
    console.log('vote', id)
		const action = {
			type: 'VOTE',
			payload: {
				id
			}
		}
		dispatch(action)
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
		</div>
	)	
}

export default AnecdoteList