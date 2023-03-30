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

export const { messageChange, showMessage } = notificationSlice.actions
export default notificationSlice.reducer