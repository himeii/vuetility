// const io = require("socket.io")();

module.exports = function manageRooms(io) {
  io.on("connection", (socket) => {
    socket.on("join-project", ({ id }) => {
      socket.join(`project-${id}`);
    });

    socket.on("leave-project", ({ id }) => {
      socket.leave(`project-${id}`);
    });
  });
};
