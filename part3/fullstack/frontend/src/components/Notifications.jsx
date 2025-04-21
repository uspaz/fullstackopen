import "../styles/notifications.css"

export const Notifications = ({ message }) => {

  if( message === null){
    return null
  }

  return (
    <div className={`notification-${message.type}`}>
      {message.text}
    </div>
  )
}
