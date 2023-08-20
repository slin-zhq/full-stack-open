const Notification = ({ prop }) => {
  if (prop === null) {
    return null
  }

  const { message, type } = prop
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification