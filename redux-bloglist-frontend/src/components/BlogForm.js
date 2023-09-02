import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }))

    dispatch(setNotification(`a new blog ${blogTitle} by ${blogAuthor} added`, 'success'))

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
					title:
          <input
            id='title'
            className='input'
            data-testid='blog-title'
            type="text"
            value={blogTitle}
            name="blog-title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
					author:
          <input
            id='author'
            className='input'
            data-testid='blog-author'
            type="text"
            value={blogAuthor}
            name="blog-author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
					url:
          <input
            id='url'
            className='input'
            data-testid='blog-url'
            type="text"
            value={blogUrl}
            name="blog-url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button
          id='create-button'
          className='btn-primary'
          type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm