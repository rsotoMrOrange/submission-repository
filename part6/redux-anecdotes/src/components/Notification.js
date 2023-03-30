import { useSelector } from "react-redux"

const Notification = () => {
  const { message, show } = useSelector(state => state.notification)
  console.log('message', message)
  console.log('show', show)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!show) return null
  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification