import "./notification.styles.css";
import { useSelector } from "react-redux";

const Notification = () => {
  const { message, show, className } = useSelector(
    (state) => state.notification,
  );

  console.log(`message: ${message}, show: ${show}, className: ${className}`);

  if (!show) {
    return null;
  }

  // change to useSelector values
  return <div className={className}>{message}</div>;
};

export default Notification;
