"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify"; // Ensure this is the correct import for the toast function

const NetworkStatusContext = createContext<{ isOffline: boolean }>({ isOffline: false });

export const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // On mount, check if the user is offline and display a toast immediately if so.
    if (!navigator.onLine) {
      toast.error("You are currently offline. Some features may not be available.");
    }

    const updateOnlineStatus = () => {
      const offline = !navigator.onLine;
      setIsOffline(offline);

      if (offline) {
        toast.error("You are currently offline. Some features may not be available.");
      } else {
        toast.success("Your internet connection has been restored.");
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ isOffline }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext);