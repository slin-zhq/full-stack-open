import blogReducer from './reducers/blogReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'
import blogCommentReducer from './reducers/blogCommentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loggedInUser: loggedInUserReducer,
    users: usersReducer,
    blogComment: blogCommentReducer,
  }
})

export default store