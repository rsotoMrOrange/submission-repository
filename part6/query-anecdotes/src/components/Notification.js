const Notification = ({ notification }) => {
  const { message, isShown } = notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!isShown) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
