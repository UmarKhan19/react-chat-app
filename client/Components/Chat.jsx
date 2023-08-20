import React, { useContext } from "react";
import Message from "./Message";
import Form from "./Form";
import RoomSection from "./RoomSection";
import { AppContext } from "@/Providers/AppProvider";

const Chat = () => {
  const {
    roomId,
    username,
    setRoomId,
    socket,
    inputMessage,
    setInputMessage,
    setCurrentRoom,
    currentRoom,
  } = useContext(AppContext);

  function handleJoinRoom(e) {
    e.preventDefault();
    socket.emit("join-room", { roomId, username });
    setCurrentRoom(roomId);
    setRoomId("");
  }
  function handleSend(e) {
    e.preventDefault();
    if (inputMessage !== "") {
      socket.emit("send-chat-req", {
        inputMessage,
        username,
        roomId: currentRoom,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      });
    }

    setInputMessage("");
  }

  return (
    <div className="h-screen w-full p-5 flex  bg-gray-700 gap-3">
      <RoomSection />

      <div className="h-full w-full p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Form
            state={roomId}
            setState={setRoomId}
            handleSend={handleJoinRoom}
            placeholder={"Add Room"}
          />
          <div className="flex gap-2 select-none">
            <p className="px-5 py-2 rounded-full bg-green-500 cursor-default">
              {currentRoom}
            </p>
            <p className="px-5 py-2 rounded-full bg-yellow-500 cursor-default">
              {username}
            </p>
          </div>
        </div>
        <Message />
        <div className="flex  gap-3 justify-center items-center">
          <Form
            state={inputMessage}
            setState={setInputMessage}
            handleSend={handleSend}
            placeholder={"Message"}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
