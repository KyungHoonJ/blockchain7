import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// url => 주소, 라우터?, 서버내에서의 파일 위치 등등, 관리하는 내장 모듈

import listApi from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const todoList = [];

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);

app.use(express.json());
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use("/", express.static(path.join(__dirname, "public")));
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

app.use("/api", listApi);

// app.get("/api/list", (req, res) => {
//   res.send({
//     list: todoList,
//   });
// });

// // app.get("/api/add", (req, res) => {
// //   // http://localhost:8080/api/add?name=asdfasdfasdfasdf
// //   console.log(req.query);
// //   todoList.push(req.query.name);
// //   const { str } = req.query;
// //   console.log(str);
// //   console.log(todoList);
// //   res.end();
// // });

// app.post("/api/add", (req, res) => {
//   // post 형식으로 요청을 받을 때
//   // (첫번째 매개변수, 두번째 매개변수)
//   // 첫번째 매개변수는 라우터, 즉 주소의 뒤에 어떻게 붙어서 요청이 들어왔는가?
//   // localhost:8080/api/add << 라고 들어왔을 때
//   // 두번째 매개변수는 콜백 함수이며 해당 post 요청에 대해서 실행하는 작업 코드
//   //   console.log(req.body);
//   todoList.push({ text: req.body["name"], time: req.body.time });
//   //   const { str } = req.body;
//   //   console.log(str);
//   // req, 즉 요청에 body 안에 있는 do-name을 todoList에 추가한다.
//   console.log(todoList);
//   res.end();
//   // res, 즉 응답으로 todoList를 보내고 완료한다.
// });

app.listen(app.get("port"), () => {
  console.log("서버 온");
});

// Web Server
//   HTTP 통신을 한다. << 요청 / 응답
//   브라우저가 요청을 보낸다. => 서버 요청을 받는다. => 서버는 요청에 대해서 응답을 보낸다 => 브라우저가 자신이 보낸 요청에 대한 응답을 받는다.
//   클라이언트가 요청을 보내야만 서버가 데이터를 응답으로 보내줄 수 있다.
// 클라이언트(브라우저)는 서버를 어떻게 찾을까?
//   IP / DNS 주소를 찾는다. => 서버에 접속한다. => 정상적인 포트로 접근했는가, 접속이 허용된 포트인가를 서버가 확인한다.
// 접속이 되었을 때 서버는 응답한다. 어떻게?
//   URL, 우리가 기존에 생각했던, 알고있던 주소와 지금 얘기하는 주소가 다르다는 걸 알아야한다.
//   우리가 기존에 알던 주소는 https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=asdfsadfsadf
//   서버에서 말하는 주소는 search.naver.com << 도메인 주소를 말한다.
//   라우터 : search.naver
//   쿼리 스트링 : ?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=asdfsadfsadf
//   우편번호 : 건물마다 결정됨. => 주소
//   정확한 상세 주소 : 라우터
//   도서관 << 주소
//   도서관의 인문학관, 자연학관, 철학관 << 라우터
//   각 관의 책들 << 데이터
//   책들에 붙어있는 라벨들을 찾아서 대여한다 << 응답
