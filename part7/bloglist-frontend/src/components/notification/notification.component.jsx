import './notification.styles.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.className}>
      {message.display}
    </div>
  )
}

export default Notification