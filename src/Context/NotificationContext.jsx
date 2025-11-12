import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { initSignalR, subscribeToNotifications, stopSignalR } from "../api/signalRService";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, SignalR will not connect");
      return;
    }

    console.log("Initializing SignalR...");
    initSignalR(token);

    const unsubscribe = subscribeToNotifications((data) => {
      console.log("NotificationProvider received data:", data);
      setNotifications((prev) => [...prev, data]);
      showToast(data);
    });

    return () => {
      console.log("Cleaning up SignalR subscription...");
      unsubscribe();
      stopSignalR();
    };
  }, []);

  const showToast = ({ type, title, message }) => {
    console.log("Showing toast:", { type, title, message });
    const options = { position: "bottom-right", autoClose: 4000 };
    switch (type) {
      case "success":
        toast.success(`${title}: ${message}`, options);
        break;
      case "error":
        toast.error(`${title}: ${message}`, options);
        break;
      case "warning":
        toast.warning(`${title}: ${message}`, options);
        break;
      default:
        toast.info(`${title}: ${message}`, options);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
