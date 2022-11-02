const express = require("express");

const socket = require("./socket.js");

const app = express();
app.use("/", express.static(__dirname + "/front"));

const server = app.listen(8080, () => {
  console.log("server start");
});

socket(server);
