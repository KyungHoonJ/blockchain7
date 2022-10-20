const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const { globalAgent } = require("http");

dotenv.config();

const app = express();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

app.use((req, res, next) => {
  console.log(req.body);
  next();
  // next => 다음 걸로 넘어가라.
});

app.post("/*", (req, res, next) => {
  console.log("name : ", req.body.name);
  // 쿠키를 추가한다.
  next();
});

app.post("/api/user", (req, res) => {
  res.cookie("name", req.body.name);
  // 쿠키를 추가한다.
  res.end("정보를 추가했다.");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.massage);
});

app.listen(8080, () => {
  console.log("localhost:8080");
});
