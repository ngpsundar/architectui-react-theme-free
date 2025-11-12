import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection = null;

export const initSignalR = async (token) => {
  try {
    connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5005/hubs/app", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.onreconnecting((error) => {
      console.log("SignalR reconnecting...", error);
    });

    connection.onreconnected((connectionId) => {
      console.log("SignalR reconnected. ConnectionId:", connectionId);
    });

    connection.onclose((error) => {
      console.log("SignalR connection closed:", error);
    });

    await connection.start();
    console.log("✅ SignalR connected");

  } catch (err) {
    console.error("SignalR connection failed:", err);
  }
};

export const subscribeToNotifications = (callback) => {
  if (!connection) {
    console.error("SignalR connection not initialized!");
    return () => {};
  }

  connection.on("ReceiveNotification", (data) => {
    console.log("📨 SignalR message received:", data);
    callback(data);
  });

  // Return unsubscribe function
  return () => {
    console.log("Unsubscribing from SignalR notifications");
    connection.off("ReceiveNotification");
  };
};

export const stopSignalR = async () => {
  if (connection) {
    await connection.stop();
    console.log("SignalR connection stopped");
  }
};
