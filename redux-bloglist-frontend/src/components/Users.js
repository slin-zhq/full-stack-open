import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(({ users }) => users)

  const usersToDisplay = users.map(user => ({
    id: user.id,
    name: user.name,
    blogsCreated: user.blogs.length
  }))

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map(({ id, name, blogsCreated }) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{name}</Link>
              </td>
              <td>{blogsCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users