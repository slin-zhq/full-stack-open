import { useDispatch } from 'react-redux'
import { clearLoggedInUser } from '../reducers/loggedInUserReducer'
import { Link } from 'react-router-dom'

const Menu = ({ userName }) => {
  const dispatch = useDispatch()

  // const padding = {
  //   paddingRight: 5
  // }

  // const menuStyle = {
  //   backgroundColor: 'lightgray'
  // }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearLoggedInUser())
  }

  return (
    <div>
      <nav className='bg-blue-500 p-2'>
        <ul className='flex justify-end space-x-4'>
          <li><Link className='text-white hover:underline' to="/">blogs</Link></li>
          <li><Link className='text-white hover:underline' to="/users">users</Link></li>
          <li>
            <button id='logout-button' className='text-white hover:font-bold' onClick={handleLogout}>
						log out
            </button>
          </li>
        </ul>
      </nav>
      <p className='text-right my-1'>{userName} logged in</p>
    </div>

  )

  // return (
  //   <div style={menuStyle}>
  //     <Link style={padding} to="/">blogs</Link>
  //     <Link style={padding} to="/users">users</Link>
  //     {userName} logged in
  //     <button id='logout-button' onClick={handleLogout}>
  // 			log out
  //     </button>
  //   </div>
  // )
}

export default Menu