import { AppContext } from "@/Providers/AppProvider";
import React, { useContext, useEffect } from "react";

function Message() {
  const { message, username, setMessage, socket, currentRoom } =
    useContext(AppContext);

  function handleIncommingChat(data) {
    console.log(data);
    setMessage((prev) => [
      ...prev,
      {
        inputMessage: data.inputMessage,
        username: data.username,
        roomId: data.roomId,
        time: data.time,
      },
    ]);
  }

  useEffect(() => {
    console.log("chalo ye to chala");
    socket.on("send-chat-res", handleIncommingChat);

    return () => {
      socket.off("send-chat-res", handleIncommingChat);
    };
  }, [socket]);

  const roomMessage = message.filter(
    (message) => message.roomId === currentRoom
  );

  return (
    <div className="border-2 border-yellow-500 h-full flex flex-col overflow-y-auto gap-2 p-5 w-full rounded-lg">
      {roomMessage?.map((item, i) => (
        <div
          key={i}
          className={`flex gap-1 flex-col ${
            username === item.username ? "items-end" : "items-start"
          } justify-center select-none `}
        >
          <p className="rounded-full  bg-gray-900 text-gray-300 px-5 py-2 w-fit">
            {username === item.username ? "You: " : item.username + ": "}{" "}
            {item.inputMessage}
          </p>

          <span
            className={`${
              username === item.username ? "pr-4" : "pl-4"
            } text-[10px] text-[#dadada]`}
          >
            {item.time}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Message;
