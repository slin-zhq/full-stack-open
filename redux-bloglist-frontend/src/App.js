/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
// import Blog from './components/Blog'
// import { clearLoggedInUser, setLoggedInUser } from './reducers/loggedInUserReducer'
import { setLoggedInUser } from './reducers/loggedInUserReducer'
import { getUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch, } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import Menu from './components/Menu'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationType = { success: 'success', error: 'error' }

  const dispatch = useDispatch()

  const user = useSelector(({ loggedInUser }) => loggedInUser)
  const blogs = useSelector(({ blogs }) => blogs)
  const usersToDisplay = useSelector(({ users }) => users)

  useEffect(() => {
    if (user) {
      dispatch(initialBlogs())
      dispatch(getUsers())
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendNotification('wrong username or password', notificationType.error)
    }
  }

  // const handleLogout = (event) => {
  //   event.preventDefault()
  //   window.localStorage.removeItem('loggedBlogAppUser')
  //   dispatch(clearLoggedInUser())
  // }

  const sendNotification = (message, type) => {
    dispatch(setNotification(message, type))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
				username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
				password
        <input
          id='password'
          type="password"
          value={password}
          name="Username"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">log in</button>
    </form>
  )

  const blogFormRef = useRef()

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  // const Home = () => (
  //   <div>
  //     <h2>create new</h2>
  // 			  {createBlogForm()}
  // 			  {blogs.map(blog => <Blog key={blog.id} blog={blog} username={user.username} />)}
  //   </div>
  // )

  const Home = () => (
    <div>
      {createBlogForm()}
      <BlogList />
    </div>
  )

  const userById = (id) => usersToDisplay.find(u => u.id === id)
  const userMatch = useMatch('/users/:id')
  const userToDisplay = userMatch ? userById(userMatch.params.id) : null

  const blogById = (id) => blogs.find(b => b.id === id)
  const blogMatch = useMatch('/blogs/:id')
  const blogToDisplay = blogMatch ? blogById(blogMatch.params.id) : null

  return (
    <div>
      {!user &&
				<div>
				  <h2>log in to application</h2>
				  <Notification />
				  {loginForm()}
				</div>
      }
      {user &&
				<div>
				  <Menu userName={user.name}/>
				  <h1>blogs app</h1>
				  <Notification />
				  <Routes>
				    <Route path="/" element={<Home />} />
				    <Route path="/users" element={<Users />} />
				    <Route path="/users/:id" element={<User user={userToDisplay} />} />
				    <Route path="/blogs/:id" element={<BlogView blog={blogToDisplay} />} />
				  </Routes>
				</div>
      }
    </div>
  )

  // return (
  //   <div>
  //     {!user &&
  // 			<div>
  // 			  <h2>log in to application</h2>
  // 			  <Notification />
  // 			  {loginForm()}
  // 			</div>
  //     }
  //     {user &&
  // 			<div>
  // 			  <h2>blogs</h2>
  // 			  <Notification />
  // 			  <p>
  // 			    {user.name} logged in
  // 			    <button id='logout-button' onClick={handleLogout}>
  // 						log out
  // 			    </button>
  // 			  </p>
  // 			  <Routes>
  // 			    <Route path="/" element={<Home />} />
  // 			    <Route path="/users" element={<Users />} />
  // 			    <Route path="/users/:id" element={<User user={userToDisplay} />} />
  // 			    <Route path="/blogs/:id" element={<BlogView blog={blogToDisplay} />} />
  // 			  </Routes>
  // 			</div>
  //     }
  //   </div>
  // )
}

export default App