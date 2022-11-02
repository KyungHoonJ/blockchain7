const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);
};
