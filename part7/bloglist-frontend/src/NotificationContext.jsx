import { createContext, useReducer, useContext } from "react";

export const actions = {};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW": {
      return {
        message: action.payload.message,
        className: action.payload.className,
        show: true,
      };
    }
    case "HIDE": {
      return {
        ...state,
        show: false,
      };
      break;
    }
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: "",
    show: false,
    className: "",
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext)[0];
  return notification;
};

export const useNotificationDispatch = () => {
  const dispatch = useContext(NotificationContext)[1];
  return dispatch;
};

export default NotificationContext;
