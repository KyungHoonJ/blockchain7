const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./routes");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "react")));
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
    name: "br",
  })
);

// app.use("/api", routes);

app.listen(8080, () => {
  console.log("8080 server start");
});
