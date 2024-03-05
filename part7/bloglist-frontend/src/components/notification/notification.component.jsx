import "./notification.styles.css";
import { useSelector } from "react-redux";

const Notification = () => {
  const { message, show, className } = useSelector(
    (state) => state.notification,
  );

  if (!show) {
    return null;
  }

  return <div className={className}>{message}</div>;
};

export default Notification;
