import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
			queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
		}, 
		onError: () => {
			// Currently, the server doesn't throw error if the anecdote is fewer than 5 characters
			// To complete the exercises, I've implemented the error handling
			dispatch({ type: 'SET', payload: 'too short anecdote, must be 5 characters long or longer' })
			setTimeout(() => {
				dispatch({ type: 'CLEAR' })
			}, 5000)
		}
	})

	const dispatch = useNotificationDispatch()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
		dispatch({ type: 'SET', payload: `anecdote '${content}' added` })
		setTimeout(() => {
			dispatch({ type: 'CLEAR' })
		}, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
