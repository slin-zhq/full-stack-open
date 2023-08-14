/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationProp, setNotificationProp] = useState(null)
  const notificationType = { success: 'success', error: 'error' }

  useEffect(() => {
    const getBlogs = async () => {
      if (user) {
        const blogs = await blogService.getAll()
        const compareFn = (a, b) => {
          if (a.likes < b.likes) {
            return 1
          } else if (a.likes > b.likes) {
            return -1
          }
          return 0
        }
        blogs.sort(compareFn)
        setBlogs(blogs)
      }
    }
    getBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendNotification('wrong username or password', notificationType.error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = async (newBlogObject) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(newBlogObject)
    setBlogs(blogs.concat(createdBlog))
    sendNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, notificationType.success)
  }

  const sendNotification = (message, type) => {
    setNotificationProp({ message, type })
    setTimeout(() => {
      setNotificationProp(null)
    }, type === notificationType.error ? 5000 : 3000) // timeout duration varies based on notification type
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
				username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
				password
        <input
          type="password"
          value={password}
          name="Username"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">log in</button>
    </form>
  )

  const blogFormRef = useRef()

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const likeBlogOf = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlogToSend = { ...updatedBlog, creator: updatedBlog.creator.id }
    await blogService.update(updatedBlogToSend)
    setBlogs(blogs.map(b => (b.id !== id ? b : updatedBlog)))
  }

  const deleteBlogOf = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      sendNotification('Blog deleted', notificationType.success)
    }
  }

  return (
    <div>
      {!user &&
				<div>
				  <h2>log in to application</h2>
				  <Notification prop={notificationProp}/>
				  {loginForm()}
				</div>
      }
      {user &&
				<div>
				  <h2>blogs</h2>
				  <Notification prop={notificationProp}/>
				  <p>
				    {user.name} logged in
				    <button onClick={handleLogout}>
							log out
				    </button>
				  </p>
				  <h2>create new</h2>
				  {createBlogForm()}
      		{blogs.map(blog =>
        		<Blog
				      key={blog.id}
				      blog={blog}
				      likeBlog={() => likeBlogOf(blog.id)}
				      deleteBlog={() => deleteBlogOf(blog.id)}
				      username={user.username}
				    />
				  )
				  }
				</div>
      }
    </div>
  )
}

export default App