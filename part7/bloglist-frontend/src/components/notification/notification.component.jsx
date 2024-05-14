import "./notification.styles.css";
import { useSelector } from "react-redux";
import { useNotificationValue } from "../../NotificationContext";

const Notification = () => {
  const { message, show, className } = useNotificationValue();

  if (!show) {
    return null;
  }

  return <div className={className}>{message}</div>;
};

export default Notification;
