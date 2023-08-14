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
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm