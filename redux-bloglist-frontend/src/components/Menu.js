import { useDispatch } from 'react-redux'
import { clearLoggedInUser } from '../reducers/loggedInUserReducer'
import { Link } from 'react-router-dom'

const Menu = ({ userName }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5
  }

  const menuStyle = {
    backgroundColor: 'lightgray'
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearLoggedInUser())
  }

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {userName} logged in
      <button id='logout-button' onClick={handleLogout}>
				log out
      </button>
    </div>
  )
}

export default Menu