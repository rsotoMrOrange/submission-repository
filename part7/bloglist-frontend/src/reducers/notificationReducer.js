import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    show: false,
    className: "",
  },
  reducers: {
    messageChange(state, action) {
      return {
        ...state,
        message: action.payload.message,
        className: action.payload.className,
      };
    },
    showMessage(state, action) {
      return {
        ...state,
        show: action.payload,
      };
    },
  },
});

export const setNotification = (message, className, timeout) => {
  return async (dispatch) => {
    dispatch(messageChange({ message, className }, className));
    dispatch(showMessage(true));
    setTimeout(() => {
      dispatch(showMessage(false));
    }, timeout);
  };
};

export const { messageChange, showMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
