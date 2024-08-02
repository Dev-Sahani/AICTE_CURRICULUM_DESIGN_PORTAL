const socketIo = require("socket.io");
let io;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: process.env.SERVER_URL,
      methods: "*",
    },
  });

  io.on("connect", (socket) => {
    console.log(socket.id, "person connected");
    socket.on("init", ({ userId, courses }) => {
      const coursesId = courses?.map((course) => course.id || course._id);
      coursesId.push(userId);
      console.log(coursesId);
      socket.join(coursesId);
    });
    socket.on("disconnect", () => {
      console.log(socket.id, "person disconnected");
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { initSocket, getIo };
