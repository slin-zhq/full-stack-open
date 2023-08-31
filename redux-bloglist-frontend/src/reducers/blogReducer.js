import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const compareFn = (a, b) => {
  if (a.likes < b.likes) {
    return 1
  } else if (a.likes > b.likes) {
    return -1
  }
  return 0
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      const blogsToSort = state.map(blog => blog.id !== changedBlog.id ? blog : changedBlog)
      return blogsToSort.sort(compareFn)
    }
  }
})

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort(compareFn)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update({
      ...changedBlog,
      creator: blog.creator.id
    })
    dispatch(updateBlog(changedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.filter(b => b.id !== id)))
  }
}

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer