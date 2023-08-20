"use client";

import { AppContext } from "@/Providers/AppProvider";
import React, { useContext, useEffect } from "react";

const RoomSection = () => {
  const { rooms, socket, setRooms, currentRoom, setCurrentRoom } =
    useContext(AppContext);

  function addRooms(rooms) {
    setRooms(rooms);
  }

  useEffect(() => {
    socket.on("rooms", addRooms);
    return () => {
      socket.off("rooms", addRooms);
    };
  }, [socket]);

  function handleRoomClick(roomName) {
    setCurrentRoom(roomName);
    // Do whatever you want to do when a room is clicked
    // For example, update the state or display more information about the room
  }

  return (
    <div className="flex flex-col gap-5 items-center p-5 w-1/4 h-full border-2 border-yellow-500 rounded-2xl select-none">
      <h1 className="font-semibold text-2xl">Rooms</h1>
      <div className="flex w-full h-full overflow-y-auto flex-col gap-2">
        {rooms?.map((room, i) => {
          return (
            <div
              key={i}
              className={`w-full h-fit  ${
                currentRoom === room ? "bg-yellow-500" : "bg-gray-300"
              } rounded-full p-3 cursor-pointer hover:opacity-90`}
              onClick={() => handleRoomClick(room)}
            >
              <p className="text-center">{room}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomSection;
