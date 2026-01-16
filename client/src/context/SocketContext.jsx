import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (!userInfo) return;

    socketRef.current = io(HOST, {
      withCredentials: true,
      query: { userId: userInfo.id },
    });

    setSocket(socketRef.current);

    socketRef.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
