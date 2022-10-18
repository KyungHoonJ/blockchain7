// const express = require("express");
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import objTest from "./objtest/index.js";
// as는 앞에 export 된 이름과 뒤에 여기서 쓸 이름을 정의한다.

console.log(objTest.multiply(1, 2));
// console.log(objMinus(1, 2));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "web")));

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
    name: "session-cookie",
  })
);

app.listen(app.get("port"), () => {
  console.log("서버 열기");
});
