import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'create': {
      return {}
    }
    case 'voted': {
      return {
        message: `anecdote '${action.content}' voted`,
        isShown: true
      }
    }
    case 'failed': {
      return {
        message: 'Too short anecdotes, must have length 5 or more',
        isShown: true
      }
    }
    case 'hide': {
      return {
        message: '',
        isShown: false,
      }
    }
    default: {
      throw Error(`Unknow action: ${action.type}`)
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '', isShown: false })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext