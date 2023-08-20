"use client";

import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  const value = {
    username,
    setUsername,
    socket,
    roomId,
    setRoomId,
    inputMessage,
    setInputMessage,
    message,
    setMessage,
    showChat,
    setShowChat,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
