import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

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
            data-testid='blog-url'
            type="text"
            value={blogUrl}
            name="blog-url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm