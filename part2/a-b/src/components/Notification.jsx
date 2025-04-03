import "../styles/Notification.css"

export const Notification = ({ message }) => {

  if( message === null){
    return null
  }

  return (
    <div className={`notification-${message.type}`}>
      {message.text}
    </div>
  )
}
