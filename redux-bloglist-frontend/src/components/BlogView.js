import { useDispatch } from 'react-redux'
import { likeBlog, updateBlog } from '../reducers/blogReducer'
// import { addBlogComment, setComment } from '../reducers/blogCommentReducer'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()
  // const comment = useSelector(({ blogComment }) => blogComment)

  // const addComment = (event) => {
  //   event.preventDefault()
  //   const newComment = {
  //     comment,
  //     blogId: blog.id,
  //   }
  //   dispatch(addBlogComment(newComment))
  // }

  const [comment, setComment] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    const newComment = {
      comment,
      blogId: blog.id,
    }

    const addedComment = await blogService.addComment(newComment)
    delete addedComment.blogId

    const changedBlog = {
      ...blog,
      comments: blog.comments.concat(addedComment)
    }
    dispatch(updateBlog(changedBlog)) // This line is important
    // Without this, BlogView won't be rendered to reflect the new comment.

    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
      <div>added by &quot;{blog.creator.name}&quot;</div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)} />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map(({ id, comment }) =>
          <li key={id}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogView