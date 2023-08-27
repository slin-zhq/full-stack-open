import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
	const notificationMessage = useNotificationValue()

	if (notificationMessage === '') {
		return null
	}

  return (
    <div style={style}>
			{notificationMessage}
    </div>
  )
}

export default Notification
