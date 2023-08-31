import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useState } from 'react'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div data-testid='title'>{blog.title}</div>
      <div data-testid='author'>{blog.author}</div>
      {visible && <button id='hide-button' onClick={toggleVisibility}>hide</button>}
      {!visible && <button id='view-button' onClick={toggleVisibility}>view</button>}
      <div style={showWhenVisible} className='togglableContent'>
        {blog.url}
        <br/>
        {blog.likes} <button id='like-button' onClick={() => dispatch(likeBlog(blog))}>like</button>
        <br/>
        {blog.creator.name}
        <br/>
        {username === blog.creator.username &&
					<button id='remove-button' onClick={() => dispatch(deleteBlog(blog.id))}>remove</button>}
      </div>
    </div>
  )
}

export default Blog