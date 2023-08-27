import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [])

  return (
    <div>
			<Notification />
      <h2>Anecdotes</h2>
			<Filter />
			<br/>
			<AnecdoteList />
			<AnecdoteForm />
    </div>
  )
}

export default App