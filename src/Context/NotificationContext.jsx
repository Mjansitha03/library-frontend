import { createContext, useContext } from "react";

export const NotificationContext = createContext(null);

export const useNotifications = () => {
  return useContext(NotificationContext);
};
