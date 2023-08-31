import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (notification === null) {
    return null
  }

  const { message, type } = notification
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification