const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const users = {};

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] },
});

io.on("connection", function (socket) {
  socket.on("send-chat-req", (data) => {
    console.log(data);
    try {
      io.to(data.roomId).emit("send-chat-res", data);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("join-room", ({ roomId, username }) => {
    users[socket.id] = username;

    socket.join(roomId);

    const userRooms = Array.from(socket.rooms);
    userRooms.splice(userRooms.indexOf(socket.id), 1);

    console.log(userRooms);

    io.to(socket.id).emit("rooms", userRooms);
    if (!io.sockets.adapter.rooms.has(roomId)) {
      console.log(`Room ${roomId} does not exist`);
      // Handle the case where the room doesn't exist
      return;
    }
    console.log(socket.rooms);
    console.log(`${users[socket.id]} joined ${roomId}`);
  });
});

server.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
