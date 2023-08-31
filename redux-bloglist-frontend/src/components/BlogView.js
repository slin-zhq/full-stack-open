import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
      <div>added by &quot;{blog.creator.name}&quot;</div>
    </div>
  )
}

export default BlogView