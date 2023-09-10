import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export const updateCache = (cache, query, addedBook) => {
  // const uniqByName = (a) => {
  //   let seen = new Set()
  //   return a.filter((item) => {
  //     let k = item.title
  //     return seen.has(k) ? false : seen.add(k)
  //   })
  // }

  cache.updateQuery(query, ({ allBooks }) => {
		const foundBook = allBooks.find(book => book.title === addedBook.title)
    return {
      allBooks: foundBook ? allBooks : allBooks.concat(addedBook),
    }
  })

	// cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
	// 	const foundAuthor = allAuthors.find(author => author.name === addedBook.author.name)
	// 	console.log('foundAuthor:', foundAuthor)
	// 	return {
	// 		allAuthors: foundAuthor ? allAuthors : allAuthors.concat(addedBook.author)
	// 	}
	// })
}

const App = () => {
  const [page, setPage] = useState('authors')
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const addedBook = data.data.bookAdded
			const { title, author } = addedBook
			window.alert(`New book added: "${title}" by "${author.name}"`)
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
		}
	})

	if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

	const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('recommend')}>recommend</button>
				<button onClick={logout}>logout</button>
      </div>

			<Notify errorMessage={errorMessage} />
      
			<Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

			<Recommendations show={page === 'recommend'} />
    </div>
  )
}

export default App
