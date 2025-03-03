"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const NetworkStatusContext = createContext<{ isOffline: boolean }>({ isOffline: false });

export const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsOffline(!navigator.onLine);

      const updateOnlineStatus = () => {
        const offline = !navigator.onLine;
        setIsOffline(offline);
      };

      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      };
    }
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ isOffline }}>
      {isOffline && (
        <div
          className="w-full bg-red-600 text-white text-center  text-xs"
          style={{ backgroundColor: "#DC2626", color: "#FFFFFF" , height : "20px"  }} 
        >
          You are currently offline.
        </div>
      )}
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext);