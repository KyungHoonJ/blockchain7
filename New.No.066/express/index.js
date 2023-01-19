const path = require("path");
const express = require("express");

const app = express();

const board = [];

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/index.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.css"));
// });

// app.get("/index.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.js"));
// });

// app.get("/board", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "board", "index.html"));
// });

// app.get("/board/index.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "board", "index.js"));
// });

app.get("/board/list", (req, res) => {
  // res.send(JSON.stringify(board));
  res.end();
});

app.post("/board/add", (req, res) => {
  console.log(req.body);
  console.log(typeof req.body);
  // board.unshift(req.body.value);
  // res.send(JSON.stringify(board));
  res.end();
});

app.listen(4194, () => {
  console.log("4194 server open");
});
