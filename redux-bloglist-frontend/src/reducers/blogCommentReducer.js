import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogCommentSlice = createSlice({
  name: 'blogComment',
  initialState: '',
  reducers: {
    setComment(state, action) {
      return action.payload
    },
    clearComment() {
      return ''
    }
  }
})

export const addBlogComment = (comment) => {
  return async (dispatch) => {
    await blogService.addComment(comment)
    dispatch(clearComment())
  }
}

export const { setComment, clearComment } = blogCommentSlice.actions
export default blogCommentSlice.reducer