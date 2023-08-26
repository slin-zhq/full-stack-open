import { useDispatch, useSelector } from "react-redux"
import { clearFirstNotification } from "../reducers/notificationReducer"

const Notification = () => {
	const dispatch = useDispatch()
	const notifications = useSelector(state => state.notification)

	if (notifications.length === 0) {
		return null
	}

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

	const hideNotification = () => {
		setTimeout(() => { dispatch(clearFirstNotification()) }, 5000)
	}

  return (
    <div style={style}>
			{notifications.map((noti, index) =>
				<div key={index}>{noti}</div> 
			)}
			{hideNotification()}
    </div>
  )

	// return (
  //   <div style={style}>
  //     {notification}
  //   </div>
  // )
}

export default Notification