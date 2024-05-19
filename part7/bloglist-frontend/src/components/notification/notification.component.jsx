import "./notification.styles.css";
import { useNotificationValue } from "../../NotificationContext";

import { Box } from "@mui/material";

const Notification = () => {
  const { message, show, className } = useNotificationValue();

  if (!show) {
    return null;
  }

  return <Box className={className}>{message}</Box>;
};

export default Notification;
