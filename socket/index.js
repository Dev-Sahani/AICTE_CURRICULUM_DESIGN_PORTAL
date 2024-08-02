const socketIo = require("socket.io");
let io;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: "*",
    },
  });

  io.on("connect", (socket) => {
    socket.on("init", ({ userId, courses }) => {
      const coursesId = courses?.map((course) => course.id || course._id);
      coursesId.push(userId);
      socket.join(coursesId);
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
