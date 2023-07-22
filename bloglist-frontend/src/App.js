import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [blogTitle, setBlogTitle] = useState('')
	const [blogAuthor, setBlogAuthor] = useState('')
	const [blogUrl, setBlogUrl] = useState('')
	const [notificationProp, setNotificationProp] = useState(null)
	const notificationType = { success: 'success', error: 'error' }

  useEffect(() => {
		if (user) {
			blogService.getAll().then(blogs =>
				setBlogs( blogs )
			) 
		}
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

	const createBlog = async (event) => {
		event.preventDefault()

		const newBlog = {
			title: blogTitle,
			author: blogAuthor,
			url: blogUrl,
		}

		const createdBlog = await blogService.create(newBlog)
		setBlogs(blogs.concat(createdBlog))
		setBlogTitle('')
		setBlogAuthor('')
		setBlogUrl('')
		sendNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, notificationType.success)
	}

	const sendNotification = (message, type) => {
    setNotificationProp({message, type})
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

	const createBlogForm = () => (
		<div>
			<form onSubmit={createBlog}>
				<div>
					title:
					<input
						type="text"
						value={blogTitle}
						name="Blog title"
						onChange={({ target }) => setBlogTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={blogAuthor}
						name="Blog author"
						onChange={({ target }) => setBlogAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={blogUrl}
						name="Blog url"
						onChange={({ target }) => setBlogUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)

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
        	<Blog key={blog.id} blog={blog} />)}
				</div>
			}
    </div>
  )
}

export default App