import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div className='my-4 p-4 border border-gray-300 rounded-lg'>
      {blogs.map(blog =>
        <div key={blog.id} className='mb-4 border-b border-gray-300 pb-4'>
          <Link className="text-blue-400 hover:text-blue-900 no-underline" to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList