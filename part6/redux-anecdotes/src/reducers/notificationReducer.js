import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    show: false,
  },
  reducers: {
    messageChange(state, action) {
      return {
        ...state,
        message: action.payload
      }
    },
    showMessage(state, action) {
      return {
        ...state,
        show: action.payload
      }
    }
  }
})

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(messageChange(message))
    dispatch(showMessage(true))
    setTimeout(() => {
      dispatch(showMessage(false))
    }, timeout);
  }
}

export const { messageChange, showMessage } = notificationSlice.actions
export default notificationSlice.reducer