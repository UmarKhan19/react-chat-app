import { AppContext } from "@/Providers/AppProvider";
import React, { useContext } from "react";

const Login = () => {
  const {
    username,
    setUsername,
    roomId,
    setRoomId,
    socket,
    setShowChat,
    setCurrentRoom,
  } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (username !== "" && roomId !== "") {
      socket.emit("join-room", { roomId, username });
      setShowChat(true);
      setCurrentRoom(roomId);
      setRoomId("");
    }
  }

  return (
    <div className="flex justify-center items-center gap-3 bg-gray-700 h-screen w-full">
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          className="px-5 py-2 rounded-full text-gray-900"
        />
        <input
          type="text"
          placeholder="RoomId"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          value={roomId}
          className="px-5 py-2 rounded-full text-gray-900"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600"
          onClick={handleSubmit}
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Login;
